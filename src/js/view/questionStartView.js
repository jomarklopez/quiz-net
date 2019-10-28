import { elements } from './base';
let curQuestionNum = 1;
let TheQuiz, score = 0;
export const renderQuiz = (quiz) => {
    elements.quizContainer.style.display = "block";
    elements.setChoicesArea.style.display = "none";
    TheQuiz = quiz;
    const markup = `
    <div class="displayQuestions">
            <button class="backBut button"><span>Go Back</span></button>
            <div class="questionNumber-container">
                <h4>Question ${curQuestionNum} of ${TheQuiz.questions.length}</h4>    
            </div>
            <div class="progressBar-container">
                <div class="progressBar">
                    <div class="progress">
                        <div class="percent"></div>
                    </div>
                    <div class="steps">
                        
                    </div>
                </div>
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
                        <input id="choice2" type="radio" name="userAnswer" value="${quiz.choices[curQuestionNum - 1][1]}">
                        <label for="choice2">${quiz.choices[curQuestionNum - 1][1]}</label>
                    </li>
                    <li>
                        <input id="choice3" type="radio" name="userAnswer" value="${quiz.choices[curQuestionNum - 1][2]}">
                        <label for="choice3">${quiz.choices[curQuestionNum - 1][2]}</label>
                    </li>
                </ul>
            </div>
        <button class="checkAnsBut button">Check Answer!</button>
    </div>
    `
    elements.quizContainer.insertAdjacentHTML("afterbegin", markup);
    countSteps(TheQuiz.questions.length);
};

const countSteps = (num) => {
    for (let index = 0; index < num; index++) {
        if (index === 0) {
            const markup = `<div class="step selected" id="${index}"></div>`;
            document.querySelector(".steps").insertAdjacentHTML("beforeend", markup);
        } else {
            const markup = `<div class="step" id="${index}"></div>`;
            document.querySelector(".steps").insertAdjacentHTML("beforeend", markup);
        }
    }
}

let steps = [];
export const initProgressBar = () => {
    Array.prototype.forEach.call(elements.progressSteps, (e) => {
        steps.push(e);
        e.addEventListener('click', (x) => {
            console.log(x.target.id);
            nextQuestion(x.target.id);
        });
    });
}
/**TODO: FIX THE PROGRESS BAR TO WORK EVEN WITH LARGE NUMBERS */
export const progress = (stepNum) => {
    let p = stepNum + (100 * (stepNum / TheQuiz.questions.length));
    document.getElementsByClassName('percent')[0].style.width = `${p}%`;

    steps.forEach((e) => {
        if (e.id == stepNum) {
            e.classList.add('selected');
        } else {
            e.classList.remove('selected');
        }
    });
}

export const prevQuestion = () => {
    if (curQuestionNum !== 1) {
        clearQuiz();
        curQuestionNum--
        renderQuiz(TheQuiz);
    }
}

export const nextQuestion = (qNum) => {
    if (parseInt(qNum) >= 0) {
        curQuestionNum = parseInt(qNum);
    }
    if (curQuestionNum !== TheQuiz.questions.length) {
        curQuestionNum++;
        document.querySelector(".questionNumber-container").innerHTML = `<h4>Question ${curQuestionNum} of ${TheQuiz.questions.length}</h4>`;
        document.querySelector(".question-container").innerHTML = `<p class="question">${TheQuiz.questions[curQuestionNum - 1]}</p>`;
        document.querySelector(".choices-container").innerHTML = `
        <ul>
            <li>
                <input id="choice1" type="radio" name="userAnswer" value="${TheQuiz.choices[curQuestionNum - 1][0]}">
                <label for="choice1">${TheQuiz.choices[curQuestionNum - 1][0]}</label>
            </li>
            <li>
                <input id="choice2" type="radio" name="userAnswer" value="${TheQuiz.choices[curQuestionNum - 1][1]}">
                <label for="choice2">${TheQuiz.choices[curQuestionNum - 1][1]}</label>
            </li>
            <li>
                <input id="choice3" type="radio" name="userAnswer" value="${TheQuiz.choices[curQuestionNum - 1][2]}">
                <label for="choice3">${TheQuiz.choices[curQuestionNum - 1][2]}</label>
            </li>
        </ul>`;
    }
    document.querySelector(".checkAnsBut").innerHTML = "Check Answer!";
    progress(curQuestionNum - 1);
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
                return elements.inputChoices[i];
            }
        }
    }
}

export const getQuestionAnswer = () => {
    return TheQuiz.answerKey[curQuestionNum - 1];
}

export const showCorrectAnswer = (userAns, checkAnsButton, result) => {
    score += 1;
    const markup = `
    <p class="correctAnsIcon">&#10004;</p>
    `
    userAns.parentNode.insertAdjacentHTML("beforeend", markup);

    renderSteps(result);
    if (curQuestionNum === TheQuiz.questions.length) {
        checkAnsButton.innerHTML = "<span>Finish</span>";
    } else {
        checkAnsButton.innerHTML = "<span>Next Question</span>";
    }
}
export const showWrongAnswer = (userAns, checkAnsButton, result) => {
    const markup = `
    <p class="wrongAnsIcon">&#10008;</p>
    `
    userAns.parentNode.insertAdjacentHTML("beforeend", markup);
    checkAnsButton.classList.add('shakeElement');
    removeShakeButton(checkAnsButton);
    renderSteps(result);
    if (curQuestionNum === TheQuiz.questions.length) {
        checkAnsButton.innerHTML = "<span>Finish</span>";
    } else {
        checkAnsButton.innerHTML = "<span>Next Question</span>";
    }
}

const renderSteps = (result) => {
    if (result) {
        steps[curQuestionNum - 1].classList.remove('wrong');
        steps[curQuestionNum - 1].classList.add('correct');
    } else {
        steps[curQuestionNum - 1].classList.remove('correct');
        steps[curQuestionNum - 1].classList.add('wrong');
    }
}

const removeShakeButton = (checkAnsButton) => {
    checkAnsButton.addEventListener('animationstart', (e) => {
        e.target.classList.add('shakeElement');
        checkAnsButton.addEventListener('animationend', animationEndCallback);
    });

    let animationEndCallback = (e) => {
        checkAnsButton.removeEventListener('animationend', animationEndCallback);
        checkAnsButton.classList.remove('shakeElement');
    }
}

export const returnHome = () => {
    elements.setChoicesArea.style.display = "block";
    elements.quizContainer.style.display = "none";
    curQuestionNum = 1;
}

export const renderFinish = () => {
    elements.finishedContainer.style.display = "block";
    elements.quizContainer.style.display = "none";
    curQuestionNum = 1;
    const markup = `
    <h3>You got ${score} out of ${TheQuiz.questions.length}</h3>
    `
    elements.finishedContainer.insertAdjacentHTML("afterbegin", markup);
}