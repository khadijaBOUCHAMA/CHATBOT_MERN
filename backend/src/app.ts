import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routers/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

const app = express();

const allowedOrigins = ["http://localhost:5173", "http://localhost:8081"]; // liste des frontends autorisés

app.use(
    cors({
        origin: function (origin, callback) {
            // Autorise les requêtes sans origin (ex: Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) === -1) {
                const msg = `La politique CORS ne permet pas l'accès depuis cette origine : ${origin}`;
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true, // pour les cookies
    })
);

app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(morgan("dev"));

app.use("/api/v1", appRouter);

export default app;
