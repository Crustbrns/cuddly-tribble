const img1 = require('./Resources/odnorazki/1.png');
const img2 = require('./Resources/odnorazki/2.png');
const img3 = require('./Resources/odnorazki/3.png');
const img4 = require('./Resources/odnorazki/4.png');
const img5 = require('./Resources/odnorazki/5.png');
const img6 = require('./Resources/odnorazki/6.png');
const img7 = require('./Resources/odnorazki/7.png');
const img8 = require('./Resources/odnorazki/8.png');
const img9 = require('./Resources/odnorazki/9.png');
const img10 = require('./Resources/odnorazki/10.png');
const img11 = require('./Resources/odnorazki/11.png');
const img12 = require('./Resources/odnorazki/12.png');
const img13 = require('./Resources/odnorazki/13.png');
const img14 = require('./Resources/odnorazki/14.png');
const img15 = require('./Resources/odnorazki/15.png');

const Odnorazki =
    [{ image: img1, type: '0' },
    { image: img2, type: '1' },
    { image: img3, type: '2' },
    { image: img4, type: '3' },
    { image: img5, type: '4' },
    { image: img6, type: '5' },
    { image: img7, type: '6' },
    { image: img8, type: '7' },
    { image: img9, type: '8' },
    { image: img10, type: '9' },
    { image: img11, type: '10' },
    { image: img12, type: '11' },
    { image: img13, type: '12' },
    { image: img14, type: '13' },
    { image: img15, type: '14' }]

function getOdnorazka(type) {
    return Odnorazki.find(x => x.type === type.slice(4)).image;
}

module.exports = {
    getOdnorazka
}