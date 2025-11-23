let gameBoard = (function (doc) {
    let size = 3;
    let board = [];
    let boardElem = doc.querySelector(".board");
    function init(){
        board = Array.from(Array(3), () => new Array(3));
        for (let i = 0; i < size; i++){
            let row = doc.createElement("div");
            row.classList.add("board-row");
            for (let j = 0; j < size; j++){
                let cell = doc.createElement("div");
                cell.classList.add("cell");
                cell.addEventListener("click", e => {
                    if (board[i][j] === undefined){
                        let val = gameTurn.move();
                        cell.textContent = val;
                        board[i][j] = val;
                        console.log(gameTurn.checkVictory(board));
                    }
                })
                row.appendChild(cell);
            }
            boardElem.appendChild(row);
        }
    }
    init();
    
})(document);


let gameTurn = (function () {
    let player1 = createPlayer("X");
    let player2 = createPlayer("O");
    let turn = 0;

    let move = function(){
        turn++;
        if (turn%2===0){
            return player2.symbol;
        }
        else {
            return player1.symbol;
        }
    }
    
    // do the check for 3 adjacent of a symbol in a row/column/diagonal to find winner (val = 3)
    let checkVictory = function(board){
        let size = board.length;
        console.log(size);
        // 3 adjacent cell on a row is the same -> has winner -> return true
        // check row
        for (let i = 0; i < size; i++){
            for (let j = 0; j < size - 2; j++){
                let symbol = board[i][j];
                if (symbol !== undefined){
                    if (symbol === board[i][j+1] && symbol === board[i][j+2]){
                        return true;
                    }
                }
            }
        }
        // check column
        for (let i = 0; i < size; i++){
            for (let j = 0; j < size - 2; j++){
                let symbol = board[i][j]
            }
        }
        return false;
    }
    return {move, checkVictory};
})();

function createPlayer(symbol){
    return {symbol: symbol};
}

