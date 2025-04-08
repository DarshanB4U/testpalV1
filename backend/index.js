import express from "express";
import userRoutes from "./router.js";
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

app.use("/users", userRoutes); // Use the router for `/users` endpoint

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
