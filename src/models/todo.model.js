import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    name: String,
    status: Boolean,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
