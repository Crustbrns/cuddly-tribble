const track1 = require('./Resources/Radio/zoha.mp3');
const track2 = require('./Resources/Radio/zoha2.mp3');
const track3 = require('./Resources/Radio/zoha3.mp3');
const track4 = require('./Resources/Radio/zoha4.mp3');

class Radio {
    constructor() {
        this.Tracks = [new Audio(track1), new Audio(track2), new Audio(track3), new Audio(track4)];
        this.Current = this.ChooseRandom();
        this.isPlaying = false;
    }

    ChooseRandom() {
        return Math.floor(Math.random() * this.Tracks.length);
    }

    ToggleSomething() {
        this.Tracks.at(this.Current).loop = true;
        this.Tracks.at(this.Current).volume = 0.25;
        this.isPlaying = !this.isPlaying;
        this.isPlaying ? this.Tracks.at(this.Current).play() : this.Tracks.at(this.Current).pause();
        if (!this.isPlaying) this.Current = this.ChooseRandom();
    }

    InitRadio() {
        if (!this.isPlaying)
            this.ToggleSomething();
    }
}

const GameRadio = new Radio();

module.exports = {
    GameRadio
}