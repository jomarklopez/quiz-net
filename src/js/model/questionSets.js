import uniqueid from 'uniqid';

export default class QuestionSets {
    constructor() {
        this.qsets = [];
    }

    addQuestionSet(quizName, questions, answerKey) {
        questions = removeEmptyLines(questions.split(/\n/));
        answerKey = removeEmptyLines(answerKey.split(/\n/));
        let choices = createChoices(answerKey);
        const qset = {
            id: uniqueid(),
            quizName: quizName,
            questions: questions,
            answerKey: answerKey,
            choices: choices
        }
        this.qsets.push(qset);
        console.log(this.qsets);
        //Persist data in local storage
        this.persistData();
        return qset;
    }

    deleteQuestionSet(id) {
        const index = this.qsets.findIndex(el => {
            return el.id === id;
        });
        this.qsets.splice(index, 1);
        console.log(this.qsets);
        //Persist data in local storage
        this.persistData();
    }

    persistData() {
        localStorage.setItem('qsets', JSON.stringify(this.qsets));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('qsets'));
        if (storage) {
            this.qsets = storage;
        }
        return storage;
    }
}

function removeEmptyLines(array) {
    for (let index = 0; index < array.length;) {
        const element = array[index];
        if (element === "") {
            array.splice(index, 1);
        } else {
            index++;
        }
    }
    return array;
}

function createChoices(answerKey) {
    const choices = [];
    for (let index = 0; index < answerKey.length; index++) {
        const element = answerKey[index];
        choices.push([...answerKey])
    }
    //Randomly remove elements until 3 are left except the right answer
    for (var i = 0; i <= choices.length - 1; i++) {
        let el = choices[i];
        while (el.length !== 3) {
            let curIndex = Math.floor(Math.random() * el.length)
            if (el[curIndex] !== answerKey[i]) {
                el.splice(curIndex, 1);
            }
        }
    }
    return choices;
}

