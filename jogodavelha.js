const board = document.getElementById("board");
const casinhas = document.getElementsByClassName("casinha");
const boxVencedor = document.getElementById("vencedor");
const resetButton = document.getElementById("resetButton");

let jogadas = 0;
let gameOver = false;

for (let i = 0; i < casinhas.length; i++) {
  casinhas[i].addEventListener('click', casinhaclick);
}

resetButton.addEventListener('click', resetGame);

function casinhaclick() {
    if (this.innerHTML === "" && !gameOver) {
        this.innerHTML = jogadas % 2 === 0 ? "X" : "O";
        jogadas += 1;    
    }
    if (jogadas >= 5) {
        verificaGanhador();
    }
    if (jogadas === 9 && !gameOver) {
        boxVencedor.innerHTML = "Empate!";
        setTimeout(resetGame, 2000); // Auto-reset after a tie
    }
}

function verificaGanhador() {
    const combinacoesVencedoras = [
        // Horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonal
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of combinacoesVencedoras) {
        if (casinhas[a].innerHTML && casinhas[a].innerHTML === casinhas[b].innerHTML && casinhas[a].innerHTML === casinhas[c].innerHTML) {
            boxVencedor.innerHTML = "O '" + casinhas[a].innerHTML + "' Venceu!";
            gameOver = true;
            setTimeout(resetGame, 2000); // Auto-reset after a win
            return;
        }
    }
}

function resetGame() {
    jogadas = 0;
    gameOver = false;
    for (let i = 0; i < casinhas.length; i++) {
        casinhas[i].innerHTML = "";
    }
    boxVencedor.innerHTML = "";
}
