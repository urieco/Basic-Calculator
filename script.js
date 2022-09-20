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
    if (num2 === 0) return "Error! This will detonate the bomb. Goodbye.";
    return num1 / num2;
};

const operate = function (num1, operator, num2) {
    switch (operator) {
        case "add":
            return addition(num1, num2);
            break;
        case "subtract":
            return subtraction(num1, num2);
            break;
        case "multiply": 
            return multiplication(num1, num2);
            break;
        case "divide": 
            return division(num1, num2);
            break;
    }
};

operate(98, "divide", 3);