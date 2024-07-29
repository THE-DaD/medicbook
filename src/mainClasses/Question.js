
class Question{
    constructor(question, correctAnswer, allAnswers){
        this.question = question
        this.correctAnswer = correctAnswer
        this.allAnswers = allAnswers
        this.answered = null
        this.wasCorrect = null
    }
    isCorrect(num){
        return (this.correctAnswer == num)
    }
    answer(answerNum){
        this.answered = answerNum
        this.wasCorrect = this.isCorrect(answerNum)
        console.log("Answered: ", this.allAnswers[answerNum], "Correct Answer", this.allAnswers[this.correctAnswer])
    }
}
export default Question;