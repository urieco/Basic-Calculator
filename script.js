const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("mouseenter",
    (e) => button.classList.toggle("hovered")));
buttons.forEach(button => button.addEventListener("mouseleave",
    (e) => button.classList.toggle("hovered")));

buttons.forEach(button => button.addEventListener("click",
    (e) => {
        button.classList.add("clicked");
        playSound();
        setTimeout((() => button.classList.remove("clicked")), 110)
    }));

function playSound() {
    const audio = document.querySelector("audio");
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}

let num1 = 0;
let num2 = 0;
let result = null; //result's initial value or fallback value can't be anything other than "null" since "null" can be used for computing and calculating (compared to "undefined").
let gotOperator = false;
let maxLengthDisplay = 9;

const displayMonitor = document.querySelector("#display-monitor");
const previousDisplay = document.querySelector(".previous-display");
const currentDisplay = document.querySelector(".current-display");
const operator = document.querySelector(".operator");

displayMonitor.appendChild(previousDisplay);
displayMonitor.appendChild(currentDisplay);
displayMonitor.appendChild(operator);

const numpad = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero, .decimal");
numpad.forEach(numKey => numKey.addEventListener("click", inputNumber));


function inputNumber() {
    //Decide whether to get to the input of num2 or not
    const goToNum2 = new Promise((resolve) => {
        if (num1 != null && gotOperator) {
            currentDisplay.textContent = ""
            resolve(this.textContent);
        }
    });

    goToNum2
        .then((value) => currentDisplay.text += value)
        .then(() => gotOperator = false)
        .catch(() => console.error("Error"));

    if (currentDisplay.textContent == "Error") {
        currentDisplay.textContent = "";
        operator.textContent = "";
    }

    //If there is already a decimal point, forbid the user to input another one   
    if (currentDisplay.textContent.includes(".") && this.textContent == ".") return;

    if (result != null || result == 0) {
        doBackspace();
        result = null;
    }

    //While max length dipslay is 9, the if statement can only check the current length after inputting the 9th digit or character, hence the "<"
    if (currentDisplay.textContent.length < maxLengthDisplay) currentDisplay.textContent += this.textContent;
}



//Pressing the math symbol will also register num1's value
const symbols = document.querySelectorAll(".divide, .multiply, .subtract, .add");
symbols.forEach(symbol => symbol.addEventListener("click", getOperator));

function getOperator() {
    if (currentDisplay.textContent == "" && this.textContent == "-") {
        currentDisplay.textContent += "-";
    }
    if (currentDisplay.textContent == "" || currentDisplay.textContent == "-") return;
    // operator.textContent = this.textContent;
    // num1 = +currentDisplay.textContent;
    // gotOperator = true;

    const shortcutToResult = new Promise((resolve, reject) => {
        if (num1 != null && operator.textContent && !gotOperator) {
            // operator.textContent = this.textContent;
            resolve("No need to press \"=\"");
        }
        else reject("You will need to press \"=\"");
      });
      shortcutToResult
        .then(() => {
          getResult();
          gotOperator = true;
        })
        .catch(() => {
            operator.textContent = this.textContent;
            num1 = +currentDisplay.textContent;
            gotOperator = true;
        });
}


//Pressing the equal symbol will register num2 and output the answer
const equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", getResult);

function getResult() {
    if (num1 == null || !operator.textContent) return;

    if (num1 != null && !num2 && gotOperator) {
        currentDisplay.textContent = num1;
        operator.textContent = "";
    }
    if (num1 != null && operator.textContent && !gotOperator) {
        num2 = +currentDisplay.textContent;

        const goToResult = new Promise((resolve, reject) => {
            if (num2) {
                currentDisplay.textContent = "";
                resolve(num2);
            }
            if (num2 == 0 && operator.textContent == "/") {
                reject("Error");
            }
        });
        goToResult
            .then((num2) => result = operate(num1, operator.textContent, num2))
            .then((result) => displayPreviousEquation(result))
            .then(() => operator.textContent = "")
            .then(() => {
                //Throw an error for results that exceed the length of the display
                let resultString = `${result}`;
                if (resultString.length >= maxLengthDisplay) {
                    return currentDisplay.textContent = "OVERLOAD";
                } else {
                    currentDisplay.textContent = result;
                }
            })
            .then(() => {
                num1 = result;
                num2 = 0;
            })
            .catch((warning) => currentDisplay.textContent = warning);
    }
}

//Floating point math

//Display the previous equation
function displayPreviousEquation(result) {
    if (result != null) return previousDisplay.textContent = `${num1} ${operator.textContent} ${num2}`;
    if (result == null) return previousDisplay.textContent = "";
}


//Clear screen and Backspace
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", doBackspace);

function doBackspace() {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
    if (result != null) currentDisplay.textContent = "";
}

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clearScreen);

function clearScreen() {
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
    operator.textContent = "";
    num1 = 0;
    num2 = 0;
    result = null;
}


//Basic Math Functions
const addition = function (num1, num2) {
    return num1 + num2;
};

const subtraction = function (num1, num2) {
    return num1 - num2;
};

const multiplication = function (num1, num2) {
    return num1 * num2;
};

const division = function (num1, num2) {
    if (num2 === 0) return "Error!";
    return num1 / num2;
};

const operate = function (num1, operator, num2) {
    switch (operator) {
        case "+":
            return addition(num1, num2);
            break;
        case "-":
            return subtraction(num1, num2);
            break;
        case "X":
            return multiplication(num1, num2);
            break;
        case "/":
            return division(num1, num2);
            break;
    }
};

