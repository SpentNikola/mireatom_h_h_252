

const mathInput = document.getElementById('math-input');
const renderedOutput = document.getElementById('rendered-output');
const latexOutput = document.getElementById('latex-output');
const formulaDescription = document.getElementById('formulaDescription');

// Назначение обработчика события для кнопки "Рассчитать"
document.getElementById('calculateButton').addEventListener('click', renderOutput);

// Назначение обработчика события для новой кнопки "Отправить на сервер"
document.getElementById('sendToServerButton').addEventListener('click', sendDataToServer);

// Функция для добавления значения к полю ввода MathLive
function appendToInput(value) {
    mathInput.value += value;
}

// Очистка поля ввода MathLive
function clearInput() {
    mathInput.value = '';
    renderedOutput.textContent = '';
    latexOutput.textContent = '';
    description = '';
    formulaDescription.value = '';
}

// Рендеринг формулы и вычисления (если возможно)
async function renderOutput() {
    const latexString = mathInput.value; // Get LaTeX from MathLive
    latexOutput.textContent = latexString;

    try {
        renderedOutput.textContent = `\$$ ${latexString} \$$`;
        MathJax.typeset();
    } catch (error) {
        renderedOutput.textContent = error.message;
    }

    description = formulaDescription.value;
}

// Отправка данных на сервер
function addFormulaToDatabase() {
    if (mathInput.value == '') {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    //data to DB
    const data = {
        latexSyntax: latexOutput.textContent,
        description: description
    };

    fetch('/add_formula', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Формула добавлена: ", data);
        alert("Формула успешно добавлена!");
    })
    .catch(error => console.error('Error:', error));
}