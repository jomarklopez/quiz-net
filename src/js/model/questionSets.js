import uniqid from 'uniqid';

export default class QuestionSets {
    constructor() {
        this.qsets = [];
    }

    addQuestionSet(quizName, questions, answerKey) {
        questions = removeEmptyLines(questions.value.split(/\n/));
        answerKey = removeEmptyLines(answerKey.value.split(/\n/));
        quizName = quizName.value;


        const qset = {
            quizName: quizName,
            id: uniqid(),
            questions: questions,
            answerKey: answerKey,
            choices: createChoices(answerKey)
        }

        this.qsets.push(qset);
        console.log(qset);

        return qset;
    }

    deleteQuestionSet(id) {
        const index = this.qsets.findIndex(el => {
            el.id === id;
        })
        this.qsets.splice(index, 1);
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

function createChoices(answerKey, answer) {

}