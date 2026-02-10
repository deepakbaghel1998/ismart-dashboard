
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getHealthAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite-latest',
      contents: `User asks: ${query}. Act as a helpful healthcare assistant for iSmart HealthCare. Provide a brief, empathetic response suggesting whether they should see a doctor, book a lab test, or follow general wellness advice. Always clarify that you are an AI and not a replacement for professional medical advice.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting right now. Please consult a doctor for urgent concerns.";
  }
};
