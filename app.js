const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        const gameboardDiv = document.getElementById("gameboard");
        gameboardDiv.innerHTML = "";
        board.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell");
            cellDiv.dataset.index = index;
            cellDiv.textContent = cell;
            gameboardDiv.appendChild(cellDiv);
        });
    };

    const updateCell = (index, symbol) => {
        if (!board[index]) {
            board[index] = symbol;
            render();
            return true;
        }
        return false;
    };

    const reset = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        render();
    };

    const getBoard = () => board;

    return { render, updateCell, reset, getBoard };
})();

const Player = (name, symbol) => {
    return { name, symbol };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver = false;

    const startGame = () => {
        const player1Name = prompt("Enter name for Player 1:") || "Player 1";
        const player2Name = prompt("Enter name for Player 2:") || "Player 2";

        players = [Player(player1Name, "X"), Player(player2Name, "O")];
        currentPlayerIndex = 0;
        gameOver = false;
        GameBoard.reset();
        DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn`);
    };

    const handleCellClick = (e) => {
        if (gameOver) return;

        const index = e.target.dataset.index;
        const board = GameBoard.getBoard();

        if (!board[index]) {
            const currentPlayer = players[currentPlayerIndex];
            if (GameBoard.updateCell(index, currentPlayer.symbol)) {
                if (checkWin(board, currentPlayer.symbol)) {
                	
                    DisplayController.setMessage(`${currentPlayer.name} wins!`);
                    gameOver = true;
                    return;
                } else if (checkTie(board)) {
                    DisplayController.setMessage("It's a tie!");
                    gameOver = true;
                    return;
                }
                currentPlayerIndex = (currentPlayerIndex + 1) % 2;
                DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn`);
            }
        }
    };

    const restartGame = () => {
        gameOver = false;
        GameBoard.reset();
        DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn`);
    };

    const checkWin = (board, symbol) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winConditions.some(condition => 
            condition.every(index => board[index] === symbol)
        );
    };

    const checkTie = (board) => {
        return board.every(cell => cell);
    };

    const initialize = () => {
        document.getElementById("startBtn").addEventListener("click", startGame);
        document.getElementById("restartBtn").addEventListener("click", restartGame);
        document.getElementById("gameboard").addEventListener("click", handleCellClick);
        GameBoard.render();
    };

    return { initialize };
})();

const DisplayController = (() => {
    const setMessage = (message) => {
        const messageDiv = document.getElementById("message");
        if (messageDiv) {
            messageDiv.textContent = message;
        } else {
            const newMessageDiv = document.createElement("div");
            newMessageDiv.id = "message";
            newMessageDiv.textContent = message;
            document.body.insertBefore(newMessageDiv, document.getElementById("gameboard"));
        }
    };

    return { setMessage };
})();

Game.initialize();


