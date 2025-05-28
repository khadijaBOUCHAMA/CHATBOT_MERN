import jwt from "jsonwebtoken";
// Création du token
export const createToken = (id, email, expiresIn = "7d") => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const payload = { id, email };
    return jwt.sign(payload, secret, { expiresIn });
};
// Middleware pour vérifier le token depuis le header Authorization
export const verifyToken = (req, res, next) => {
    // Récupération du token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token Not Received" });
    }
    const token = authHeader.split(" ")[1]; // "Bearer <token>"
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return res.status(500).json({ message: "JWT secret not configured" });
    }
    try {
        const decoded = jwt.verify(token, secret);
        res.locals.jwtData = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token Expired or Invalid", error });
    }
};
