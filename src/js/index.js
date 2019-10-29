import QuestionSets from './model/questionSets';
import * as questionSetsView from './view/questionSetsView';
import QuestionStart from './model/questionStart';
import * as QuestionStartView from './view/questionStartView';
import { elements } from './view/base';


function clearTextArea() {
    elements.nameArea.value = "";
    elements.questArea.value = "";
    elements.answerKeyArea.value = "";
}

/** Global state of quiz app
 * - List of quizzes
 * - If game has started
 * 
 */
const state = {}
const controlQuestionSets = () => {
    if (!state.questionSet) { state.questionSet = new QuestionSets(); }
    let duplicate = false;
    if (elements.nameArea.value !== "", elements.questArea.value !== "", elements.answerKeyArea.value !== "") {
        state.questionSet.qsets.forEach(set => {
            if (set.quizName === elements.nameArea.value) {
                alert("Oops name is already taken!");
                duplicate = true;
            }
        });
        if (!duplicate) {
            //Get texts
            let name = elements.nameArea.value;
            name = name.toLowerCase();
            name = name.split(/\s/);
            name.forEach((word, index, array) => {
                array[index] = word[0].toUpperCase() +
                    word.slice(1);
            });
            name = name.join(" ");
            let questions = elements.questArea.value;
            questions = questions.replace(/-/g, ``);
            questions = questions.replace(/^\s*[\r\n]/gm, "");
            let answers = elements.answerKeyArea.value;
            answers = answers.replace(/-/g, ``);
            answers = answers.replace(/^\s*[\r\n]/gm, "");
            //Add question set to set list
            state.questionSet.addQuestionSet(name, questions, answers);
            //Render the question set choices area
            questionSetsView.clearSetChoices();
            state.questionSet.qsets.forEach(set => {
                questionSetsView.renderSetChoices(set)
            });
        }
        //Clear Text Area
        clearTextArea();
    }
}
//Listen to add quiz button
elements.addQuizBut.addEventListener("click", () => {
    elements.getQuestionsArea.style.display = "block";
});

//Rendering the textarea question dashes
let curVal;
elements.questArea.addEventListener("keyup", e => {
    if (e.isComposing || e.keyCode === 13) {
        curVal = elements.questArea.value;
        curVal = insertDivider(curVal);
        elements.questArea.value = curVal;
    };
});

elements.answerKeyArea.addEventListener("keyup", e => {
    if (e.isComposing || e.keyCode === 13) {
        curVal = elements.answerKeyArea.value;
        curVal = insertDivider(curVal);
        elements.answerKeyArea.value = curVal;

    };
});

const insertDivider = (curVal) => {
    curVal = curVal.replace(/-/g, ``);
    curVal = curVal.replace(/^\s*[\r\n]/gm, "");
    let dashes = "";
    for (let index = 0; index < elements.questArea.cols; index++) {
        dashes += "-";
    };
    curVal = curVal.replace(/\n/g, `\n${dashes}\n`);
    return curVal;
};

//Submitting Questions
elements.submitQuestions.addEventListener("click", (e) => {
    e.preventDefault();
    controlQuestionSets();
    if (document.getElementById("noQuiz")) {
        elements.setButtonsContainer.parentNode.removeChild(document.getElementById("noQuiz"));
    }
    elements.getQuestionsArea.style.display = "none";
});

//Set cards selector
elements.setChoicesArea.addEventListener("click", e => {
    if (e.target.text == "Rename") {
        console.log("rename was clicked");
    } else if (e.target.text == "Edit") {
        console.log("Edit was clicked");
    } else if (e.target.text == "Delete") {
        console.log("delete was clicked");
    } else if (e.target.matches(".setCard_options, .setCard_options *")) {
        e.target.parentNode.lastChild.classList.toggle("dropdownDisplay");
        if (e.target.parentNode.parentNode.nextSibling !== null) {
            e.target.parentNode.parentNode.nextSibling.classList.toggle("giveSpaceDropdown");
        }

    } else if (e.target.matches(".setCard, .setCard *")) {
        //Get chosen quiz from quiz list
        let quiz = state.questionSet.qsets.find(el => {
            return e.target.id === el.quizName;
        });
        //Initialize the quiz
        if (!state.quizStart) {
            state.quizStart = new QuestionStart(quiz.quizName, quiz.questions, quiz.answerKey, quiz.choices);
        };
        state.quizStart.shuffleChoices();
        //Render the quiz
        QuestionStartView.clearQuiz();
        //Hide getQuestion and Display Question
        QuestionStartView.renderQuiz(state.quizStart);
        //Initialize progressbar
        QuestionStartView.initProgressBar();
    }
})

//Quiz checking
elements.quizContainer.addEventListener("click", e => {
    if (e.target.innerText === "Check Answer!") {
        //Get chosen answer and correct answer
        const chosenAns = QuestionStartView.getUserAnswer();
        const correctAns = QuestionStartView.getQuestionAnswer();
        //Check if answer is correct
        const result = state.quizStart.checkAnswer(chosenAns.value, correctAns);
        if (result) {
            QuestionStartView.showCorrectAnswer(chosenAns, e.target, result);
        } else {
            QuestionStartView.showWrongAnswer(chosenAns, e.target, result);
        }
    } else if (e.target.innerText === "Next Question") {
        QuestionStartView.nextQuestion();
    } else if (e.target.innerText === "Go Back") {
        QuestionStartView.returnHome();
    } else if (e.target.innerText === "Finish") {
        QuestionStartView.renderFinish();
    }
});

elements.finishedContainer.addEventListener("click", e => {
    if (e.target.innerText === "Finish") {
        /**TODO INSERT SUMMARY OF ANSWERS */
        QuestionStartView.renderFinish();
    }
});


