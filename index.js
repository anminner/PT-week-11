let currentPlayer = 'X';
let moves = ['', '', '', '', '', '', '', '', ''];
const gameGrid = document.getElementById('game-grid');

for (let i = 0; i < 3; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.onclick = () => playMove(i * 3 + j);

        row.appendChild(cell);
    }

    gameGrid.appendChild(row);
}
function playMove(index) {
    console.log(index);
    if (moves[index] === '' && !checkWinner()) {
        moves[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        console.log(currentPlayer)
        document.getElementById('turn').textContent = `${currentPlayer}'s Turn`;
        checkWinner();
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
            document.getElementById('result').textContent = `${moves[a]} wins!`;
            document.getElementById('result').style.display = 'block';
            return true;
        }
    }

    if (moves.every(move => move !== '')) {
        document.getElementById('result').textContent = 'It\'s a draw!';
        document.getElementById('result').style.display = 'block';
        return true;
    }

    return false;
}

function restartGame() {
    currentPlayer = 'X';
    moves = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('turn').textContent = `${currentPlayer}'s Turn`;
    document.getElementById('result').style.display = 'none';
    Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.textContent = '');
}
