import { elements } from './base'

export const renderSetChoices = (set) => {
    const markup = `<div class="setCard" id="${set.quizName}" data-itemid=${set.id}>
            <div class="setCard_options noselect" id="${set.quizName}"><span id="${set.quizName}">&#8942;</span><div class="options_dropdown " id="${set.quizName}">
                    <a class="rename noselect" id="${set.quizName}">Rename</a>
                    <a class="edit noselect" id="${set.quizName}">Edit</a>
                    <a class="delete noselect" id="${set.quizName}">Delete</a>
                </div></div>
            <p class="setCard_title noselect" id="${set.quizName}">${set.quizName}</p>
        </div>`;
    elements.questSetContainer.insertAdjacentHTML("beforeend", markup);
};

export const deleteSetCard = (id) => {
    const card = document.querySelector(`[data-itemid="${id}"]`);
    card.parentElement.removeChild(card);
}

export const clearSetChoices = () => {
    const setBut = elements.questSetContainer;
    while (setBut.hasChildNodes()) {
        setBut.removeChild(setBut.firstChild);
    };
};

export const insertNoQuizSets = () => {
    const markup = `<p id="noQuiz">No Quizzes yet, Add some now.</p>`;
    elements.setButtonsContainer.insertAdjacentHTML("beforebegin", markup);
}