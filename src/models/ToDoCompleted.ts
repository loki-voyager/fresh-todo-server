// models/Todo.js
import mongoose from "mongoose";

const ToDoCompletedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  body: { type: String, required: true },
  pic: [{ type: String }],
  generated: { type: Date, required: true },
  completed: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  todoId: { type: mongoose.Schema.Types.ObjectId, ref: "todos" },
});

export default mongoose.model("ToDoCompleted", ToDoCompletedSchema);
