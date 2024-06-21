import express from "express";
import todoRouter from "./src/routes/todo.routes.js";
const app = express();
app.use(express.json());

app.use("/api/v1/todo", todoRouter)

export default app;
