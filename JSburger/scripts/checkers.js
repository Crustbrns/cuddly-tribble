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
        // tile.ondrop = "drop(event)";
        // tile.ondragover = "allowDrop(event)";
        tile.addEventListener('drop', function () { drop(event) });
        tile.addEventListener('dragover', function () { allowDrop(event) });
        field.appendChild(tile);
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
    const html = document.getElementsByTagName('html').item(0);
    html.classList.toggle('grabbing', value);
}

function allowDrop(dragevent) {
    dragevent.preventDefault();
}

function drag(dragevent) {
    dragevent.dataTransfer.setData('div', dragevent.target.id);
    dragevent.target.style.backgroundColor = 'red';
    setDragCursor(true);
    console.log('drag start');
}

function drop(dropevent) {
    dropevent.preventDefault();
    var data = dropevent.dataTransfer.getData('div');
    dropevent.target.appendChild(document.getElementById(data));
    console.log(data);
    // ev.target.appendChild(document.getElementById(data));
    console.log('drag dropped');
    setDragCursor(false);
}

window.onload = () => {
    createField();
    paintField();
    fillField();
};