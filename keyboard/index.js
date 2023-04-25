const englishLayout = [  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up','Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Left', 'Down', 'Right','Ctrl']
];

const russianLayout = [  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
  ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', 'Shift'],
  ['Ctrl', 'Alt', ' ', 'Alt', 'Ctrl']
];
const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");
document.body.appendChild(wrapper);
const title = document.createElement("h1");
title.classList.add("title");
title.innerText = 'Virtual Keyboard';
wrapper.appendChild(title);

const keyboard = generateKeyboard(englishLayout); // or generateKeyboard(russianLayout)
wrapper.appendChild(keyboard);
    // Add virtual screen container
  const screenBox = document.createElement("div");
  screenBox.classList.add("screen");
wrapper.appendChild(screenBox);

function generateKeyboard(layout) {
  const keyboardContainer = document.createElement("div");
  keyboardContainer.classList.add("keyboard");

    //build key rows
  layout.forEach(row => {
    const keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboard__row");

    row.forEach(key => {
      const keyButton = document.createElement("button");
      keyButton.classList.add("keyboard__button");
      keyButton.textContent = key;

      if (key.length > 1) {
        keyButton.classList.add("keyboard__button--special");
        keyButton.classList.add(`keyboard__button--${key.replace(/\s/g, '').toLowerCase()}`);
        }
        if(key == ' ') {
            key = 'space';
            keyButton.classList.add(`keyboard__button--${key.toLowerCase()}`);
        }
        console.log('keyButton.classList '+JSON.stringify(keyButton.classList));
      keyButton.dataset.key = key[0];

      keyboardRow.appendChild(keyButton);
    });

    keyboardContainer.appendChild(keyboardRow);
  });

  return keyboardContainer;
}