import { SET_CURRENT_QUESTION, LOADED_QUESTIONS, SET_CURRENT_ANSWER, SET_RESULT, RESTART } from "../actions/actionTypes"
import { QuizState, QuizAction } from "../types/quiz"
import { shuffleAnswers, normalizeQuestions } from "../utils/helpers"

const reducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
      const questions = state.quiz || []
      const answers = state?.showResult ? [] : shuffleAnswers(questions[state.currentQuestionIndex + 1])
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, answers: answers, currentAnswer: "" }
    case SET_RESULT:
      return { ...state, currentAnswer: "", showResult: true }
    case RESTART:
      return { ...state, currentAnswer: "", currentQuestionIndex: 0, showResult: false, correctAnswersCount: 0 }
    case SET_CURRENT_ANSWER:
      const currentQuestions = state.quiz || []
      const correctAnswersCount = action.payload === currentQuestions[state.currentQuestionIndex].correctAnswer ? state.correctAnswersCount + 1 : state.correctAnswersCount
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount: correctAnswersCount
      }
    case LOADED_QUESTIONS: {
      const normalizedQuestions = normalizeQuestions(action.payload)
      return {
        ...state,
        quiz: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0])
      }
    }
    default:
      return state
  }
}

export default reducer
