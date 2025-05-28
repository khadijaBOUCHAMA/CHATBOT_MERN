// types/express.d.ts
import { Document } from "mongoose";

interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    chats: any[]; // simplifié ici
}

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}
