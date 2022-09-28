const audioCtx = new AudioContext();
const audio = new Audio('move-self.wav');
const source = audioCtx.createMediaElementSource(audio);
source.connect(audioCtx.destination);

const Players = {
    One: 1,
    Two: 2
}
const Game = {
    CurrentPlayer: Players.One,
    CurrentMove: 0,
    AvailableMoves: [],
    HistoryMoves: []
}

class Move {
    constructor(moveNum, startPos, finalPos) {
        this.moveNum = moveNum;
        this.startPos = startPos;
        this.finalPos = finalPos;
    }
}

function InitGame() {
    setDragging('black', false);
    setDragging('white', true);
}
function ChangePlayer() {
    Game.CurrentPlayer = Game.CurrentPlayer == Players.One ? Players.Two : Players.One;
    if (Game.CurrentPlayer == Players.One) {
        setDragging('black', false);
        setDragging('white', true);
        // calcMoves('white');
    }
    else {
        setDragging('black', true);
        setDragging('white', false);
        Game.CurrentMove++;
        // calcMoves('black');
    }
}

function calcMoves(color) {
    let elements = document.getElementsByClassName(color);
    for (const item of elements) {
        console.log(`${item.id} ${item.parentElement.id}`);
    }
}

function calcDistinctMoves(i, color) {
    let fields = Array.from(document.getElementsByClassName('chess-field'));
    Game.AvailableMoves = [];

    if (fields.find(x => x.id == parseInt(i) - 9) != undefined
        && fields.find(x => x.id == parseInt(i) - 9).style.backgroundColor != 'rgb(240, 218, 181)') {

        if (color == 'white' && fields.find(x => x.id == parseInt(i) - 9).children.length != 0) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 9));
        }
        else if (color == 'black') {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 9));
        }
    }

    if (fields.find(x => x.id == parseInt(i) - 7) != undefined
        && fields.find(x => x.id == parseInt(i) - 7).style.backgroundColor != 'rgb(240, 218, 181)') {

        if (color == 'white' && fields.find(x => x.id == parseInt(i) - 7).children.length != 0) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 7));
        }
        else if (color == 'black') {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 7));
        }
    }

    if (fields.find(x => x.id == parseInt(i) + 7) != undefined
        && fields.find(x => x.id == parseInt(i) + 7).style.backgroundColor != 'rgb(240, 218, 181)') {

        if (color == 'black' && fields.find(x => x.id == parseInt(i) + 7).children.length != 0) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 7));
        }
        else if (color == 'white') {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 7));
        }
    }

    if (fields.find(x => x.id == parseInt(i) + 9) != undefined
        && fields.find(x => x.id == parseInt(i) + 9).style.backgroundColor != 'rgb(240, 218, 181)') {

        if (color == 'black' && fields.find(x => x.id == parseInt(i) + 9).children.length != 0) {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 9));
        }
        else if (color == 'white') {
            Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 9));
        }
    }

    console.log(Game.AvailableMoves);

    for (const item of Game.AvailableMoves) {
        let movement = document.createElement('div');
        movement.className = 'movement';
        if (!item.children.length != 0) {
            item.appendChild(movement);
        }
    }
}

function removeGraphMoves() {
    let res = document.getElementsByClassName('movement');
    while (res.length > 0) {
        res[0].parentNode.removeChild(res[0]);
    }
}

function paintField() {
    let res = document.getElementsByClassName('chess-field');

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            res[i * 8 + j].style.backgroundColor = i % 2 ?
                (j % 2 ? '#F0DAB5' : '#B58763') : (j % 2 ? '#B58763' : '#F0DAB5');
        }
    }
}
function createField() {
    let field = document.getElementById('chess');

    for (let i = 0; i < 64; i++) {
        let tile = document.createElement("div");
        tile.className = 'chess-field';
        tile.id = i;
        field.appendChild(tile);
    }
}
function setDraggable() {
    let res = document.getElementsByClassName('chess-field');

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (i % 2) {
                if (j % 2 == false) {
                    res[i * 8 + j].addEventListener('drop', function () { drop(event) });
                    res[i * 8 + j].addEventListener('dragover', function () { allowDrop(event) });
                }
            }
            else {
                if (j % 2) {
                    res[i * 8 + j].addEventListener('drop', function () { drop(event) });
                    res[i * 8 + j].addEventListener('dragover', function () { allowDrop(event) });
                }
            }
        }
    }
}
function fillField() {
    let fields = document.getElementsByClassName('chess-field');

    let index = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i * 8 + j < 24) || (i * 8 + j > 39)) {
                if (i % 2) {
                    if (j % 2 == false) {
                        fields[i * 8 + j].appendChild(setChecker(i, index));
                        index++;
                    }
                }
                else {
                    if (j % 2) {
                        fields[i * 8 + j].appendChild(setChecker(i, index));
                        index++;
                    }
                }
            }
        }
    }
}
function setChecker(index, checkerindex) {
    let checker = document.createElement("div");
    checker.className = 'checker';
    checker.draggable = true;
    checker.id = `ch${checkerindex}`;
    // checker.ondragstart = 'drag(event)';
    checker.addEventListener('dragstart', function () { drag(event), false });

    if (index > 2) {
        checker.classList.add('black');
    }
    else {
        checker.classList.add('white');
    }
    return checker;
}

const setDragCursor = value => {
    const body = document.getElementsByTagName('body').item(0);
    body.classList.toggle('grabbing', value);
}

function allowDrop(dragevent) {
    dragevent.preventDefault();
}

function drag(dragevent) {
    console.log(`Current player: ${Game.CurrentPlayer}`);
    removeGraphMoves();
    if (Game.CurrentPlayer == Players.One && dragevent.target.classList.contains('white')) {
        calcDistinctMoves(dragevent.target.parentElement.id, 'white');
        dragevent.dataTransfer.setData('div', dragevent.target.id);
        // dragevent.dataTransfer.effectAllowed = "copy";
        dragevent.dataTransfer.dropEffect = "copy";
        setDragCursor(false);
        console.log('drag start');
    }
    else if (Game.CurrentPlayer == Players.Two && dragevent.target.classList.contains('black')) {
        calcDistinctMoves(dragevent.target.parentElement.id, 'black');
        dragevent.dataTransfer.setData('div', dragevent.target.id);
        setDragCursor(false);
        console.log('drag start');
    }
}

function setDragging(color, truth) {
    let elements = document.getElementsByClassName(color);
    for (const item of elements) {
        item.draggable = truth;
        if (truth == false) {
            item.removeEventListener('dragstart', function () { drag(event), false });
            item.classList.remove('isdraggable');
        } else {
            item.addEventListener('dragstart', function () { drag(event), false });
            item.classList.add('isdraggable');
        }
    }
}

function addInHistory() {
    let color = Game.CurrentPlayer == Players.One ? 'black' : 'white';
    Game.HistoryMoves.push(new Move(Game.CurrentMove, color, 'qwe'));
    displayHistory();
}

function displayHistory() {
    let log = document.getElementById('log-container');
    let smth = document.createElement('index');
    let move = Game.HistoryMoves.slice(-1);
    smth.textContent = `${move[0].moveNum}, ${move[0].startPos}`;
    log.appendChild(smth);
}

function updateTitle() {
    let title = document.getElementById('title');
    title.textContent = `Ход: ${Game.CurrentPlayer == Players.One ? 'Белые' : 'Черные'}`;
}

function drop(dropevent) {
    dropevent.preventDefault();

    let field = null;
    if (Game.AvailableMoves.includes(dropevent.target)) field = dropevent.target;
    else if (Game.AvailableMoves.includes(dropevent.target.parentElement)) field = dropevent.target.parentElement;

    removeGraphMoves();
    if (field != null) {
        if (!field.classList.contains('checker') &&
            field.children.length == 0) {
            var data = dropevent.dataTransfer.getData('div');
            field.appendChild(document.getElementById(data));
            console.log(data);
            ChangePlayer();
            updateTitle();
            addInHistory();
        }

        // ev.target.appendChild(document.getElementById(data));
        console.log('drag dropped');
    }

    setDragCursor(false);
}

window.onload = () => {
    createField();
    paintField();
    setDraggable();
    fillField();
    InitGame();
    updateTitle();
};