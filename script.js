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
let result = 0;
let gotOperator = false;

const displayMonitor = document.querySelector("#display-monitor");
const previousDisplay = document.querySelector(".previous-display");
const currentDisplay = document.querySelector(".current-display");
const operator = document.querySelector(".operator");

displayMonitor.appendChild(previousDisplay);
displayMonitor.appendChild(currentDisplay);
displayMonitor.appendChild(operator);

const numpad = document.querySelectorAll(".one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero, .decimal");
numpad.forEach(numKey => numKey.addEventListener("click", inputNumber));

//Decide whether to get to the input of num2 or not
function inputNumber() {
    const goToNum2 = new Promise((resolve) => {
        if (num1 && gotOperator) {
            currentDisplay.textContent = ""
            resolve(this.textContent);
        }
    });

    goToNum2
        .then((value) => currentDisplay.text += value)
        .then(() => gotOperator = false)
        .catch(() => console.error("Error"))

    if (currentDisplay.textContent.length < 10) currentDisplay.textContent += this.textContent;
    // if (result) {
    //     num1 = result;
    //     num2 = 0;
    // }
}


//Pressing the math symbol will also register num1's value
const symbols = document.querySelectorAll(".divide, .multiply, .subtract, .add");
symbols.forEach(symbol => symbol.addEventListener("click", getOperator));

function getOperator() {
    if (currentDisplay.textContent == "" && this.textContent == "-") {
        currentDisplay.textContent += "-";
    }
    if (currentDisplay.textContent == "" || currentDisplay.textContent == "-") return;
    operator.textContent = this.textContent;
    num1 = +currentDisplay.textContent;
    gotOperator = true;
}


//Pressing the equal symbol will register num2 and output the answer
const equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", getResult);

function getResult() {
    if (!num1 || !operator.textContent) return;

    if (num1 && !num2 && gotOperator) {
        currentDisplay.textContent = num1;
        operator.textContent = "";
    }
    if (num1 && operator.textContent && !gotOperator) {
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
            .then(() => operator.textContent = "")
            .then(() => currentDisplay.textContent = result)
            .catch((warning) => currentDisplay.textContent = warning);
    }
}



//Clear screen and Backspace
const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", doBackspace);

function doBackspace() {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, currentDisplay.textContent.length - 1);
}

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", clearScreen);

function clearScreen() {
    currentDisplay.textContent = "";
    previousDisplay.textContent = "";
    operator.textContent = "";
    num1 = 0;
    num2 = 0;
    result = 0;
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

