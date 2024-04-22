import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  option: String,
});

const questionSchema = new mongoose.Schema(
  {
    title: String,
    points: Number,
    id: String,
    type: {
      type: String,
      required: true,
      enum: ["MultipleChoice", "TrueFalse", "FillBlank"], // Predefined values
    },
    quizId: { type: String, required: true },
    question: String,
    options: [optionSchema],
  },
  { collection: "questions" }
);

export default questionSchema;
