
let input;

window.addEventListener('click', (event) => {
    const element = event.target;


    if(element.classList.contains('input-area')) {
        input = element;
    }

    if(element.classList.contains('btn-check')) {
        event.preventDefault();

        let inputValue = input.value;
        handleCPF(inputValue);
    }
})


function handleCPF(inputValue) {

    inputValue = removeAllDifferentAsNumber(inputValue)
    inputValue = convertToArray(inputValue);

    if(isCPF(inputValue)) return;

    const list = inputValue.map(value => convertToNumber(value));
    handleProblem(list);
}

function handleProblem(cpf) {
    console.log(cpf)
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
    try {
        if(cpf.length > 11 || cpf.length < 11) {
            throw new Error('Incorrect CPF!');
        }
        return true;
    } catch (error) {
        console.log('Incorrect CPF!')
        return;
    }
}