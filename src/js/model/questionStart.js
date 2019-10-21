export default class Quiz {
    constructor(name, questions, answerKey, choices) {
        this.name = name;
        this.questions = questions;
        this.choices = choices;
        this.answerKey = answerKey
    }
}