
import { GoogleGenAI } from "@google/genai";
import { DashboardData } from "../types";

export const getAIInsights = async (data: DashboardData): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Actúa como un analista de datos experto en IA. Analiza la adopción de Findasense (N=205 colaboradores).
      
      IMPORTANTE: Tu respuesta DEBE ser exclusivamente una lista de puntos clave (bullet points). 
      NO incluyas introducciones ni saludos. Empieza directamente con los puntos.

      DATOS ACTUALES:
      - Adopción Activa: 53.6%.
      - Usuarios Activos: 110 de 205.
      - Brecha de uso: 129 personas aún no usan la App de Gemini.
      - Top Practice: Intelligence (85%).
      - Rezagado: Project Management (32%).

      PROPORCIONA 3 INSIGHTS ESTRATÉGICOS EN BULLETS:
      1. Significado de la tasa de adopción actual del 53.6%.
      2. Una acción táctica para cerrar la brecha en Project Management.
      3. El impacto potencial de movilizar a los 129 inactivos de la App.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.3,
      }
    });

    return response.text || "No se pudo generar el diagnóstico.";
  } catch (error) {
    console.error("Gemini Insights Error:", error);
    return "Error al conectar con la IA de Google.";
  }
};
