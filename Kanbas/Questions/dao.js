import model from "./model.js";

export const getAllQuestions = (quizId) => {
  return model.find({ quizId: quizId });
}

export const getQuestionById = (questionId) => {
    return model.findById(questionId);
}

export const updateQuestion = (questionId, question) => {
    return model.updateOne({ _id: questionId }, { $set: question });
}

export const deleteQuestion = (questionId) => {
    return model.deleteOne({ _id: questionId });
}

export const createQuestion = (question) => {
    delete question._id;
    return model.create(question);
}

export const deleteQuestionsForQuiz = (quizId) => {
    return model.deleteMany({quizId : quizId});
}