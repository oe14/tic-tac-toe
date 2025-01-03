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

const Game = (() => {
    let currentPlayer = "X";
    let gameStarted = false;
    let gameOver = false;

    const startGame = () => {
        currentPlayer = "X";
        gameStarted = true;
        gameOver = false;
        GameBoard.reset();
        DisplayController.setMessage(`X's turn`);
    };

    const handleCellClick = (e) => {
        if (!gameStarted || gameOver) return;

        const index = e.target.dataset.index;
        const board = GameBoard.getBoard();

        if (!board[index]) {
            if (GameBoard.updateCell(index, currentPlayer)) {
                if (checkWin(board, currentPlayer)) {
                    DisplayController.setMessage(`${currentPlayer} wins!`);
                    gameOver = true;
                    return;
                } else if (checkTie(board)) {
                    DisplayController.setMessage("It's a tie!");
                    gameOver = true;
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                DisplayController.setMessage(`${currentPlayer}'s turn`);
            }
        }
    };

    const restartGame = () => {
        startGame();
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
        let messageType = "";

        if (message.includes("wins")) {
            messageType = "win";
        } else if (message.includes("tie")) {
            messageType = "tie";
        }

        if (messageDiv) {
            messageDiv.textContent = message;
            messageDiv.className = "";
            messageDiv.classList.add("message");
            if (messageType) {
                messageDiv.classList.add(messageType);
            }
        } else {
            const newMessageDiv = document.createElement("div");
            newMessageDiv.id = "message";
            newMessageDiv.textContent = message;
            newMessageDiv.classList.add("message");
            if (messageType) {
                newMessageDiv.classList.add(messageType);
            }
            document.body.insertBefore(newMessageDiv, document.getElementById("gameboard"));
        }
    };

    return { setMessage };
})();

Game.initialize();
