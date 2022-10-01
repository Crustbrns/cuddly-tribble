function paintField() {
    let res = document.getElementsByClassName('chess-field');

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            res[i * 8 + j].style.backgroundColor = i % 2 ?
                (j % 2 ? 'var(--field-background-white-old)' : 'var(--field-background-black-old)') :
                 (j % 2 ? 'var(--field-background-black-old)' : 'var(--field-background-white-old)');
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

createField();
paintField();