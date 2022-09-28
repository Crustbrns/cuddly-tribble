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

function fillField() {
    let fields = document.getElementsByClassName('chess-field');

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((i * 8 + j < 24) || (i * 8 + j > 39)) {
                if (i % 2) {
                    if (j % 2 == false) {
                        fields[i * 8 + j].appendChild(setChecker(i));
                    }
                }
                else {
                    if (j % 2) {
                        fields[i * 8 + j].appendChild(setChecker(i));
                    }
                }
            }
        }
    }
}

function setChecker(index) {
    let checker = document.createElement("div");
    checker.className = 'checker';

    if (index > 2) {
        checker.classList.add('black');
    }
    else {
        checker.classList.add('white');
    }
    return checker;
}

window.onload = () => {
    createField();
    paintField();
    fillField();
};