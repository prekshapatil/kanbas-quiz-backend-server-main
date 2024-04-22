import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "courses" }],
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY"],
      default: "STUDENT",},
  },
  { collection: "users" });
export default userSchema;

