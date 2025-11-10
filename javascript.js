const myParty = [];
const main = document.querySelector('.main')

function Character (name, role, level, status) {
    this.name = name;
    this.role = role;
    this.level = level;
    this.isAlive = status;
    this.id = crypto.randomUUID();
}

addCharacterToParty('Bob', 'Mage', 14, true);
addCharacterToParty('Crystal', 'Healer', 6, false);

renderParty();

function addCharacterToParty (name, role, level, status) {
    let newCharacter = new Character (name, role , level, status);
    myParty.push(newCharacter);
}

function generateRandomNumber (size) {
    return Math.floor(Math.random() * size) + 1;
}

function clearParty () {
    main.replaceChildren();
}

function renderParty () {
    for (let currentCharacter of myParty) {0
        let newCard = createElement ('div', ['card'], '', main);
         let newTitle = createElement('div', ['title'], currentCharacter.name, newCard);
        let newDelete = createElement('div', ['delete'], 'X', newCard)
        let newInfo = createElement ('div', ['info', `info-${generateRandomNumber(6)}`], '', newCard);
        let newRoleContainer = createElement ('div', ['role-container'], '', newInfo);
        let newRoleText = createElement ('div', ['role-text'], 'Role:', newRoleContainer);
        let newRole = createElement ('div', ['role'], currentCharacter.role, newRoleContainer);
        let newLevelContainer = createElement ('div', ['level-container'], '', newInfo);
        let newLevelText = createElement ('div', ['level-text'], 'Level:', newLevelContainer);
        let newLevel = createElement ('div', ['level'], currentCharacter.level, newLevelContainer);
        let newStatusContainer = createElement ('div', ['status-container'], '', newInfo);
        let newStatusText = createElement ('div', ['status-text'], 'Status:', newStatusContainer);
        if (currentCharacter.isAlive == true) {
            let newStatus = createElement ('div', ['status'], 'Alive', newStatusContainer);
            let newDefeatButton = createElement ('button', ['defeat'], 'Defeat', newInfo);
        }
        else {
           let newStatus = createElement ('div', ['status'], 'Defeated', newStatusContainer); 
           let newReviveButton = createElement ('button', ['revive'], 'Revive', newInfo); 
        } 
    }
}

function createElement (type, elementClasses, text, parentElement) {
    let newElement = document.createElement(type);
    for (let elementClass of elementClasses) {
        newElement.classList.add(elementClass);
    }
    newElement.textContent = text;
    parentElement.appendChild(newElement);
    return newElement;
}

let overlayOpen = false;
let newButton = document.querySelector('.newButton');
newButton.addEventListener("click", (e) => {
    toggleModal();
    overlayOpen = true;
})

let overlay = document.querySelector('.overlay');
overlay.addEventListener("click", (e) => {
    if (!e.target.classList.contains('overlay')) {
        return;
    }
    if (overlayOpen == true) {
        toggleModal();
        overlayOpen = false;
    }
})

let form = document.querySelector('form');
form.addEventListener("click" , (e) => {
    e.preventDefault();

    if  (e.target.classList.contains('addConfirmButton')) {
        toggleModal();
        form.reset();

        let nameInput = document.querySelector('#form-name-input');
        let roleInput = document.querySelector('#form-role-input');
        let levelInput = document.querySelector('#form-level-input');
        let statusInput = document.querySelector('#form-status-input');
        
        addCharacterToParty(nameInput.value, roleInput.value, levelInput.value, statusInput.value);

        clearParty();
        renderParty();
   }
})

function toggleModal () {
    let modal = document.querySelector('.overlay');
    modal.classList.toggle('hidden');
}