let description = "";

const mathInput = document.getElementById('math-input');
const renderedOutput = document.getElementById('rendered-output');
const latexOutput = document.getElementById('latex-output');
const formulaDescription = document.getElementById('formulaDescription');

// Append value to the MathLive input
function appendToInput(value) {
    mathInput.value += value;
}

// Clear the MathLive input
function clearInput() {
    mathInput.value = '';
    renderedOutput.textContent = '';
    latexOutput.textContent = '';
    description = '';
    formulaDescription.value = '';
}

// Render the formula and calculate (if possible)
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

// Add formula to database
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

    console.log("Формула добавлена: ", data);
    alert("Формула успешно добавлена!");
}


// Назначаем обработчик события для кнопки "Рассчитать"
document.getElementById('calculateButton').addEventListener('click', renderOutput);