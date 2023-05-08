import { createContext, useReducer } from "react"
import { QuizContextType, QuizState, QuizContextProps } from "../types/quiz"
import reducer from "../reducers/quiz"
import data from "../data-mock/questions"

const QuizContext = createContext<QuizContextType | null>(null)

const initialState: QuizState = {
  currentQuestionIndex: 0,
  quiz: data || [],
  showResult: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0
}

export const QuizContextProvider = ({ children }: QuizContextProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const contextValue: QuizContextType = { state, dispatch }

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
}

export default QuizContext
