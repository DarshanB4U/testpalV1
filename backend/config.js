import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const JWT_SECRET = process.env.JWTSECRET;

console.log("JWT_SECRET:", JWT_SECRET); // Debugging
 