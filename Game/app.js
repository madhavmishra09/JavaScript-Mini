let randomNumber = Math.floor(Math.random() * 100) + 1;
const submit = document.querySelector('#subt');
const guessField = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');
let prevGuess = [];
let numGuess = 1;
let playGame = true;

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a number between 1 and 100');
        return false;
    }
    return true;
}

function displayGuesses(guess) {
    prevGuess.push(guess);
    guessSlot.textContent = prevGuess.join(' ');
}

function displayMessage(message, color = "#facc15") {
    lowOrHi.textContent = message;
    lowOrHi.style.color = color;
}

function endGame(message, color) {
    guessField.disabled = true;
    submit.disabled = true;
    displayMessage(message, color);
    setTimeout(() => {
        setUpReset();
    }, 1200);
}

function setUpReset() {
    let resetBtn = document.querySelector('.reset-btn');
    if (!resetBtn) {
        resetBtn = document.createElement('button');
        resetBtn.textContent = 'Start New Game';
        resetBtn.classList.add('reset-btn');
        startOver.appendChild(resetBtn);
        resetBtn.addEventListener('click', resetGame);
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    prevGuess = [];
    numGuess = 1;
    guessSlot.textContent = '';
    remaining.textContent = '10';
    lowOrHi.textContent = '';
    guessField.disabled = false;
    submit.disabled = false;
    guessField.value = '';
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) resetBtn.remove();
    playGame = true;
}

function checkGuess(e) {
    e.preventDefault();
    if (!playGame) return;
    const guess = Number(guessField.value);
    if (!validateGuess(guess)) return;
    displayGuesses(guess);
    remaining.textContent = 10 - prevGuess.length;
    if (guess === randomNumber) {
        endGame('🎉 Congratulations! You got it right!', '#22c55e');
        playGame = false;
    } else if (prevGuess.length === 10) {
        endGame(`😢 Game Over! The number was ${randomNumber}.`, '#ef4444');
        playGame = false;
    } else {
        if (guess < randomNumber) {
            displayMessage('Last guess was too low!', '#facc15');
        } else {
            displayMessage('Last guess was too high!', '#facc15');
        }
    }
    guessField.value = '';
}

document.querySelector('.form').addEventListener('submit', checkGuess);
