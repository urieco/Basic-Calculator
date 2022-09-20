# Basic-Calculator
An on-screen calculator that executes one function at a time.

**Finished**

**To Do**
General Outline: 
1. The calculator contains functions for all of the basic math operators you typically find on simple calculators:
    - Addition
    - Subtraction
    - Multiplication
    - Division

2. Create an 'operate' function that takes an operator and 2 numbers and then calls one of the above functions on the numbers. 

3. Create a basic layout for the HTML calculator with buttons for each digit, each of the above functions and "Equals" key. 
    - Add a "clear" button.
    
4. Create a function that populate the display when you click the number buttons. You should be storing the 'display' value' in a variable somewhere for use in the next step. 

5. Wire the operate() with "=" key. 
    - Update the display with result.

6. User should be able to string together several operations and get the right answer, with **each pair of numbers being evaluated at a time**. 
    - Pressing any more operator key after the input of two operands and their operator will result in operate() being executed. 
    - Clear should wipe out any existing data.
    - Display a snarky error message if the user tries to divide by 0.

Extra Credit: 
- Users can get floating point numbers if they do the math required to get one, but they can't type them in yet. Add a '.' button and let users input decimals. Make sure to not allow them to type more than one. 
- Decorate the calculator.
- Add a "backspace" button, so the user can undo if they click the wrong number. 
- Add keyboard support!