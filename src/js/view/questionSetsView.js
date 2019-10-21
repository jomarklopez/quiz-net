import { elements } from './base'

export const renderSetChoices = (set) => {
    const markup = `
        <button name="${set.quizName}" class="questSet button">${set.quizName}</button>
    `;
    elements.setButtons.insertAdjacentHTML("beforeend", markup);
};

export const clearSetChoices = () => {
    const setBut = elements.setButtons;
    while (setBut.hasChildNodes()) {
        setBut.removeChild(setBut.firstChild);
    };
};

export const startQuiz = (quizName) => {

};