import express from "express";
import userRoutes from "./router.js";
const app = express();
const PORT = process.env.PORT || 5000;
import cors from "cors";
app.use(cors());

app.use(express.json()); // Middleware to parse JSON

app.use("/users", userRoutes); // Use the router for `/users` endpoint

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
