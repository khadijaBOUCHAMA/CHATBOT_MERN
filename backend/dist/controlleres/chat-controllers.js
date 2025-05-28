import User from "../models/User.js";
import { randomUUID } from "crypto";
import { generateGeminiResponse } from "../config/geminiService.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    const conversationId = req.params.conversationId;
    if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Message invalide" });
    }
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered OR Token malfunctioned",
            });
        }
        // Trouver la conversation
        const conversation = user.conversations.id(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        // Préparer les messages existants pour le contexte
        const chats = conversation.chats.map(({ role, content }) => ({
            role: role,
            content,
        }));
        // Ajouter le message utilisateur
        chats.push({ role: "user", content: message });
        conversation.chats.push({
            id: randomUUID(),
            role: "user",
            content: message,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // Préparer prompt pour Gemini (concat texte)
        const prompt = chats
            .map(({ role, content }) => `${role.toUpperCase()}: ${content}`)
            .join("\n");
        // Appel Gemini pour la réponse
        const botReplyText = await generateGeminiResponse(prompt);
        // Ajouter la réponse assistant
        conversation.chats.push({
            id: randomUUID(),
            role: "assistant",
            content: botReplyText,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        // *** Nouvelle étape : générer un titre IA ***
        // Exemple simple : on génère un titre avec Gemini sur la base du prompt ou des derniers messages
        // Tu peux adapter cette fonction selon ton API Gemini et prompt spécifique pour titre
        const titlePrompt = `Génère uniquement un titre très court (max 5 mots), clair et pertinent pour cette conversation, sans explication ni liste :\n${prompt}`;
        const generatedTitle = await generateGeminiResponse(titlePrompt);
        // Mettre à jour le titre de la conversation (par exemple, tronquer si trop long)
        conversation.title = generatedTitle.trim().slice(0, 100) || "Nouvelle conversation";
        // Sauvegarder les modifications (chats + titre)
        await user.save();
        return res.status(200).json({ conversation });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
};
export const sendConversationsToUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not registered" });
        }
        return res.status(200).json({ conversations: user.conversations });
    }
    catch (error) {
        return res.status(500).json({ message: "Fetching conversations failed", error });
    }
};
export const deleteAllConversations = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not found" });
        user.set("conversations", []); // ✅ bon typage
        await user.save();
        return res.status(200).json({ message: "Toutes les conversations ont été supprimées." });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur lors de la suppression des conversations." });
    }
};
export const deleteSingleChat = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not found" });
        const { conversationId, chatId } = req.params;
        const conversation = user.conversations.id(conversationId);
        if (!conversation)
            return res.status(404).json({ message: "Conversation not found" });
        const chatIndex = conversation.chats.findIndex(chat => chat.id === chatId);
        if (chatIndex === -1)
            return res.status(404).json({ message: "Chat not found" });
        conversation.chats.splice(chatIndex, 1);
        await user.save();
        return res.status(200).json({ message: "Chat deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "Unknown error" });
        }
    }
};
export const addConversation = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not found" });
        const { title } = req.body;
        const newConversation = {
            id: randomUUID(),
            title: title || "Nouvelle conversation",
            chats: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        user.conversations.push(newConversation);
        await user.save();
        return res.status(201).json({ conversation: newConversation });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not create conversation" });
    }
};
export const deleteConversation = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not found" });
        const conversationId = req.params.conversationId;
        const convIndex = user.conversations.findIndex(c => c._id.toString() === conversationId);
        if (convIndex === -1)
            return res.status(404).json({ message: "Conversation not found" });
        user.conversations.splice(convIndex, 1);
        await user.save();
        return res.status(200).json({ message: "Conversation deleted" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Could not delete conversation" });
    }
};
