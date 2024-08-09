import mongoose from "mongoose";

const password_recovery = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  code: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
    expires: 60,
  },
});

export default mongoose.model("password_recovery", password_recovery);
