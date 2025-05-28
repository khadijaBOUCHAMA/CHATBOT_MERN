import mongoose from "mongoose";
import { randomUUID } from "crypto";
const chatSchema = new mongoose.Schema({
    id: { type: String, default: () => randomUUID() },
    role: { type: String, enum: ["user", "system", "assistant"], required: true },
    content: { type: String, required: true },
}, { timestamps: true });
const conversationSchema = new mongoose.Schema({
    id: { type: String, default: () => randomUUID() },
    title: { type: String, required: false }, // Optionnel, un titre pour la conversation
    chats: [chatSchema],
}, { timestamps: true });
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    conversations: [conversationSchema],
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
export default User;
