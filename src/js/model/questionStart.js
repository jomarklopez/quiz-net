export default class Quiz {
    constructor(name, questions, choices) {
        this.name = name;
        this.questions = questions;
        this.choices = choices;
    }

    shuffleQuestionsAndChoices() {
        this.choices.forEach(el => {
            el.shuffleArray();
        });
        this.questions.shuffleArray();
    }

    checkAnswer(chosenAns, correctAns) {
        if (chosenAns === correctAns) {
            return true;
        } else {
            return false;
        }
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

