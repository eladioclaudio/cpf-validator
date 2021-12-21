/**
 * @author "Eládio Cláudio"
 */

// 705.484.450-52
let input;

let display = document.querySelector('.result');
let message = document.querySelector('#message');


window.addEventListener('click', (event) => {
    const element = event.target;


    if (element.classList.contains('input-area')) {
        input = element;
    }

    if (element.classList.contains('btn-check')) {
        event.preventDefault();

        let inputValue = input.value;
        if(inputValue == '') {
            alert('Empty Field');
            input.focus();
            return
        }
        
        handleCPF(inputValue);
    }
})


function handleCPF(inputValue) {

    inputValue = removeAllDifferentAsNumber(inputValue)
    inputValue = convertToArray(inputValue);

    if (isCPF(inputValue)) return;

    const list = inputValue.map(value => convertToNumber(value));
    handleProblem(list);
}

function handleProblem(cpf) {

    let originalCPF = [ ...cpf ].join('');
    cpf = removeLastTwoDigits(cpf);
    let newCpf = [ ...cpf ];

    let firstOutput = 0;
    let firstResult = 0;
    let secondResult = 0;
    let secondOutput = 0;

    firstResult = formula(cpf);
    firstOutput = checkLastDigit(firstResult, calculateLastValue)

    newCpf.push(firstOutput);
    // 705.484.450-52
    
    secondResult = formula(newCpf);
    secondOutput = checkLastDigit(secondResult, calculateLastValue)
    
    newCpf.push(secondOutput);

    newCpf = newCpf.join('')

    handleMessage(validate(newCpf, originalCPF));
}

function handleMessage(proposition) {
    if(proposition) {
        display.classList.remove('invalid');
        display.classList.add('valid');
        message.innerText = "This is a Valid Brazilian CPF";
    } else {
        display.classList.remove('valid');
        display.classList.add('invalid');
        message.innerText = "This CPF is invalid";
    }
}

function validate(cpf1, cpf2) {
    return cpf1 === cpf2;
}

function checkLastDigit(value, callback) {
    return (callback(value) > 9) ? 0 : callback(value); 
}

function formula(cpf) {
    return cpf.reduce((acc, value, index, array) => {
        let cpfSize = array.length + 1;
        let mult = value * (cpfSize - index);
        acc += mult;
        return acc;
    }, 0);
}

function calculateLastValue(handledResult) {
    return (11 - (handledResult % 11));
}


function removeLastTwoDigits(cpf) {
    return cpf.slice(0, -2);
}



function removeAllDifferentAsNumber(inputValue) {
    return inputValue.replace(/\D+/g, '');
}

function convertToArray(inputValue) {
    return inputValue.split('');
}

function convertToNumber(inputValue) {
    return Number(inputValue);
}

function isCPF(cpf) {
    if (cpf.length == 11) return false;

    input.value = '';
    input.focus();
    alert('Incorrect CPF!');
    console.log('Incorrect CPF!')
    return true;
}