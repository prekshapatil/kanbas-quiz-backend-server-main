import model from "./model.js";
export const findQuizzesByCourse = (courseId) => {
  return model.find({ course: courseId });
};

export const deleteQuiz = (quizId) => {
  return model.deleteOne({ _id: quizId });
};
export const findAllQuizzes = () => model.find();

export const findQuizById = (quizId) => {
  return model.findById(quizId);
};

export const updateQuiz = (quizId, quiz) => {
  return model.updateOne({ _id: quizId }, { $set: quiz });
};

export const createQuiz = (quiz) => {
  delete quiz._id;
  return model.create(quiz);
};