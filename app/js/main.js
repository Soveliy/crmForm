'use strict'
const addButton = document.querySelector('[data-add-role]');
const role =  document.querySelector('[data-role]');
const roleContainer = document.querySelector('[data-role-container]');


function createRole(){
  let newRole = document.createElement('div');
  newRole.className = "crmForm-item__input-container";
  newRole.dataset.role ='';
  newRole.innerHTML = `<input type="text" class="crmForm-item__input" placeholder="Введите название роли">
                    <div class="crmForm-item__input-remove" data-remove-role="" title="Удалить роль">X</div>
                    <div class="crmForm-item__added-role" data-add-employee="" title="Выберите сотрудника">+</div>`;
  addButton.before(newRole);
  
  
}
addButton.addEventListener('click', function (event) {
  createRole()
})


roleContainer.onclick = function(event) {
  if (event.target.className != 'crmForm-item__input-remove') return;
    let roleItem = event.target.closest('[data-role]');
    let roleInput = event.target.previousElementSibling;
    roleItem.classList.add("isHide");
    roleInput.dataset.hidden = '';
};

let optionsButtons = document.querySelectorAll(".options__button");
let advancedOptionButton = document.querySelectorAll(".adv-options__button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll("[data-align]");
let spacingButtons = document.querySelectorAll("[data-spacing]");
let formatButtons = document.querySelectorAll("[data-format]");
let scriptButtons = document.querySelectorAll("[data-script]");

//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  //No highlights for link, unlink,lists, undo,redo since they are one time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  //fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  //default size
  fontSizeRef.value = 3;
};

//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

//link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //If currently clicked button is already active
        if (button.classList.contains("isActive")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("isActive");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("isActive");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("isActive");
  });
};

window.onload = initializer();

