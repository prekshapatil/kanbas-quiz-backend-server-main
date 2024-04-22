import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const findQuizByCourseId = async (req, res) => {
    const { cid } = req.params;
    const quizzes = await dao.findQuizzesByCourse(cid);
    res.json(quizzes);
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuiz(qid);
    res.json(status);
  };

  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    const quiz = await dao.findQuizById(qid);
    if (!quiz) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.json(quiz);
  };

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.updateQuiz(qid, req.body);
    res.json(status);
  };

  const createQuiz = async (req, res) => {
    req.body.course = req.params.cid;
    req.body.id = new Date().getTime().toString();
    const quiz = await dao.createQuiz(req.body);
    res.json(quiz);
  };

  app.get("/api/courses/:cid/quizzes", findQuizByCourseId);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.get("/api/quizzes/:qid", findQuizById);
}
