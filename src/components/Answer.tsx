import { Answer as AnswerProps } from "../types/quiz"

const Answer = ({ answer, onClick, index, currentAnswer, correctAnswer }: AnswerProps) => {
  const letterMapping = ["A", "B", "C", "D"]
  const isCorrectAnswer = currentAnswer && answer === correctAnswer
  const isWrongAnswer = currentAnswer === answer && currentAnswer !== correctAnswer
  const correctAnswerClass = isCorrectAnswer ? "correct-answer" : ""
  const wrongAnswerClass = isWrongAnswer ? "wrong-answer" : ""
  const disabledClass = currentAnswer ? "disabled-answer" : ""
  return (
    <div className={`answer ${correctAnswerClass} ${wrongAnswerClass} ${disabledClass}`} onClick={() => onClick(answer)}>
      <div className="answer-letter">{letterMapping[index]}</div>
      <div className="answer-text">{answer}</div>
    </div>
  )
}

export default Answer
