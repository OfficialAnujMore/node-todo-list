import Todo from "../models/todo.model.js";
import { ApiErrorHandler } from "../utils/ApiErrorHandler.js";
import { ApiResponseHandler } from "../utils/ApiResponseHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "../utils/common.js";

const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  if (todos == null) {
    return res
      .status(404)
      .json(new ApiErrorHandler(404, [], "Failed to fetch Todo list"));
  } else {
    return res
      .status(201)
      .json(
        new ApiResponseHandler(200, todos, "Successfully fetched todo list")
      );
  }
});

const getTodoById = asyncHandler(async (req, res) => {
  const todoID = req.params.id;

  if (!isValidObjectId(todoID)) {
    return res
      .status(400)
      .json(new ApiErrorHandler(400, [], `Invalid ID: ${todoID}`));
  }
  const todo = await Todo.findById(todoID);
  try {
    if (todo == null) {
      return res
        .status(404)
        .json(
          new ApiErrorHandler(
            404,
            [],
            `Failed to fetch Todo with ID: ${todoID}`
          )
        );
    } else {
      return res
        .status(201)
        .json(
          new ApiResponseHandler(200, todo, "Successfully fetched the todo")
        );
    }
  } catch (error) {
    return res
      .status(404)
      .json(new ApiErrorHandler(404, [], `Something went wrong`));
  }
});

const addTodo = asyncHandler(async (req, res) => {
  try {
    const { name, status } = req.body;
    if (
      [name].some((field) => {
        field?.trim() == "";
      })
    ) {
      return res
        .status(404)
        .json(new ApiErrorHandler(404, [], `All fields are required`));
    }

    const existingTodoItem = await Todo.findOne({ name });
    if (existingTodoItem) {
      return res
        .status(404)
        .json(
          new ApiErrorHandler(
            404,
            [],
            `Todo item with the same name already existing`
          )
        );
    }
    const todo = await Todo.create({
      name,
      status,
    });

    return res
      .status(200)
      .json(new ApiResponseHandler(200, todo, "Successful"));
  } catch (error) {
    return res
      .status(404)
      .json(new ApiErrorHandler(404, [], `Something went wrong ${error}`));
  }
});

const updateTodoById = asyncHandler(async (req, res) => {
  const todoID = req.params.id;
  if (!isValidObjectId(todoID)) {
    return res
      .status(400)
      .json(new ApiErrorHandler(400, [], `Invalid ID: ${todoID}`));
  }
  const { name, status } = req.body;
  if ([name].some((field) => field?.trim() == "")) {
  }

  const todo = await Todo.findByIdAndUpdate(todoID, req.body);
  if (todo === null) {
    return res.status(400).json(400, [], `Todo with ${todoID} not found`);
  }

  return res
    .status(200)
    .json(new ApiResponseHandler(200, todo, "Todo item updated successfully"));
});
const deleteTodoById = asyncHandler(async (req, res) => {
  const todoID = req.params.id;
  if (!isValidObjectId(todoID)) {
    return res
      .status(400)
      .json(new ApiErrorHandler(400, [], `Invalid ID: ${todoID}`));
  }
  const todo = await Todo.findByIdAndDelete(todoID);
  if (todo === null) {
    return res.status(400).json(400, [], `Todo with ${todoID} not found`);
  }

  return res
    .status(200)
    .json(new ApiResponseHandler(200, todo, "Todo item deleted successfully"));
});
export { getTodos, getTodoById, addTodo, updateTodoById, deleteTodoById };
