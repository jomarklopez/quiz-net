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
            //Add question set to set list
            state.questionSet.addQuestionSet(elements.nameArea, elements.questArea, elements.answerKeyArea);
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
//Submitting Questions
elements.submitQuestions.addEventListener("click", (e) => {
    e.preventDefault();
    controlQuestionSets();
});
elements.setChoicesArea.addEventListener("click", e => {
    if (e.target.matches(".questSet, .questSet *")) {
        //Get chosen quiz from quiz list
        let quiz = state.questionSet.qsets.find(el => {
            return e.target.name === el.quizName;
        });
        //Initialize the quiz
        if (!state.quizStart) {
            state.quizStart = new QuestionStart(quiz.quizName, quiz.questions, quiz.answerKey, quiz.choices);
        }
        state.quizStart.shuffleChoices();
        //Render the quiz
        QuestionStartView.clearQuiz();
        //Hide getQuestion and Display Question
        QuestionStartView.renderQuiz(state.quizStart);
        //Initialize progressbar
        QuestionStartView.initProgressBar();
    };
})

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
    } else if (e.target.innerText === "Skip") {
        QuestionStartView.nextQuestion();
    }
});



