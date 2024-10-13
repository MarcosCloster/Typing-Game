const divInfo = document.getElementById('divInfo');
const inputQuery = document.getElementById('inputQuery');
const startButton = document.getElementById('startButton');
const statsCard = document.getElementById('statsCard');
const gameCard = document.getElementById('gameCard');
const correctStats = document.getElementById('correctStats');
const incorrectStats = document.getElementById('incorrectStats');
const restartButton = document.getElementById('restartButton');
const totalTime = document.getElementById('totalTime')
const precision = document.getElementById('precision')
const timePerLetter = document.getElementById('timePerLetter')

let letrasCorrectas = 0;
let letrasIncorrectas = 0;
let juegoActivo = false;
let fraseCompleta = '';
let tiempo = 0;
let intervalo;
let palabrasPorMinuto = 0;


async function getElement() {
    try {
        const response = await fetch('https://corporatebs-generator.sameerkumar.website/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

startButton.addEventListener('click', async () => {
    const resp = await getElement();
    fraseCompleta = resp.phrase;
    divInfo.innerHTML = '';
    tiempo = 0;
    document.getElementById('contador').innerText = `Tiempo: 0s`;
    document.getElementById('contador').style.display = 'block';

    intervalo = setInterval(actualizarContador, 1000);

    resp.phrase.split("").forEach(character => {
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        divInfo.appendChild(characterSpan);
    });

    gameCard.style.display = 'block'; // Mostrar el card del juego
    inputQuery.style.display = 'block'; // Mostrar el input
    inputQuery.focus();
    startButton.style.display = 'none'; // Ocultar botón de empezar
    juegoActivo = true;
});

inputQuery.addEventListener('input', () => {
    const arraySpan = document.querySelectorAll('span');
    const arrayValue = inputQuery.value.split('');
    const index = arrayValue.length - 1;
    if (index < arraySpan.length) {
        const characterSpan = arraySpan[index];
        const character = arrayValue[index];

        if (character === characterSpan.innerText) {
            characterSpan.classList.add('disappear');
            letrasCorrectas++;
        } else {
            characterSpan.classList.add('incorrect');
            letrasIncorrectas++;
        }
    }

    if (inputQuery.value === fraseCompleta) {
        mostrarEstadisticas(); // Mostrar estadísticas cuando el juego termina
    }
});

function mostrarEstadisticas() {
    gameCard.style.display = 'none';
    statsCard.style.display = 'block'; // Mostrar el card de estadísticas
    let precisionValor = ((letrasCorrectas / (letrasCorrectas + letrasIncorrectas)) * 100)
    precision.textContent = `Precision: ${precisionValor.toFixed()}%`
    let averageTimePerLetter = tiempo / fraseCompleta.length;
    timePerLetter.textContent = `Tiempo medio por letra: ${averageTimePerLetter.toFixed(2)}` 
    totalTime.textContent = `Tiempo Total: ${tiempo}`
    correctStats.textContent = `Letras correctas: ${letrasCorrectas}`;
    incorrectStats.textContent = `Letras incorrectas: ${letrasIncorrectas}`;
    inputQuery.style.display = 'none';
    divInfo.style.display = 'none';
    restartButton.style.display = 'block'; // Mostrar botón de reinicio
    juegoActivo = false;
}

restartButton.addEventListener('click', () => {
    location.reload(); // Recargar la página
});

function actualizarContador() {
    tiempo++;
    document.getElementById('contador').innerText = `Tiempo: ${tiempo}s`;
}
