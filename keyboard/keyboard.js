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
        document.body.innerHTML = "";
        this._createTitle();
        this._createInputArea();
        this._createLanguageInfo();
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
    _createTitle() {
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = "Virtual Keyboard w/ HTML, CSS & JS";
    document.body.appendChild(title);
  },

  _createInputArea() {
    const textarea = document.createElement("textarea");
    textarea.classList.add("use-keyboard-input");
    document.body.appendChild(textarea);
  },

  _createLanguageInfo() {
    const languageInfo = document.createElement("h3");
    languageInfo.classList.add("subtitle");
    languageInfo.textContent = "Press left Shift + Alt to switch between languages";
    document.body.appendChild(languageInfo);
  },

    _getLayoutSetting() {
    // Get the stored value of the 'layoutSetting' key, or use a default value of true
        const storedLayoutSetting = localStorage.getItem('layout') === 'false' ? false : this.properties.englishLayout;

        // Update the 'englishLayout' property based on the stored value
        this.properties.englishLayout = storedLayoutSetting;
    },
    _createKeys() {
        const fragment = document.createDocumentFragment();
         // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };
        const english = [
            "`", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "-", "=", "Backspace",
            "Tab","KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP","[", "]", "\\", "Delete",
            "CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL",";", "\"", "Enter",
            "ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", ",", ".", "?","ShiftRight","ArrowUp",
            "ControlLeft", "AltLeft","Space","AltRight", "ControlRight","ArrowLeft", "ArrowDown", "ArrowRight"
        ];
        const russian = [
            "ё",  "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "-", "=", "Backspace",
            "Tab", "Keyй", "Keyц", "Keyу", "Keyк", "Keyе", "Keyн", "Keyг", "Keyш", "Keyщ", "Keyз", "Keyх", "Keyъ", "\\","Delete",
            "CapsLock", "Keyф", "Keyы", "Keyв", "Keyа", "Keyп", "Keyр", "Keyо", "Keyл", "Keyд", "Keyж", "Keyэ", "Enter",
            "ShiftLeft", "Keyя", "Keyч", "Keyс", "Keyм", "Keyи", "Keyт", "Keyь", "Keyб", "Keyю", ".", "ShiftRight","ArrowUp",
            "ControlLeft", "AltLeft","Space","AltRight", "ControlRight","ArrowLeft", "ArrowDown", "ArrowRight"
        ];
        // Get the stored value of the 'layoutSetting' key, or use a default value of true
        const storedLayoutSetting = localStorage.getItem('layout') === 'false' ? false : this.properties.englishLayout;

        // Update the 'englishLayout' property based on the stored value
        this.properties.englishLayout = storedLayoutSetting;
        const currentLayout = this.properties.englishLayout ? english : russian;

        currentLayout.forEach(key => {
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
                    keyElement.textContent = "Del";
                    keyElement.addEventListener("click", () => {
                        const textarea = document.querySelector(".use-keyboard-input");
                        const cursorPos = this._getCursorPosition(textarea);
                        this.properties.value = this.properties.value.substring(0, cursorPos)+this.properties.value.substring(cursorPos+1);
                        this._triggerEvent("oninput");
                        textarea.selectionStart = cursorPos - 1;
                        textarea.selectionEnd = cursorPos - 1;
                    });
                    break;

                case "Tab":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_tab");
                     keyElement.addEventListener("click", () => {
                        const textarea = document.querySelector(".use-keyboard-input");
                        const cursorPos = this._getCursorPosition(textarea);
                        this.properties.value = this.properties.value.substring(0, cursorPos)+" "+ this.properties.value.substring(cursorPos);
                        this._triggerEvent("oninput");
                        textarea.selectionStart = cursorPos + 1;
                        textarea.selectionEnd = cursorPos + 1;
                    });
                    break;
                case "ArrowUp":
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_up");
                      keyElement.addEventListener("click", () => {
                        this.properties.value += "\u2191";
                        this._triggerEvent("oninput");
                    });
                break;

                case "ArrowDown":
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_down");
                        keyElement.addEventListener("click", () => {
                        this.properties.value += "\u2193";
                        this._triggerEvent("oninput");
                    });
                break;
                 case "ArrowRight":
                    keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
                        keyElement.addEventListener("click", () => {
                        this.properties.value += "\u2192";
                        this._triggerEvent("oninput");
                    });
                break;
                 case "ArrowLeft":
                   keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
                       keyElement.addEventListener("click", () => {
                        this.properties.value += "\u2190";
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
            if(key.textContent =="Shift") {
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

      document.addEventListener("keydown", function(event) {
        pressed.add(event.code);

        for (let code of codes) { // are all keys in the set?
          if (!pressed.has(code)) {
            return;
          }
        }
        pressed.clear();
        func();
      });

      document.addEventListener("keyup", function(event) {
        pressed.delete(event.code);
      });

    },

    _switchLayout() {
        this.properties.englishLayout = !this.properties.englishLayout;
        localStorage.setItem('layout', this.properties.englishLayout);
        Keyboard.init();
    },

    _getCursorPosition(textarea) {
        // Get cursor position
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;
        console.log("Cursor selectionStart:", selectionStart);
        console.log("Cursor selectionEnd:", selectionEnd);
        return selectionStart;
    }
};

window.addEventListener("DOMContentLoaded", function () {
   //load keyboard
    Keyboard.init();

    //track pressed keys
   this.document.onkeydown = function (event) {
    const pressedKeys = new Set();
    document.querySelectorAll(".keyboard__key").forEach(function(element) {
        if (element.getAttribute("data-key") == event.code) {
            pressedKeys.add(element);
            element.classList.add("keyboard__key--dark");
        }
    });

    // handle input
    if(event.key.length == 1) {
        Keyboard.properties.value += event.key;
        Keyboard._triggerEvent("oninput");
    }


    document.onkeyup = function(event) {
        document.querySelectorAll(".keyboard__key").forEach(function(element) {
            if (element.getAttribute("data-key") == event.code) {
                element.classList.remove("keyboard__key--dark");
                pressedKeys.delete(element);
            }
        });
    };
    };
    //handle language switch
    Keyboard.runOnKeys(Keyboard._switchLayout.bind(Keyboard), "ShiftLeft", "AltLeft");
});
