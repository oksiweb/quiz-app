import { useContext, useEffect } from "react"
import Question from "./Question"
import QuizContext from "../context/quiz"
import { QuizContextType } from "../types/quiz"
import { SET_CURRENT_QUESTION, LOADED_QUESTIONS, RESTART, SET_RESULT } from "../actions/actionTypes"
const apiUrl = "https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple&encode=url3986"

const Quiz = () => {
  const quizContext = useContext<QuizContextType | null>(QuizContext)
  const { state = { currentQuestionIndex: 0, quiz: [], showResult: false }, dispatch } = quizContext || {}

  const handleNextQuestion = () => {
    if (state.currentQuestionIndex + 1 !== state?.quiz?.length) {
      dispatch?.({ type: SET_CURRENT_QUESTION })
    } else {
      dispatch?.({ type: SET_RESULT })
    }
  }

  useEffect(() => {
    if (state?.quiz?.length ?? 0 >= 1) {
      return
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log("data", data)
        dispatch?.({ type: LOADED_QUESTIONS, payload: data.results })
      })
  }, [state.quiz, dispatch])

  return (
    <div className="quiz">
      {state.showResult && (
        <div className="results">
          <div className="congratulations">Congratulations</div>
          <div className="results-info">
            <div>You have completed the quiz.</div>
            <div>
              You've got {state.correctAnswersCount} of {state?.quiz?.length}
            </div>
          </div>
          <div className="next-button" onClick={() => dispatch?.({ type: RESTART })}>
            Restart
          </div>
        </div>
      )}
      {!state.showResult && (state?.quiz?.length ?? 0) > 0 && (
        <div>
          <div className="score">
            Question {state.currentQuestionIndex + 1}/{state?.quiz?.length}
          </div>
          <Question />
          <div className="next-button" onClick={handleNextQuestion}>
            Next question
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
