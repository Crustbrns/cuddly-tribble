
const Player = {
    One: 1,
    Two: 2
}

const Game = {
    CurrentPlayer: Player.One,
    GameOver: false,
    Winner: null
}

function ChangePlayer() {
    Game.CurrentPlayer = Game.CurrentPlayer == Player.One ? Player.Two : Player.One;
}

function PlayTile(ev) {
    if (!Game.GameOver) {
        if (ev.path[0].textContent == '') {
            ev.path[0].textContent = Game.CurrentPlayer == Player.One ? 'X' : 'O';
            ChangePlayer();
            checkWin();
            DisplayTitle();
        }
    }
}

function DisplayTitle() {
    let title = document.getElementById('title');
    title.textContent = 'asd';
    if (!Game.GameOver) {
        title.textContent = Game.CurrentPlayer == Player.One ? 'Ход: Крестики' : 'Ход: Нолики';
    }
    else {
        title.textContent = `Победитель: ${Game.Winner}`;
    }
}

function checkWin() {
    let res = document.getElementsByClassName('tile');

    if (res[0].textContent != '' && res[0].textContent == res[1].textContent && res[0].textContent == res[2].textContent) DisplayWin(res[0].textContent);
    else if (res[3].textContent != '' && res[3].textContent == res[4].textContent && res[3].textContent == res[5].textContent) DisplayWin(res[3].textContent);
    else if (res[6].textContent != '' && res[6].textContent == res[7].textContent && res[6].textContent == res[8].textContent) DisplayWin(res[6].textContent);

    else if (res[0].textContent != '' && res[0].textContent == res[3].textContent && res[0].textContent == res[6].textContent) DisplayWin(res[0].textContent);
    else if (res[1].textContent != '' && res[1].textContent == res[4].textContent && res[1].textContent == res[7].textContent) DisplayWin(res[1].textContent);
    else if (res[2].textContent != '' && res[2].textContent == res[5].textContent && res[2].textContent == res[8].textContent) DisplayWin(res[2].textContent);

    else if (res[0].textContent != '' && res[0].textContent == res[4].textContent && res[0].textContent == res[8].textContent) DisplayWin(res[0].textContent);
    else if (res[6].textContent != '' && res[6].textContent == res[4].textContent && res[6].textContent == res[2].textContent) DisplayWin(res[6].textContent);

    else if (res[0].textContent != '' && res[1].textContent != '' && res[2].textContent != '' && res[3].textContent != ''
        && res[4].textContent != '' && res[5].textContent != '' && res[6].textContent != '' && res[7].textContent != ''
        && res[8].textContent != '') DisplayWin('tie');
}

function DisplayWin(winner) {
    Game.GameOver = true;
    if (winner == 'X') {
        Game.Winner = 'Крестики';
    }
    else if (winner == 'O') {
        Game.Winner = 'Нолики';
    }
    else {
        Game.Winner = 'Ничья';
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

function startNewGame(){
    Game.CurrentPlayer = Player.One;
    Game.GameOver = false;
    Game.Winner = null;

    let tiles = document.getElementsByClassName('tile');
    for (const item of tiles) {
        item.textContent = '';
    }

    DisplayTitle();
}


window.onload = () => {
    createField();
    paintField();
    DisplayTitle();
}