import mongoose, { Document, Types } from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema(
    {
        id: { type: String, default: () => randomUUID() },
        role: { type: String, enum: ["user", "system", "assistant"], required: true },
        content: { type: String, required: true },
    },
    { timestamps: true }
);

export interface IChat extends Document {
    id: string;
    role: "user" | "system" | "assistant";
    content: string;
}

const conversationSchema = new mongoose.Schema(
    {
        id: { type: String, default: () => randomUUID() },
        title: { type: String, required: false }, // Optionnel, un titre pour la conversation
        chats: [chatSchema],
    },
    { timestamps: true }
);

export interface IConversation extends Document {
    id: string;
    title?: string;
    chats: Types.DocumentArray<IChat>;
}

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    conversations: Types.DocumentArray<IConversation>;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        conversations: [conversationSchema],
    },
    { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
