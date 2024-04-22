import * as dao from "./dao.js";

export default function QuestionRoutes(app) {
  // const createQuestion = async (req, res) => {
  //   try {
  //     const { quizId } = req.params;
  //     const question = await dao.createQuestion(quizId, req.body);

  //     console.log("QuizIDDDD"+quizId);
  //     res.status(201).json(question);
  //   } catch (error) {
  //     res.status(409).json({ message: error.message });
  //   }
  // }
  const createQuestion = async (req, res) => {
    try {
      const { quizId } = req.params;
      const { questionType, ...question } = req.body; // Extract questionType and other fields
      const createdQuestion = await dao.createQuestion(quizId, {
        ...question,
        questionType: questionType
      });
      res.status(201).json(createdQuestion);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }

  const getQuestion = async (req, res) => {
    try {
      const { id } = req.params;
      const questions = await dao.findQuestion(id);
      res.status(200).json(questions);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  const getQuestionsForQuiz = async (req, res) => {
    try {
      const { qid } = req.params;
      const questions = await dao.findQuestionByQuiz(qid);
      res.status(200).json(questions);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  const getChoicesForQuestion = async(req, res) => {
    try {
      const {questionId} = req.params;
      const choices = await dao.findChoicesByQuestion(questionId);
      res.status(200).json(choices)
    } catch(error){
      res.status(404).json({message: error.message});
    }
  }

  const updateQuestion = async (req, res) => {
    const { quizId } = req.params;
    const { id } = req.params;
    let question = req.body;
    try {
      question = await dao.updateQuestion(id, question);
      res.json(question);
    }
    catch (error) {
      res.status(409).json({ message: error.message });
    }
  }

  app.post('/api/quizzes/:quizId/questions', createQuestion);
  app.put('/api/quizzes/:quizId/questions/:id', updateQuestion);
  app.get('/api/quizzes/:quizId/questions/:id', getQuestion);
  app.get('/api/quiz/:qID/question', getQuestionsForQuiz);
}
