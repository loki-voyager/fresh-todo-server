// models/Todo.js
import mongoose from "mongoose";

const ToDoDeletedSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  body: { type: String, required: true },
  pic: [{ type: String }],
  generated: { type: Date, required: true },
  deleted: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  deletedToDoId: { type: mongoose.Schema.Types.ObjectId, ref: "todos" },
  deletedToDoCompletedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "todocompleteds",
  },
});

ToDoDeletedSchema.path("deletedToDoId").validate(function (value) {
  return this.deletedToDoId || this.deletedToDoCompletedId;
}, "Either deletedToDoId or deletedToDoCompletedId must be provided.");

ToDoDeletedSchema.path("deletedToDoCompletedId").validate(function (value) {
  return this.deletedToDoId || this.deletedToDoCompletedId;
}, "Either deletedToDoId or deletedToDoCompletedId must be provided.");

export default mongoose.model("ToDoDeleted", ToDoDeletedSchema);
