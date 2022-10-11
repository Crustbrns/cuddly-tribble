const track1 = require('./Resources/Radio/zoha.mp3');

class Radio {
    constructor() {
        this.Tracks = [new Audio(track1)];
    }

    PlaySomething() {
        let TrackNumber = Math.floor(Math.random() * this.Tracks.length)
        this.Tracks.at(TrackNumber).loop = true;
        this.Tracks.at(TrackNumber).play();
    }
}

const GameRadio = new Radio();

module.exports = {
    GameRadio
}