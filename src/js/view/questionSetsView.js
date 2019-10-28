import { elements } from './base'

export const renderSetChoices = (set) => {
    const markup = `
        <div class="setCard" id="${set.quizName}">
            <p class="setCard_title">${set.quizName}</p>
            <div class="cardOptions"></div>

        </div>
    `;
    elements.questSetContainer.insertAdjacentHTML("beforeend", markup);
};

export const clearSetChoices = () => {
    const setBut = elements.questSetContainer;
    while (setBut.hasChildNodes()) {
        setBut.removeChild(setBut.firstChild);
    };
};