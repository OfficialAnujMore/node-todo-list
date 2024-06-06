import express from "express";
import mongoose from "mongoose";
const PORT = 5000;
const connectionString =
  "mongodb+srv://admin:WIqJ6KqtJSVTkt1I@cluster0.uky4qyi.mongodb.net";
const DBNAME = "Todo-List";

const app = express();
app.use(express.json());

const todoSchema = mongoose.Schema(
  {
    name: String,
    status: Boolean,
  },
  { timestamp: true }
);

const Todo = mongoose.model("Todo", todoSchema);

app.get("/todos", async (_, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.json(todo);
});

app.post("/todos", async (req, res) => {
  // const { name, status } = req.body;
  const todoRes = await Todo.create(req.body);

  res.json(todoRes);
});
app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  
  res.json(todo);
});
app.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  
  res.json(todo);
});

async function start() {
  try {
    await mongoose
      .connect(`${connectionString}/${DBNAME}`)
      .then(() => console.log("Connection to DB Successful"))
      .catch(() => console.log("Failed to connect to DB"));

    app.listen(PORT, () => {
      console.log(`App running on port, ${PORT}`);
    });
  } catch (err) {
    console.log("Failed to start the server", err);
  }
}
start();
