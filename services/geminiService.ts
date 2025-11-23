import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SchoolConfig, GeneratedContent } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSchoolData = async (config: SchoolConfig): Promise<GeneratedContent> => {
  const ai = getClient();
  
  const responseSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      heroHeadline: { type: Type.STRING, description: "A catchy, inspiring headline for the homepage hero section." },
      heroSubheadline: { type: Type.STRING, description: "A supporting sentence for the hero section." },
      missionStatement: { type: Type.STRING, description: "A concise mission statement (1-2 sentences)." },
      aboutText: { type: Type.STRING, description: "A paragraph describing the school's history and values (approx 80 words)." },
      principalMessage: { type: Type.STRING, description: "A welcoming message from the school head (approx 100 words)." },
      principalName: { type: Type.STRING, description: "A fictional name for the principal/dean." },
      academicHighlights: { 
        type: Type.ARRAY, 
        items: { type: Type.STRING },
        description: "List of 4 key academic or extracurricular strengths (e.g., 'STEM Excellence')." 
      },
      events: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            date: { type: Type.STRING },
            description: { type: Type.STRING }
          }
        },
        description: "3 upcoming fictional events relevant to the school type."
      },
      faculty: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            bio: { type: Type.STRING }
          }
        },
        description: "3 featured faculty members with brief bios."
      },
      testimonials: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            quote: { type: Type.STRING }
          }
        },
        description: "6 testimonials from students, parents, or alumni praising the school."
      },
      footerText: { type: Type.STRING, description: "A short closing footer sentence." }
    },
    required: [
      "heroHeadline", "heroSubheadline", "missionStatement", "aboutText", 
      "principalMessage", "principalName", "academicHighlights", "events", 
      "faculty", "testimonials", "footerText"
    ]
  };

  const prompt = `
    Create website content for a school with the following details:
    Name: ${config.name}
    Type: ${config.type}
    Moto: ${config.moto}
    Location: ${config.location}
    
    The tone should be professional, welcoming, and appropriate for a ${config.type}.
    Be creative but realistic.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: "You are a professional web copywriter for educational institutions."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    return JSON.parse(text) as GeneratedContent;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};