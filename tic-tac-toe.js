window.onload = function () {
    let squares = document.querySelectorAll("#board div");
    for (let tile = 0; tile < squares.length; tile++) {
        squares[tile].classList.add("square");
    }
  
    const options = ['X', 'O'];
    const board = document.getElementById("board");
    let currentPlayer = 0;
    var stateOfGame = board.children.length; // keeps track of tiles
    var nextPlayer;
    var gameOver = false;

    for (var index = 0; index < stateOfGame; index++) {
        nextPlayer = board.children[index];
        nextPlayer.addEventListener('click', tileClick);
    }
    
    // updates square with an X or O
    function tileClick() {
        if (this.textContent == "") { // prevents the tiles from changing players
            this.textContent = options[currentPlayer];
            this.classList.add(options[currentPlayer]);
            this.style.pointerEvents = "none";
        }
        if (checkWinner(squares)) {
            updateWinner.classList.add('you-won');
            updateWinner.innerHTML = `Congratulations! ${options[currentPlayer]} is the Winner!`;
            board.style.pointerEvents = 'none';
        } 
        currentPlayer = currentPlayer >= options.length - 1 ? 0 : currentPlayer + 1; //condition ? exprIfTrue : exprIfFalse
    }

    // tile is highlighted when mouse hovers
    for (let colour = 0; colour < squares.length; colour++) {
        squares[colour].onmouseover = function() {
            this.classList.add('hover');
        }
        squares[colour].onmouseout = function() {
            this.classList.remove('hover');
        }
    }

    let updateWinner = document.querySelector('#status');
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4 ,6],
    ];

    function checkWinner(squares) {
        let isBoardFull = true;
        for (const square of squares) {
          if (square.textContent === '') {
            isBoardFull = false;
            break;
          }
        }
      
        for (const comb of winningConditions) {
          const c0 = squares[comb[0]].textContent;
          const c1 = squares[comb[1]].textContent;
          const c2 = squares[comb[2]].textContent;

          if (c0 === '' || c1 === '' || c2 === '') {
            continue; // empty square, continue checking for a winner
          } else if (c0 === c1 && c1 === c2 && c0 !== '') { // matching squares line up. ie. All X's or All O's.
            return true;
          } 
        }
      
        if (isBoardFull) {
          updateWinner.classList.add('you-won');
          updateWinner.textContent = 'No Winner. There is a Draw. Play Again?';
        }
        return false;
    }
      

// restart game
    function refreshGame() {
        var board = document.getElementById("board").children;
        for (const square of board) {
            square.innerHTML = "";
            square.className = 'square';
            square.style.pointerEvents = "auto";
            updateWinner.classList.remove('you-won');
            updateWinner.textContent = "Move your mouse over a square and click to play an X or an O.";
        }
    }
    const refreshBtn = document.querySelector('.btn');
    refreshBtn.addEventListener('click', refreshGame);
}

