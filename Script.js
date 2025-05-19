let display = document.getElementById('display');
let currentInput = '';
let result = 0;
let operation = null;

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            currentInput += value;
            display.value = currentInput;
        } else if (value === 'C') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (value === 'AC') {
            currentInput = '';
            result = 0;
            operation = null;
            display.value = '';
        } else if (value === '+' || value === '-' || value === '×' || value === '÷' || value === '%') {
            if (currentInput !== '' && operation !== null) calculate();
            if (currentInput !== '') {
                result = parseFloat(currentInput);
                currentInput += ` ${value} `;
            } else if (result !== 0) {
                currentInput = `${result} ${value} `;
            }
            operation = value;
            display.value = currentInput;
        } else if (value === '=') {
            calculate();
            operation = null;
        }
    });
});

function calculate() {
    const [num1, operator, num2] = currentInput.split(' ');
    const secondOperand = parseFloat(num2 || currentInput);
    if (isNaN(secondOperand)) return;

    switch (operation) {
        case '+':
            result = parseFloat(num1) + secondOperand;
            break;
        case '-':
            result = parseFloat(num1) - secondOperand;
            break;
        case '×':
            result = parseFloat(num1) * secondOperand;
            break;
        case '÷':
            if (secondOperand !== 0) result = parseFloat(num1) / secondOperand;
            else display.value = 'Error';
            break;
        case '%':
            result = parseFloat(num1) % secondOperand;
            break;
    }
    display.value = result;
    currentInput = result.toString();
}