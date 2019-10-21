import { elements } from './base';
let questionIndex = 0;
let curQuestionNum = questionIndex + 1;
let TheQuiz;
export const renderQuiz = (quiz) => {
    TheQuiz = quiz;
    const markup = `
    <div class="displayQuestions">
            <div class="questionNumber-container">
                <h2>Question ${curQuestionNum} of 5</h2>    
            </div>
        
            <div class="question-container">
                <p class="question">${quiz.questions[curQuestionNum - 1]}</p>
            </div>

            <p>Choose the right answer:</p>
            <div class="choices-container">
                <ul>
                    <li>
                        <input id="choice1" type="radio" name="radios" value="all">
                        <label for="choice1">Posterior/Dorsal Column</label>
                    </li>
                    <li>
                        <input id="choice2" type="radio" name="radios" value="all">
                        <label for="choice2">Spinal cord</label>
                    </li>
                    <li>
                        <input id="choice3" type="radio" name="radios" value="all">
                        <label for="choice3">Denticulate ligament</label>
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
    clearQuiz();
    curQuestionNum--
    renderQuiz(TheQuiz);
}

export const nextQuestion = () => {
    clearQuiz();
    curQuestionNum++;
    renderQuiz(TheQuiz);
}

export const clearQuiz = () => {
    const display = elements.quizContainer;
    while (display.hasChildNodes()) {
        display.removeChild(display.firstChild);
    };
}