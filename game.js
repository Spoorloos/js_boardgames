// Get canvas
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

// Game variables
const gameStates = {
    start: 0,
    inGame: 0,
    gameOver: 2
}

const inGameStates = {
    start: 0,
    roll: 1,
    end: 2
}

const boardPositionSize = 50;

let pawnPositions = [];
let gameState = gameStates.start;
let inGameState = inGameStates.start;

// Functions and classes
class Rect {
    constructor(x, y, width, height) {
        this.x = x, this.y = y;
        this.x2 = x + width, this.y2 = y + height;
        this.width = width, this.height = height;
    }
}

function drawTiles(boardPositions) {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the tiles
    for (let i = 0, len = boardPositions.length; i < len; i++) {
        const { x, y, width, height} = boardPositions[i];

        context.fillStyle = "#004400";
        context.fillRect(x, y, width, height);

        context.font = "14px Verdana";
        context.fillStyle = "#FFFFFF";
        context.fillText(+(i + 1), x + 5, y + 20);
    }
}

function createBoardPositions(path) {
    let x = -boardPositionSize - 10;
    let y = canvas.height - boardPositionSize;

    // Generate board positions
    return path.map(value => {
        switch (value) {
            case 0: // Up
                y -= boardPositionSize + 10;
                break;
            case 1: // Right
                x += boardPositionSize + 10;
                break;
            case 3: // Left
                x -= boardPositionSize + 10;
                break;
        }

        return new Rect(x, y, boardPositionSize, boardPositionSize);
    });
}

function drawIngame(inGameButtons) {
    for (let i = 0, len = inGameButtons.length; i < len; i++) {
        const { x, y, width, height } = inGameButtons[i];
        
        context.fillStyle = '#004444';
        context.fillRect(x, y, width, height);

        context.font = "14px Verdana";
        context.fillStyle = '#FFFFFF';
        context.fillText(+(i + 1), x + 5, y + 20);
    }
}

function createPlayerAmountButtons(playerAmountButtons) {
    const uiWindow = new Rect(700, 200, 300, 300);

    for (let i = 0; i < 4; i++) {
        let button = new Rect(uiWindow.x + 60 * i, uiWindow.y + 50, 50, 50);
        button.playerAmount = i + 1;
        playerAmountButtons.push(button);
    }
}

function initGame() {
    // Draw board
    const path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    const positions = createBoardPositions(path);

    drawTiles(positions);

    // Draw window
    let playerAmountButtons = [];
    createPlayerAmountButtons(playerAmountButtons);
    drawIngame(playerAmountButtons);
}

// Initialize game
initGame();