import { elements } from './base'

export const renderSetChoices = (set) => {
    const markup = `<div class="setCard" id="${set.quizName}">
            <div class="setCard_options noselect">
                <span>&#8942;</span><div class="options_dropdown ">
                    <a class="rename noselect" href="#">Rename</a>
                    <a class="edit noselect" href="#">Edit</a>
                    <a class="delete noselect" href="#">Delete</a>
                </div></div>
            <p class="setCard_title noselect">${set.quizName}</p>
        </div>`;
    elements.questSetContainer.insertAdjacentHTML("beforeend", markup);
};

export const clearSetChoices = () => {
    const setBut = elements.questSetContainer;
    while (setBut.hasChildNodes()) {
        setBut.removeChild(setBut.firstChild);
    };
};