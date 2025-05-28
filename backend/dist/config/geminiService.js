import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY not set in environment variables");
}
const ai = new GoogleGenAI({ apiKey });
export async function generateGeminiResponse(prompt) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        if (!response.text) {
            throw new Error("API Gemini a retourné un résultat vide");
        }
        return response.text.trim();
    }
    catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}
export async function generateGeminiResponseFromHistory(chats) {
    // Construire un prompt concaténé avec tous les messages du chat
    const prompt = chats
        .map((chat) => `${chat.role === "user" ? "User" : "Assistant"}: ${chat.content}`)
        .join("\n") + "\nAssistant:";
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        if (!response.text) {
            throw new Error("API Gemini a retourné un résultat vide");
        }
        return response.text.trim();
    }
    catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}
