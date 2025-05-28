import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("GEMINI_API_KEY not set in environment variables");
}

const ai = new GoogleGenAI({ apiKey });

// Définition du type ChatMessage (à adapter si tu as déjà un type dans ton projet)
export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export async function generateGeminiResponse(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        if (!response.text) {
            throw new Error("API Gemini a retourné un résultat vide");
        }
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}

export async function generateGeminiResponseFromHistory(chats: ChatMessage[]): Promise<string> {
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
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}
