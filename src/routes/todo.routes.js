import { Router } from "express";
import Todo from "../models/todo.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { addTodo, getTodoById, getTodos, updateTodoById } from "../controllers/todo.controller.js";

const router = Router();

router.route("/todos").get(getTodos);

router.route("/todos/:id").get(getTodoById);

router.route("/todos").post(addTodo);

router.route("/todos/:id").put(updateTodoById);
router.route("/todos/:id").delete();

export default router;
