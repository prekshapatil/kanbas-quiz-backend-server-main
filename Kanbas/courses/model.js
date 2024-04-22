import mongoose from "mongoose";
import schema from "./schema.js";
const Model = mongoose.model("courses", schema);
export default Model;