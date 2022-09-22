let res = document.getElementsByClassName('chess-field');

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        res[i * 8 + j].style.backgroundColor = i % 2 ?
            (j % 2 ? '#F0DAB5' : '#B58763') : (j % 2 ? '#B58763' : '#F0DAB5');
    }
}