import uniqueid from 'uniqid';

export default class QuestionSets {
    constructor() {
        this.qsets = [];
    }

    addQuestionSet(quizName, questionsInput, answerKey) {
        questionsInput = removeEmptyLines(questionsInput.split(/\n/));
        answerKey = removeEmptyLines(answerKey.split(/\n/));
        var questions = [];
        for (let index = 0; index < questionsInput.length; index++) {
            let question = [questionsInput[index], answerKey[index]];
            questions.push(question);
        }
        let choices = createChoices(answerKey);

        const qset = {
            id: uniqueid(),
            quizName,
            questions,
            answerKey,
            choices
        }
        this.qsets.push(qset);
        //Persist data in local storage
        this.persistData();
        return qset;
    }

    generateQuestionObject() {

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

