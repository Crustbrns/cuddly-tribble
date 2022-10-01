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
    HistoryMoves: [],
    RequiredToBeat: false,
    AvailableCheckers: []
}
const TempMove = {
    startPos: null,
    finalPos: null
}
const Letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const Numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];

class BeatMove {
    constructor(checker, enemychecker, fielddestination) {
        this.checker = checker;
        this.enemychecker = enemychecker;
        this.fielddestination = fielddestination;
    }
}

class Move {
    constructor(moveNum, color, startPos, finalPos) {
        this.moveNum = moveNum;
        this.color = color;
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
        // item.addEventListe   ner('mouseover', function () { item.style.backgroundColor = 'red' });
    }
}

function displayBeatMoves(target) {
    for (const item of Game.AvailableMoves) {
        let movement = document.createElement('div');
        movement.className = 'movement';
        let fdes = Game.AvailableCheckers.find(x => x.fielddestination == item);
        console.log('asd', fdes);
        if (!item.children.length != 0 && Game.AvailableCheckers.find(x => x.fielddestination == item).checker == target) {
            item.appendChild(movement);
        }
    }

    console.log(Game.AvailableMoves);
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
    checker.addEventListener('dragstart', function () { drag(event), false });;
    checker.addEventListener('mousedown', function () { MouseMove(true) });

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

function getElements(ev) {
    let elements = document.getElementsByClassName('field-active');
    for (let item of elements) {
        item.classList.remove('field-active');
    }
    let elemBelow = document.elementsFromPoint(ev.clientX, ev.clientY);
    let elemNeeded = elemBelow.find(x => x.className == 'chess-field' && x.children[0] != null && x.children[0].className == 'movement');
    if (elemNeeded != null && !elemNeeded.classList.contains('field-active')) elemNeeded.classList.add('field-active');
    // console.log();
}
function MouseMove(toggle) {
    if (toggle) {
        document.addEventListener('mouseover', function (event) {
            getElements(event);
        })
    }
    else {
        document.removeEventListener('mouseover', function (event) {
            getElements(event);
        })
    }

}

function drag(dragevent) {
    console.log(`Current player: ${Game.CurrentPlayer}`);
    MouseMove(true);
    removeGraphMoves();

    if (Game.CurrentPlayer == Players.One && dragevent.target.classList.contains('white')) {
        if (Game.RequiredToBeat) {
            console.log('available moves', Game.AvailableMoves.length);
            console.log(Game.AvailableMoves);
            displayBeatMoves(dragevent.target);
            dragevent.dataTransfer.setData('div', dragevent.target.id);
            dragevent.dataTransfer.dropEffect = "copy";
            setDragCursor(false);
            TempMove.startPos = dragevent.target.parentElement.id;
        }
        else {
            calcDistinctMoves(dragevent.target.parentElement.id, 'white');
            dragevent.dataTransfer.setData('div', dragevent.target.id);
            dragevent.dataTransfer.dropEffect = "copy";
            setDragCursor(false);
            TempMove.startPos = dragevent.target.parentElement.id;
            console.log('drag start');
        }
    }
    else if (Game.CurrentPlayer == Players.Two && dragevent.target.classList.contains('black')) {
        if (Game.RequiredToBeat) {
            console.log('available moves', Game.AvailableMoves.length);
            console.log(Game.AvailableMoves);
            displayBeatMoves(dragevent.target);
            dragevent.dataTransfer.setData('div', dragevent.target.id);
            dragevent.dataTransfer.dropEffect = "copy";
            setDragCursor(false);
            TempMove.startPos = dragevent.target.parentElement.id;
        }
        else {
            calcDistinctMoves(dragevent.target.parentElement.id, 'black');
            dragevent.dataTransfer.setData('div', dragevent.target.id);
            setDragCursor(false);
            TempMove.startPos = dragevent.target.parentElement.id;
            console.log('drag start');
        }
    }
}
function dragend(dragevent) {
    removeGraphMoves();
}
function setDragging(color, truth) {
    let elements = Array.from(document.getElementsByClassName(color));
    for (const item of elements) {
        item.draggable = truth;
        if (truth == false) {
            item.removeEventListener('dragstart', function () { drag(event), false });
            item.removeEventListener('dragend', function () { dragend(event), false });
            item.classList.remove('isdraggable');
        } else {
            item.addEventListener('dragstart', function () { drag(event), false });
            item.addEventListener('dragend', function () { dragend(event), false });
            item.classList.add('isdraggable');
        }
    }
}
function setPartialDragging(elements, truth) {
    for (const item of elements) {
        item.checker.draggable = truth;
        if (truth == false) {
            item.checker.removeEventListener('dragstart', function () { drag(event), false });
            item.checker.removeEventListener('dragend', function () { dragend(event), false });
            item.checker.classList.remove('isdraggable');
        } else {
            item.checker.addEventListener('dragstart', function () { drag(event), false });
            item.checker.addEventListener('dragend', function () { dragend(event), false });
            item.checker.classList.add('isdraggable');
        }
    }
}

function ClearTempMove() {
    TempMove.startPos = null;
    TempMove.finalPos = null;
}
function addInHistory() {
    let color = Game.CurrentPlayer == Players.One ? 'black' : 'white';
    Game.HistoryMoves.push(new Move(Game.CurrentMove, color, TempMove.startPos, TempMove.finalPos));
    ClearTempMove();
    displayHistory();
}
function displayHistory() {
    let move = Game.HistoryMoves.slice(-1);
    let log = document.getElementById('log-container');

    let container = document.createElement('div');
    container.className = 'move-container';

    let color = document.createElement('div');
    color.className = 'color';
    color.textContent = move[0].color;

    let index = document.createElement('index');
    index.textContent = move[0].moveNum;

    let tempmove = document.createElement('div');
    tempmove.className = 'move';
    tempmove.textContent = `${convertToNum(move[0].startPos)} > ${convertToNum(move[0].finalPos)}`;

    container.appendChild(index);
    container.appendChild(color);
    container.appendChild(tempmove);

    log.appendChild(container);
}
function convertToNum(index) {
    let num = Numbers[Math.floor(index / 8)];
    let lit = Letters[Math.floor(index % 8)];
    return `${lit}${num}`
}
function updateTitle() {
    let title = document.getElementById('title');
    title.textContent = `Ход: ${Game.CurrentPlayer == Players.One ? 'Белые' : 'Черные'}`;
}
function drop(dropevent) {
    MouseMove(false);
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
            TempMove.finalPos = field.id;
            addInHistory();
            checkBeatMoves();
        }

        // ev.target.appendChild(document.getElementById(data));
        console.log('drag dropped');
    }
    setDragCursor(false);
}

function checkBeatMoves() {
    let color = Game.CurrentPlayer == Players.One ? 'white' : 'black'
    let checkers = Array.from(document.getElementsByClassName(color));
    let enemies = Array.from(document.getElementsByClassName(color == 'white' ? 'black' : 'white'));
    let fields = Array.from(document.getElementsByClassName('chess-field'));
    let availablecheckers = [];
    console.log(color);
    let beatMoves = [];
    Game.RequiredToBeat = false;

    for (const item of checkers) {
        let upperleft = enemies.find(x => x.parentElement.id == parseInt(item.parentElement.id) - 9);
        if (upperleft != undefined) {
            console.log(upperleft);
            if (upperleft.classList.contains('checker') && !upperleft.classList.contains(color)) {
                let field = fields.find(x => x.id == parseInt(upperleft.parentElement.id) - 9);
                if (field != undefined && field.children.length == 0) {
                    beatMoves.push(field);
                    availablecheckers.push(new BeatMove(item, upperleft, field));
                    console.log(availablecheckers);
                }
            }
        }
    }

    if (beatMoves.length > 0) {
        Game.RequiredToBeat = true;
        Game.AvailableMoves = beatMoves;
        Game.AvailableCheckers = availablecheckers;
        setDragging('white', false);
        setDragging('black', false);
        setPartialDragging(availablecheckers, true);
    }

    console.log(beatMoves);
    console.log(Game.AvailableMoves);
    console.log(Game.RequiredToBeat);

    // if (fields.find(x => x.id == parseInt(i) - 7) != undefined
    //     && fields.find(x => x.id == parseInt(i) - 7).style.backgroundColor != 'rgb(240, 218, 181)') {

    //     if (color == 'white' && fields.find(x => x.id == parseInt(i) - 7).children.length != 0) {
    //         Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 7));
    //     }
    //     else if (color == 'black') {
    //         Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) - 7));
    //     }
    // }

    // if (fields.find(x => x.id == parseInt(i) + 7) != undefined
    //     && fields.find(x => x.id == parseInt(i) + 7).style.backgroundColor != 'rgb(240, 218, 181)') {

    //     if (color == 'black' && fields.find(x => x.id == parseInt(i) + 7).children.length != 0) {
    //         Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 7));
    //     }
    //     else if (color == 'white') {
    //         Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 7));
    //     }
    // }

    // if (fields.find(x => x.id == parseInt(i) + 9) != undefined
    //     && fields.find(x => x.id == parseInt(i) + 9).style.backgroundColor != 'rgb(240, 218, 181)') {

    //     if (color == 'black' && fields.find(x => x.id == parseInt(i) + 9).children.length != 0) {
    //         Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 9));
    //     }
    //     else if (color == 'white') {
    //         Game.AvailableMoves.push(fields.find(x => x.id == parseInt(i) + 9));
    //     }
    // }
}

window.onload = () => {
    createField();
    paintField();
    setDraggable();
    fillField();
    InitGame();
    updateTitle();
};