import uniqid from 'uniqid';


export default class QuestionSets {
    constructor() {
        this.qsets = [];
    }

    addQuestionSet(quizName, questions, answerKey) {
        questions = removeEmptyLines(questions.value.split(/\n/));
        answerKey = removeEmptyLines(answerKey.value.split(/\n/));
        quizName = quizName.value;
        let choices = createChoices(answerKey);


        const qset = {
            quizName: quizName,
            id: uniqid(),
            questions: questions,
            answerKey: answerKey,
            choices: choices
        }

        this.qsets.push(qset);
        console.log(qset);
        return qset;
    };

    deleteQuestionSet(id) {
        const index = this.qsets.findIndex(el => {
            el.id === id;
        })
        this.qsets.splice(index, 1);
    };
};

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
    };

    //Randomly remove elements until 3 are left except the right answer
    for (var i = 0; i <= choices.length - 1; i++) {
        let el = choices[i];
        while (el.length !== 3) {
            let curIndex = Math.floor(Math.random() * el.length)
            if (el[curIndex] !== answerKey[i]) {
                el.splice(curIndex, 1);
            }
        }
    };

    return choices;
}

/* TODO SHUFFLE CHOICES USING FISHER-YATES SHUFFLE THEN REMOVE ELEMENTS
   *   Shuffle in place by starting from the last index
   *   Randomly choose an element from a range of 0 to n
   *   Swap then decrement n
   *   Repeat until --n = 0;
   */


