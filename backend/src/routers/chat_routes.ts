import { Router } from "express";
import {
    generateChatCompletion,
    sendConversationsToUser,
    deleteAllConversations,
    deleteSingleChat,
    addConversation,
    deleteConversation,
} from "../controlleres/chat-controllers.js";
import { verifyToken } from "../utils/token_manager.js";

const router = Router();

router.post("/conversation", verifyToken, addConversation);
router.get("/conversations", verifyToken, sendConversationsToUser);

router.post("/conversation/:conversationId/chat", verifyToken, generateChatCompletion);

router.delete("/conversation/all", verifyToken, deleteAllConversations);

router.delete("/conversation/:conversationId/chat/:chatId", verifyToken, deleteSingleChat);

router.delete("/conversation/:conversationId", verifyToken, deleteConversation);

export default router;
