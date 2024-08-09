// models/Todo.js
import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  pic: [{ type: String }],
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
});

export default mongoose.model("ToDo", ToDoSchema);
