
const Player = {
    One: 1,
    Two: 2
}

const Game = {
    CurrentPlayer: Player.One,
    GameOver: false
}

function ChangePlayer() {
    Game.CurrentPlayer = Game.CurrentPlayer == Player.One ? Player.Two : Player.One;
}

function PlayTile(ev) {
    if(!Game.GameOver){
        if (ev.path[0].textContent == '') {
            ev.path[0].textContent = Game.CurrentPlayer == Player.One ? 'X' : 'O';
            ChangePlayer();
            DisplayTitle();
        }
    }
}

function DisplayTitle(){
    let title = document.getElementById('title');
    title.textContent = 'asd';
    if(!Game.GameOver){
        title.textContent = Game.CurrentPlayer == Player.One ? 'Ход: Крестики' : 'Ход: Нолики';
    }
}

function paintField() {
    let res = document.getElementsByClassName('tile');

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            res[i * 3 + j].style.backgroundColor = i % 2 ?
                (j % 2 ? '#F0DAB5' : '#B58763') : (j % 2 ? '#B58763' : '#F0DAB5');
        }
    }
}
function createField() {
    let field = document.getElementById('tictactoe');

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.className = 'tile';
        tile.id = i;
        tile.addEventListener('click', function () { PlayTile(event) });
        field.appendChild(tile);
    }
}


window.onload = () => {
    createField();
    paintField();
}