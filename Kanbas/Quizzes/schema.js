import mongoose from "mongoose";
const quizSchema = new mongoose.Schema(
  {
    title: String,
  availability: {
    type: String,
    default: 'Not available'
  },
  description: String,
  accessCode: String,
  dueDate: Date,
  availableFromDate: Date,
  availableUntilDate: Date,
  points: Number,
  numberOfQuestions: String,
  course: String,
  quizType: String,
  assignmentGroup: String,
  shuffleAnswers: Boolean,
  multipleAttempts: Boolean,
  correctAnswers: Boolean,
  oneQuestion: Boolean,
  webcam: Boolean,
  lockQuestion: Boolean,
  timeLimit: Number,
  published: Boolean,
  instructions: String
  },
  { collection: "quizzes" }
);

  
export default quizSchema;