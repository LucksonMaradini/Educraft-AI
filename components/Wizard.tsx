import React, { useState } from 'react';
import { SchoolConfig, SchoolType } from '../types';
import { School, Palette, MapPin, GraduationCap, ArrowRight } from 'lucide-react';

interface WizardProps {
  onComplete: (config: SchoolConfig) => void;
}

const Wizard: React.FC<WizardProps> = ({ onComplete }) => {
  const [config, setConfig] = useState<SchoolConfig>({
    name: "",
    type: SchoolType.HIGH_SCHOOL,
    moto: "",
    location: "",
    primaryColor: "#1e40af", // blue-800
    secondaryColor: "#eab308", // yellow-500
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(config);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Visual */}
        <div className="md:w-1/3 bg-indigo-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <School className="w-12 h-12 mb-6" />
            <h1 className="text-3xl font-bold mb-4">Build Your School's Legacy</h1>
            <p className="text-indigo-100">Enter your institution's details and let our AI architect designed a professional website in seconds.</p>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-2/3 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">School Configuration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">School Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Springfield Academy"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={config.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Institution Type</label>
                <select
                  name="type"
                  value={config.type}
                  onChange={handleChange}
                  className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  {Object.values(SchoolType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    required
                    placeholder="e.g. Boston, MA"
                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={config.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Moto */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Motto / Slogan</label>
                <input
                  type="text"
                  name="moto"
                  required
                  placeholder="e.g. Excellence in Education"
                  className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={config.moto}
                  onChange={handleChange}
                />
              </div>

              {/* Colors */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Primary Brand Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="primaryColor"
                    value={config.primaryColor}
                    onChange={handleChange}
                    className="h-10 w-20 p-1 rounded cursor-pointer border border-slate-300"
                  />
                  <span className="text-sm text-slate-500 uppercase">{config.primaryColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Secondary Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="secondaryColor"
                    value={config.secondaryColor}
                    onChange={handleChange}
                    className="h-10 w-20 p-1 rounded cursor-pointer border border-slate-300"
                  />
                  <span className="text-sm text-slate-500 uppercase">{config.secondaryColor}</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.01] shadow-lg"
              >
                Generate Website <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Wizard;