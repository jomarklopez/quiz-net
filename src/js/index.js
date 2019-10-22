import QuestionSets from './model/questionSets';
import * as questionSetsView from './view/questionSetsView';
import QuestionStart from './model/questionStart';
import * as QuestionStartView from './view/questionStartView';
import { elements } from './view/base';




//Submitting Questions

const questionSet = new QuestionSets();

elements.submitQuestions.addEventListener("click", (e) => {
    let duplicate = false;
    e.preventDefault();
    if (elements.nameArea.value !== "" || elements.questArea.value !== "" || elements.answerKeyArea.value !== "") {
        questionSet.qsets.forEach(set => {
            if (set.quizName === elements.nameArea.value) {
                alert("Oops name is already taken!");
                duplicate = true;
            }
        });
        if (!duplicate) {
            //Add question set to set list
            questionSet.addQuestionSet(elements.nameArea, elements.questArea, elements.answerKeyArea);

            //Update the question set choices area
            questionSetsView.clearSetChoices();
            questionSet.qsets.forEach(set => {
                questionSetsView.renderSetChoices(set)
            });
        }

        //Clear Text Area
        clearTextArea();
    } else {
        alert("You need to fill in all the text areas")
    }

});

/* checkAnsBut.addEventListener("click", checkAnswer); */

elements.setChoicesArea.addEventListener("click", e => {

    if (e.target.matches(".questSet, .questSet *")) {
        //Send chosen quiz to view
        let quiz = questionSet.qsets.find(el => {
            return e.target.name === el.quizName;
        });
        const quizStart = new QuestionStart(quiz.quizName, quiz.questions, quiz.answerKey, quiz.choices);
        QuestionStartView.clearQuiz();
        QuestionStartView.renderQuiz(quizStart);
    };
})

elements.quizContainer.addEventListener("click", e => {
    if (e.target.matches(".checkAnsBut, .checkAnsBut *")) {

    } else if (e.target.matches(".prevBut, .prevBut *")) {
        QuestionStartView.prevQuestion();
    } else if (e.target.matches(".nextBut, .nextBut *")) {
        QuestionStartView.nextQuestion();
    }
});



function clearTextArea() {
    elements.nameArea.value = "";
    elements.questArea.value = "";
    elements.answerKeyArea.value = "";
}