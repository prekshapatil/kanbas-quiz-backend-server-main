import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import "dotenv/config";
import QuizRoutes from "./Kanbas/quizzes/routes.js";
import QuestionRoutes from "./Kanbas/questions/routes.js";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "some secret",
  saveUninitialized: false,
  resave: false,
};
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
  })
 );
  
app.use(session(sessionOptions));

app.use(express.json());
Hello(app);
Lab5(app);
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
QuestionRoutes(app);
app.listen(4000 || process.env.PORT);
