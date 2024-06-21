import { Router } from "express";
import { addTodo, deleteTodoById, getTodoById, getTodos, updateTodoById } from "../controllers/todo.controller.js";

const router = Router();

router.route("/todos").get(getTodos);

router.route("/todos/:id").get(getTodoById);

router.route("/todos").post(addTodo);

router.route("/todos/:id").put(updateTodoById);
router.route("/todos/:id").delete(deleteTodoById);

export default router;
