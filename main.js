const divInfo = document.getElementById('divInfo');  // Acceder al primer elemento con la clase 'hola'
const inputQuery = document.getElementById('inputQuery');
const startButton = document.getElementById('startButton'); // Obtener el botón de empezar
const statsDiv = document.getElementById('stats'); // Div para las estadísticas
const correctStats = document.getElementById('correctStats'); // Párrafo para estadísticas correctas
const incorrectStats = document.getElementById('incorrectStats'); // Párrafo para estadísticas incorrectas
const restartButton = document.getElementById('restartButton'); // Botón de reinicio

let letrasCorrectas = 0;
let letrasIncorrectas = 0;
let juegoActivo = false; // Variable para controlar el estado del juego
let fraseCompleta = ''; // Almacenar la frase completa para verificar

async function getElement() {
    try {
        const response = await fetch('https://corporatebs-generator.sameerkumar.website/', {
            method: 'GET',
            headers : {'Content-Type' : 'application/json'}
        });

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Manejar el evento de clic en el botón "Empezar"
startButton.addEventListener('click', async () => {
    const resp = await getElement(); // Obtener la frase
    fraseCompleta = resp.phrase; // Guardar la frase
    divInfo.innerHTML = ''; // Limpiar el div
    resp.phrase.split("").forEach(character => { // Agregar la frase a divInfo
        const characterSpan = document.createElement('span');
        characterSpan.innerText = character;
        divInfo.appendChild(characterSpan);
    });

    inputQuery.style.display = 'block'; // Mostrar el input
    inputQuery.focus(); // Enfocar el input
    startButton.style.display = 'none'; // Ocultar el botón de empezar
    juegoActivo = true; // Activar el juego
});

// Manejar la entrada en el input
inputQuery.addEventListener('input', () => {
    const arraySpan = document.querySelectorAll('span');
    const arrayValue = inputQuery.value.split('');

    // Solo verificamos el último carácter ingresado
    const index = arrayValue.length - 1; // Obtener el índice de la última letra ingresada
    if (index < arraySpan.length) { // Asegurarse de que el índice esté dentro de los límites
        const characterSpan = arraySpan[index];
        const character = arrayValue[index];

        if (character === characterSpan.innerText) {
            createLetterEfect(characterSpan);
            letrasCorrectas++;
        } else {
            console.log('Incorrecto');
            letrasIncorrectas++;
        }
    }

    // Verificar si se ha escrito toda la frase
    if (inputQuery.value === fraseCompleta) {
        mostrarEstadisticas(); // Llamar a la función para mostrar estadísticas
    }
});

// Mostrar estadísticas al final del juego
function mostrarEstadisticas() {
    statsDiv.style.display = 'block'; // Mostrar el div de estadísticas
    correctStats.textContent = `Letras correctas: ${letrasCorrectas}`; // Mostrar letras correctas
    incorrectStats.textContent = `Letras incorrectas: ${letrasIncorrectas}`; // Mostrar letras incorrectas
    inputQuery.style.display = 'none'; // Ocultar el input
    divInfo.style.display = 'none'; // Ocultar el div con la frase
    restartButton.style.display = 'block'; // Mostrar el botón de reinicio
    juegoActivo = false; // Desactivar el juego
}

// Crear efecto de letra
function createLetterEfect(element) {
    element.classList.toggle('invisible', true);
    const letter = element.textContent;
    const positionLetter = element.getBoundingClientRect();  
    const newLetter = document.createElement('span');
    newLetter.style = `left: ${positionLetter.left}px; top: ${positionLetter.top}px;`;
    newLetter.classList.add('disappear');
    newLetter.textContent = letter;
    const container = document.getElementById('divInfo');

    container.appendChild(newLetter);
}

// Manejar el evento de clic en el botón "Reiniciar"
restartButton.addEventListener('click', () => {
    location.reload(); // Recargar la página
});
