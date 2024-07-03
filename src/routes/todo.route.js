import { Router } from "express";
import {
  addTodo,
  deleteTodoById,
  getTodoById,
  getTodos,
  updateTodoById,
} from "../controllers/todo.controller.js";
import { tokenAuthentication } from "../middleware/tokenAuthentication.js";

const router = Router();

router.route("/todos").get(tokenAuthentication, getTodos);

router.route("/todos/:id").get(tokenAuthentication, getTodoById);

router.route("/todos").post(tokenAuthentication, addTodo);

router.route("/todos/:id").put(tokenAuthentication, updateTodoById);
router.route("/todos/:id").delete(tokenAuthentication, deleteTodoById);

export default router;
