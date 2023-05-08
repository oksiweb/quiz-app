import { useContext, useEffect } from "react"
import Answer from "./Answer"
import QuizContext from "../context/quiz"
import { QuizContextType, QuizState } from "../types/quiz"
import { SET_ANSWERS, SET_CURRENT_ANSWER } from "../actions/actionTypes"

const Question = () => {
  const quizContext = useContext<QuizContextType | null>(QuizContext)
  const { state, dispatch } = quizContext || { state: {}, dispatch: () => {} }
  const { answers, quiz, currentQuestionIndex, currentAnswer } = state as QuizState

  const current = quiz?.[currentQuestionIndex]
  const question = current?.question ?? ""
  const correctAnswer = current?.correctAnswer ?? ""

  useEffect(() => {
    dispatch({ type: SET_ANSWERS, payload: currentQuestionIndex })
  }, [currentQuestionIndex, dispatch])

  const handleCurrentAnswer = (answer: string) => {
    dispatch({ type: SET_CURRENT_ANSWER, payload: answer })
  }

  return (
    <div>
      <div className="question">{question}</div>
      <div className="answers">
        {answers.map((answer, index) => (
          <Answer currentAnswer={currentAnswer} correctAnswer={correctAnswer} onClick={handleCurrentAnswer} key={index} answer={answer} index={index} />
        ))}
      </div>
    </div>
  )
}

export default Question
