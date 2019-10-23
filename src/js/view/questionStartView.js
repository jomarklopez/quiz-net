import { elements } from './base';
let questionIndex = 0;
let curQuestionNum = questionIndex + 1;
let TheQuiz;
export const renderQuiz = (quiz) => {
    TheQuiz = quiz;
    const markup = `
    <div class="displayQuestions">
            <div class="questionNumber-container">
                <h2>Question ${curQuestionNum} of ${TheQuiz.questions.length}</h2>    
            </div>
        
            <div class="question-container">
                <p class="question">${quiz.questions[curQuestionNum - 1]}</p>
            </div>

            <p>Choose the right answer:</p>
            <div class="choices-container">
                <ul>
                    <li>
                        <input id="choice1" type="radio" name="userAnswer" value="${quiz.choices[curQuestionNum - 1][0]}">
                        <label for="choice1">${quiz.choices[curQuestionNum - 1][0]}</label>
                    </li>
                    <li>
                        <input id="choice2" type="radio" name="userAnswer" value="${quiz.choices[curQuestionNum - 1][0]}">
                        <label for="choice2">${quiz.choices[curQuestionNum - 1][1]}</label>
                    </li>
                    <li>
                        <input id="choice3" type="radio" name="userAnswer" value="${quiz.choices[curQuestionNum - 1][0]}">
                        <label for="choice3">${quiz.choices[curQuestionNum - 1][2]}</label>
                    </li>
                </ul>
            </div> 
        <button class="checkAnsBut button">Check Answer!</button>
        <button class="nextBut button">next</button>
        <button class="prevBut button">prev</button>
    </div>
    `
    elements.quizContainer.insertAdjacentHTML("afterbegin", markup);
};

export const prevQuestion = () => {
    if (curQuestionNum !== 1) {
        clearQuiz();
        curQuestionNum--
        renderQuiz(TheQuiz);
    }
}

export const nextQuestion = () => {
    if (curQuestionNum !== TheQuiz.questions.length) {
        clearQuiz();
        curQuestionNum++;
        renderQuiz(TheQuiz);
    }
}

export const clearQuiz = () => {
    const display = elements.quizContainer;
    while (display.hasChildNodes()) {
        display.removeChild(display.firstChild);
    };
}

export const getUserAnswer = () => {
    for (let i = 0; i < elements.inputChoices.length; i++) {
        if (elements.inputChoices[i].type = "radio") {
            if (elements.inputChoices[i].checked) {
                return elements.inputChoices[i].value;
            }
        }
    }
}

export const getQuestionAnswer = () => {
    return TheQuiz.answerKey[curQuestionNum - 1];
}