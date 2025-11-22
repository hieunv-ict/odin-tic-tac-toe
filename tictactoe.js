let gameBoard = (function (doc) {
    let board = [];

    let cells = doc.querySelectorAll(".cell");

    function init(){
        for(let cell of cells){
            cell.addEventListener("click", e =>{
                cell.textContent = gameTurn.move();
            })
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
        console.log(turn);
        if (turn%2===0){
            return player2.symbol;
        }
        else {
            return player1.symbol;
        }
    }
    return {move};
})();

function createPlayer(symbol){
    return {symbol: symbol};
}

