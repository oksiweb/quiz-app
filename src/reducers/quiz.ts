import { SET_CURRENT_QUESTION, SET_CURRENT_ANSWER, SET_RESULT, RESTART, SET_ANSWERS } from "../actions/actionTypes"
import { QuizState, QuizAction } from "../types/quiz"

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const reducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case SET_CURRENT_QUESTION:
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1, currentAnswer: "" }
    case SET_RESULT:
      return { ...state, currentAnswer: "", showResult: true }
    case RESTART:
      return { ...state, currentAnswer: "", currentQuestionIndex: 0, showResult: false, correctAnswersCount: 0 }
    case SET_ANSWERS:
      const questions = state.quiz || []
      const answers = [...(questions[action.payload].incorrectAnswers || []), state.quiz?.[action.payload].correctAnswer]
      return { ...state, answers: shuffleArray(answers) }
    case SET_CURRENT_ANSWER:
      const currentQuestions = state.quiz || []
      const correctAnswersCount = action.payload === currentQuestions[state.currentQuestionIndex].correctAnswer ? state.correctAnswersCount + 1 : state.correctAnswersCount
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount: correctAnswersCount
      }
    default:
      return state
  }
}

export default reducer
