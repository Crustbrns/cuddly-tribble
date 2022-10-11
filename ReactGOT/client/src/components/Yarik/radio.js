const track1 = require('./Resources/Radio/zoha.mp3');
const track2 = require('./Resources/Radio/zoha2.mp3');
const track3 = require('./Resources/Radio/zoha3.mp3');
const track4 = require('./Resources/Radio/zoha4.mp3');

class Radio {
    constructor() {
        this.Tracks = [new Audio(track1), new Audio(track2), new Audio(track3), new Audio(track4)];
        this.isPlaying = false;
    }

    PlaySomething() {
        let TrackNumber = Math.floor(Math.random() * this.Tracks.length)
        this.Tracks.at(TrackNumber).loop = true;
        this.Tracks.at(TrackNumber).volume = 0.25;
        this.Tracks.at(TrackNumber).play();
        this.isPlaying = true;
    }

    InitRadio() {
        if (!this.isPlaying)
            this.PlaySomething();
    }
}

const GameRadio = new Radio();

module.exports = {
    GameRadio
}