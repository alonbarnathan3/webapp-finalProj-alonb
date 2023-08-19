const APP_URL = 'http://127.0.0.1:8000';
// const APP_URL = 'http://localhost';
function ScoreBoard() {
  // Redirect to index.html
  window.location.href = 'scores.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const userPreferences = document.getElementById('user-preferences');
  const currentScoreElement = document.getElementById('current-score');
  const bestScoreElement = document.getElementById('best-score');

  // Get user preferences from query string
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');
  const level = urlParams.get('level');
  const snakecolor = urlParams.get('snakecolor');
  const Foodcolor = urlParams.get('Foodcolor');
  let bestScore = urlParams.get('bestScore');

  // Display user preferences
  userPreferences.textContent = `Username: ${username}, Level: ${level}`;
  bestScoreElement.textContent = `Best Score: ${bestScore}`;

  // Game logic
  const width = 20;
  const height = 20;
  const cellCount = width * height;
  const cells = [];

  let snake = [2, 1, 0];
  let direction = 1;
  let foodIndex = 0;
  let interval = 0;

  let speed = 0;

// Function to set the food color
function setColor(option , color) {
document.documentElement.style.setProperty(option, color);
}

  if (level === 'beginner') {
    speed = 200;
  } else if (level === 'intermediate') {
    speed = 150;
  } else if (level === 'expert') {
    speed = 100;
  }

  // Set the food color based on the background color
if (Foodcolor === 'Blue') {
  setColor('--food-color','Blue');
} else if (Foodcolor === 'white') {
  setColor('--food-color', 'white');
} else if (Foodcolor === 'black') {
  setColor('--food-color' ,'black');
} else {
  setColor('--food-color' ,'black'); // Default color if the URL parameter is not provided or invalid
}
// Set the Snake color based on the background color
if (snakecolor === 'Blue') {
  setColor('--snake-color','Blue');
} else if (snakecolor === 'white') {
  setColor('--snake-color','white');
} else if (snakecolor === 'black') {
  setColor('--snake-color','black');
} else {
  setColor('--snake-color', 'black'); // Default color if the URL parameter is not provided or invalid
}

  let currentScore = 0;

  // Create game board cells
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameBoard.appendChild(cell);
    cells.push(cell);
  }

  // Set initial snake and food positions
  snake.forEach(index => cells[index].classList.add('snake'));
  cells[foodIndex].classList.add('food');

  // Move snake function
  function moveSnake() {
    // Remove snake tail
    const tail = snake.pop();
    cells[tail].classList.remove('snake');

    // Calculate new head position
    const head = snake[0];
    const nextHead = head + direction;

    // Check for collision with walls or snake body
    if (
      nextHead < 0 ||
      nextHead >= cellCount ||
      (direction === 1 && nextHead % width === 0) ||
      (direction === -1 && head % width === 0) ||
      cells[nextHead].classList.contains('snake')
    ) {
      // Game over
      clearInterval(interval);
      alert('Game Over');
      updateBestScore();
      return;
    }

    // Add new head to snake
    snake.unshift(nextHead);
    cells[nextHead].classList.add('snake');

    // Check if snake eats the food
    if (nextHead === foodIndex) {
      // Increase snake length
      snake.push(tail);
      cells[tail].classList.add('snake');

      // Generate new food position
      cells[foodIndex].classList.remove('food');
      foodIndex = generateFoodPosition();
      cells[foodIndex].classList.add('food');

      // Increase current score
      currentScore++;
      updateCurrentScore();
    }
  }

  // Generate random food position
  function generateFoodPosition() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * cellCount);
    } while (cells[newPosition].classList.contains('snake'));
    return newPosition;
  }

  // Handle key press event
  function handleKeyPress(event) {
    switch (event.key) {
      case 'ArrowUp':
        direction = -width;
        break;
      case 'ArrowDown':
        direction = width;
        break;
      case 'ArrowLeft':
        direction = -1;
        break;
      case 'ArrowRight':
        direction = 1;
        break;
    }
  }

  // Update current score display
  function updateCurrentScore() {
    currentScoreElement.textContent = `Current Score: ${currentScore}`;
  }

  // Update best score display
  function updateBestScore() {
    if (currentScore > bestScore) {
      bestScore = currentScore;
      bestScoreElement.textContent = `Best Score: ${bestScore}`;
        try {
          // fetch('https://web-workshop-gules.vercel.app',{
          fetch(`${APP_URL}/scores`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userName: username, level, bestScore})
        })
        } catch (error) {
          console.error('An error occurred', error);
        }
    }
  }

  // Event listener for key presses
  document.addEventListener('keydown', handleKeyPress);

  // Start the game
  interval = setInterval(moveSnake, speed);

  function startAgain() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set('bestScore', bestScore);
  window.location.href = `game.html?${urlParams.toString()}`;
}

const startAgainButton = document.getElementById('start-again-button');

startAgainButton.addEventListener('click', startAgain);

// Function to switch user and go back to the index.html page
function switchUser() {
  window.location.href = 'index.html';
}

// Event listener for the "Switch User" button
const switchUserButton = document.getElementById('switch-user-button');
switchUserButton.addEventListener('click', switchUser);

// Event listener for the "Score Board" button
const ScoreBoardButton = document.getElementById('score-board-button');
ScoreBoardButton.addEventListener('click', ScoreBoard);



});
