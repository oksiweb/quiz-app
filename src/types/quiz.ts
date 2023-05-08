export interface QuizContextProps {
  children: React.ReactNode
}

export interface Question {
  question: string
  incorrectAnswers?: string[] | undefined
  correctAnswer: string
}

export interface BackendQuestion {
  correct_answer: string
  incorrect_answers: string[]
  question: string
}

export interface Answer {
  answer: string
  index: number
  currentAnswer: string
  correctAnswer: string
  onClick: (answer: string) => void
}

export interface QuizState {
  currentQuestionIndex: number
  quiz: Question[] | null
  showResult: boolean
  answers: string[]
  currentAnswer: string
  correctAnswersCount: number
}

export interface QuizContextType {
  state: QuizState
  dispatch: React.Dispatch<any>
}

export interface QuizAction {
  type: string
  payload: any
}
