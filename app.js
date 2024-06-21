import express from "express";
import todoRouter from "./src/routes/todo.route.js";
import userRouter from "./src/routes/user.route.js";
const app = express();
app.use(express.json());

app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);

export default app;
