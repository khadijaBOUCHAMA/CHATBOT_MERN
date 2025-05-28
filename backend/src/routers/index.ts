import { Router } from "express";
import userRoutes from "./user_routes.js";
import chatRoutes from "./chat_routes.js";

const appRouter = Router();
appRouter.use("/users", userRoutes); //domain/api/v1/user
appRouter.use("/chats", chatRoutes); //domain/api/v1/chats
export default appRouter;