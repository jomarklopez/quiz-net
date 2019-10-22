export default class Quiz {
    constructor(name, questions, answerKey, choices) {
        this.name = name;
        this.questions = questions;
        this.choices = choices;
        this.answerKey = answerKey
    }

}

Array.prototype.shuffleArray = function () {
    var temp, j, n = this.length;
    while (--n > 0) {
        j = Math.floor(Math.random() * (n + 1));
        temp = this[j];
        this[j] = this[n];
        this[n] = temp;
    }
    return this;
}

this.choices.forEach(el => {
    el.shuffleArray();
});

