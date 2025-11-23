let gameLogic = (function () {
    let player1 = createPlayer("player1", "X");
    let player2 = createPlayer("player2", "O");
    let winner = undefined;
    let turn = 0;
    let endGame = false;

    let setPlayerName = function(num, name){
        if (num === 1){
            player1.name = name;
        }
        else if (num === 2){
            player2.name = name;
        }
    }
    let currentPlayer = function(){
        turn++;
        if (turn%2===0){
            return player2;
        }
        else {
            return player1;
        }
    }
    let nextPlayer = function(){
        if (turn%2===0){
            return player1;
        }
        else {
            return player2;
        }
    }
    
    let getWinner = function(){
        return winner;
    }

    let isGameEnd = function (){
        return endGame;
    }

    let endTheGame = function (symbol){
        endGame = true;
        if (symbol == player1.symbol){
            winner = player1;
        }
        else{
            winner = player2;
        }
    }
    
    // do the check for 3 adjacent of a symbol in a row/column/diagonal to find winner (val = 3)
    let checkVictory = function(board){
        let size = board.length;
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
        for (let j = 0; j < size; j++){
            for (let i = 0; i < size - 2; i++){
                let symbol = board[i][j]
                if (symbol !== undefined){
                    if (symbol === board[i+1][j] && symbol === board[i+2][j]){
                        return true;
                    }
                }
            }
        }
        //check diagonal
        for (let i = 1; i < size-1; i++){
            for (let j = 1; j < size-1; j++){
                let symbol = board[i][j];
                if (symbol !== undefined){
                    if (symbol === board[i-1][j-1] && symbol === board[i+1][j+1]){
                        return true;
                    }
                    else if (symbol === board[i-1][j+1] && symbol === board[i+1][j-1]){
                        return true;
                    }
                }
            }
        }
        //check if all cell is filled but no one wins -> draw -> return undefined;

        for (let i = 0; i < size; i++){
            for (let j = 0; j < size; j++){
                if (board[i][j] === undefined){
                    return false;
                }
                else if (i === size-1 && j === size-1){
                    return undefined;
                }
            }
        }
        return false;
    }
    return {isGameEnd, setPlayerName, currentPlayer, nextPlayer, checkVictory, getWinner, endTheGame,};
})();

let gameBoard = (function (doc) {
    let size = 3;
    let board = [];
    let boardElem = doc.querySelector(".board");
    let resultDialog = doc.querySelector("dialog");
    function init(){
        // restart game
        let restartBtn = doc.querySelector(".result-dialog > button");
        restartBtn.addEventListener("click", e =>{
            location.reload();
        })
        // display current player
        let banner = doc.querySelector(".turn");
        // start game -> display player name form
        let start = doc.querySelector(".player-name-dialog");
        let submitNameBtn = doc.querySelector(".player-name-dialog button");
        start.showModal();
        submitNameBtn.addEventListener("click", e =>{
            let playerNames = new Array(2);
            for (let i = 1; i <= 2; i++){
                playerNames[i-1] = doc.querySelector(`#player${i}`).value;
            }
            if (!playerNames.find(item => item === undefined)){
                e.preventDefault();
                for (let i = 0; i < 2; i++){
                    gameLogic.setPlayerName(i+1, playerNames[i]);
                    let displayName = doc.querySelector(`#player${i+1}-display`);
                    displayName.textContent = playerNames[i];
                }
                banner.textContent = gameLogic.nextPlayer().name + "'s turn";
                start.close();
            }
        })
        
        
        // initialize board for game
        board = Array.from(Array(3), () => new Array(3));
        for (let i = 0; i < size; i++){
            // get row element in board to add cell element
            let row = doc.createElement("div");
            row.classList.add("board-row");
            // create cell and add click listener to each cell
            for (let j = 0; j < size; j++){
                let cell = doc.createElement("div");
                cell.classList.add("cell");
                cell.addEventListener("click", e => {
                    if (board[i][j] === undefined && !gameLogic.isGameEnd()){
                        // make a move
                        let player = gameLogic.currentPlayer();

                        // get player symbol to display
                        cell.textContent = player.symbol;
                        board[i][j] = player.symbol;

                        // display current turn
                        banner.textContent = gameLogic.nextPlayer().name + "'s turn";

                        // check if the game ends
                        let hasWinner = gameLogic.checkVictory(board);
                        if (hasWinner){
                            gameLogic.endTheGame(player.symbol);
                            let winner = gameLogic.getWinner();
                            //display dialog for result
                            resultDialog.showModal();
                            let winnerText = doc.querySelector(".game-result");
                            winnerText.textContent = "Winner is " + winner.name;
                            banner.textContent = "Winner is " + winner.name
                        }
                        // if the game ties
                        else if (hasWinner === undefined){
                            resultDialog.showModal();
                            let winnerText = doc.querySelector(".game-result");
                            winnerText.textContent = "The game is draw";
                            banner.textContent = "The game is draw";
                        }
                    }
                })
                row.appendChild(cell);
            }
            boardElem.appendChild(row);
        }
    }
    init();
    
})(document);

function createPlayer(playerName, symbol){
    return {name: playerName, symbol: symbol};
}

