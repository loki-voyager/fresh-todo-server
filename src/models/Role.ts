import mongoose from "mongoose";

const Role = new mongoose.Schema({
  value: {
    type: String,
    unique: true
  },
});

export default mongoose.model("Role",Role)