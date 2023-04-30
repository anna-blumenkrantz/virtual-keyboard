const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        englishLayout: true
        },

    init() {
        //create input area
        const textarea = document.createElement("textarea");
        textarea.classList.add("use-keyboard-input");
        document.body.appendChild(textarea);
        //create input area
        const languageInfo = document.createElement("h3");
         languageInfo.classList.add("title");
        languageInfo.textContent = 'Press Shift Alt left for switching languages'
        document.body.appendChild(languageInfo);
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const english = [
            "`", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "-", "=", "Backspace",
            "Tab","KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP","[", "]", "\\", "Delete",
            "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",";", "\"", "Enter",
            "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", ",", ".", "?","ShiftRight","ArrowUp",
            "ControlLeft", "AltLeft","Space","AltRight", "ControlRight","ArrowLeft", "ArrowDown", "ArrowRight"
        ];
        const russian = [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\',"Delete",
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'ShiftLeft', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', "arrow_up","ShiftRight",
        "ControlLeft", "AltLeft","Space","AltRight", "ArrowLeft", "ArrowDown", "ArrowRight","ControlRight"
        ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        english.forEach(key => {
            var insertLineBreak = ["Backspace", "Delete", "Enter", "ArrowUp"].indexOf(key) !== -1;
            const keyElement = document.createElement("button");

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            // Add data-key attribute with value of key
            keyElement.setAttribute("data-key", key);
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "Backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "CapsLock":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");
                        keyElement.addEventListener("click", () => {
                            this._toggleCapsLock();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        });

                    break;

                 case "ShiftLeft":
                 case "ShiftRight":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                     keyElement.textContent = key.replace("Left", "").replace("Right", "");
                     keyElement.addEventListener("click", () => {
                            this._toggleShift();
                            keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                        });
                    break;

                case "ControlLeft":
                case "ControlRight":
                    keyElement.classList.add("keyboard__key--wide");
                     keyElement.textContent = "Ctrl";
                    break;

                 case "AltLeft":
                 case "AltRight":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_alt");
                    keyElement.textContent = key.replace("Left", "").replace("Right", "");
                    break;

                case "Enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "Space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                 case "Delete":
                    keyElement.textContent = 'Del';
                    // const textarea = document.querySelector(".use-keyboard-input");
                    // console.log('textarea'+textarea);
                    // var selectionStart = textarea.selectionStart;
                    // var selectionEnd = textarea.selectionEnd;
                    // console.log('selectionStart'+selectionStart);

                    // if (selectionStart === selectionEnd) {
                    // this.properties.value = this.properties.value.slice(0, selectionStart - 1) + this.properties.value.slice(selectionStart);
                    // textarea.selectionStart = selectionStart - 1;
                    // textarea.selectionEnd = selectionEnd - 1;
                    // } else {
                    // this.properties.value = this.properties.value.slice(0, selectionStart) + this.properties.value.slice(selectionEnd);
                    // textarea.selectionStart = selectionStart;
                    // textarea.selectionEnd = selectionStart;
                    // }

                    break;

                case "Tab":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");
                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });
                    break;
                case "ArrowUp":
                    // keyElement.innerHTML = createIconHTML(`keyboard_${key}`);
                      keyElement.textContent = key.replace("Arrow", "");
                      //TODO move coursour or print
                      keyElement.addEventListener("click", () => {
                        this.properties.value += "Up";
                        this._triggerEvent("oninput");
                    });
                break;

                case "ArrowDown":
                    //   keyElement.innerHTML = createIconHTML(`keyboard_${key}`);
                      keyElement.textContent = key.replace("Arrow", "");
                      //TODO move coursour
                        keyElement.addEventListener("click", () => {
                        this.properties.value += "Down";
                        this._triggerEvent("oninput");
                    });
                break;
                 case "ArrowRight":
                    //   keyElement.innerHTML = createIconHTML(`keyboard_${key}`);
                      keyElement.textContent = key.replace("Arrow", "");
                      //TODO move coursour
                        keyElement.addEventListener("click", () => {
                        this.properties.value += "Right";
                        this._triggerEvent("oninput");
                    });
                break;
                 case "ArrowLeft":
                    //   keyElement.innerHTML = createIconHTML(`keyboard_${key}`);
                      keyElement.textContent =  key.replace("Arrow", "");
                      //TODO move coursour
                       keyElement.addEventListener("click", () => {
                        this.properties.value += "Left";
                        this._triggerEvent("oninput");
                       });
                break;

                case "br":
                    insertLineBreak = true;
                    break;

                //handle alphanumeric keys
                default:
                var alphanumericKey = key.replace("Key", "").replace("Digit", "");
                keyElement.textContent = alphanumericKey.toLowerCase();
                keyElement.addEventListener("click", () => {
                    this.properties.value += this.properties.capsLock || this.properties.shift? alphanumericKey.toUpperCase() : alphanumericKey.toLowerCase();
                    if(this.properties.shift) {
                        this._toggleShift();
                    }
                    this._triggerEvent("oninput");
                });

                break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.textContent.length ==1) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

     _toggleShift() {
        this.properties.shift = !this.properties.shift;

        for (const key of this.elements.keys) {
            if (key.textContent.length ==1) {
                key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
            if(key.textContent =='Shift') {
                 key.classList.toggle("keyboard__key--active");
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    runOnKeys(func, ...codes) {
      let pressed = new Set();

      document.addEventListener('keydown', function(event) {
        pressed.add(event.code);

        for (let code of codes) { // are all keys in the set?
          if (!pressed.has(code)) {
            return;
          }
        }
        pressed.clear();
        func();
      });

      document.addEventListener('keyup', function(event) {
        pressed.delete(event.code);
      });

    },

    _switchLayout() {
        this.properties.englishLayout = !this.properties.englishLayout;
        Keyboard.init();
    }

};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
    this.document.onkeydown = function (event) {
         document.querySelectorAll(".keyboard__key").forEach(function(element) {
            if (element.getAttribute("data-key") == event.code) {
                element.focus();
                if(event.key.length ==1) {
                    Keyboard.properties.value += event.key;
                    Keyboard._triggerEvent('oninput');
                }
                }
        });
    };

    // Keyboard.runOnKeys(Keyboard._switchLayout, "ShiftLeft", "AltLeft");
});
