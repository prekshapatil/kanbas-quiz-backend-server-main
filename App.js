import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import QuestionRoutes from "./Kanbas/Questions/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    'https://merry-bavarois-7d6051.netlify.app/#/Labs',
  ];
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
    }
));
app.use(express.json());

  app.use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
          sameSite: "none",
          secure: true,
          domain: "kanbas-quiz-backend-server-main.onrender.com",
        },
      })
    ); 



ModuleRoutes(app);
CourseRoutes(app);
QuestionRoutes(app);
QuizRoutes(app);
UserRoutes(app);

const db = mongoose.connection;
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

console.log(process.env.DB_CONNECTION_STRING);



app.get("/health_check", (req, res) => {
    res.json({ message: "Life is good!!!" });
    }
);

app.listen(4000 || process.env.PORT);