import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  const findQuestionsByQuizId = async (req, res) => {
    const { qid } = req.params;
    const questions = await dao.getAllQuestions(qid);
    res.json(questions);
  };

  const deleteQuestion = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.deleteQuestion(qid);
    res.json(status);
  };

  const findQuestionById = async (req, res) => {
    const { qid } = req.params;
    const question = await dao.getQuestionById(qid);
    if (!question) {
      res.status(404).send("Question not found");
      return;
    }
    res.json(question);
  };

  const updateQuestion = async (req, res) => {
    const { qid } = req.params;
    const status = await dao.updateQuestion(qid, req.body);
    res.json(status);
  };

  const createQuestion = async (req, res) => {
    req.body.quizId = req.params.qid;
    const question = await dao.createQuestion(req.body);
    res.json(question);
  };

  const updateAllQuestions = async (req, res) => {
    console.log("updateAllQuestions");
    console.log(req.body);
    if (req.body === undefined || req.body.length === 0) {
      res.json({ status: "ok" });
      return;
    } else {
      await dao.deleteQuestionsForQuiz(req.body[0].quizId);
      for (var i = 0; i < req.body.length; i++) {
        await dao.createQuestion(req.body[i]);
      }
      res.json({ status: "ok" });
    }
  };

  app.get("/api/quizzes/:qid/questions", findQuestionsByQuizId);
  app.put("/api/quizzes/questions/:qid", updateQuestion);
  app.post("/api/quizzes/:qid/questions", createQuestion);
  app.put("/api/quizzes/:qid/updateAllQuestions", updateAllQuestions);
}
