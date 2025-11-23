import React, { useState } from 'react';
import Wizard from './components/Wizard';
import Loading from './components/Loading';
import Preview from './components/Preview';
import { SchoolConfig, GeneratedContent, AppState } from './types';
import { generateSchoolData } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('WIZARD');
  const [config, setConfig] = useState<SchoolConfig | null>(null);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWizardComplete = async (newConfig: SchoolConfig) => {
    setConfig(newConfig);
    setState('GENERATING');
    setError(null);

    try {
      const generatedContent = await generateSchoolData(newConfig);
      setContent(generatedContent);
      setState('PREVIEW');
    } catch (err) {
      console.error("Generation failed", err);
      setError("Failed to generate content. Please check your API key or try again.");
      setState('WIZARD');
    }
  };

  const handleReset = () => {
    setState('WIZARD');
    setConfig(null);
    setContent(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {state === 'WIZARD' && (
        <>
           {error && (
            <div className="fixed top-4 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <Wizard onComplete={handleWizardComplete} />
        </>
      )}
      
      {state === 'GENERATING' && <Loading />}
      
      {state === 'PREVIEW' && config && content && (
        <Preview 
          config={config} 
          content={content} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
};

export default App;