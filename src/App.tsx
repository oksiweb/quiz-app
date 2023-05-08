import React from "react"
import Quiz from "./components/Quiz"
import { QuizContextProvider } from "./context/quiz"

function App() {
  return (
    <QuizContextProvider>
      <Quiz />
    </QuizContextProvider>
  )
}

export default App
