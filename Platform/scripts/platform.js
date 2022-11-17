"use strict";
class Platform {
    constructor(x) {
        this.x = x;
    }
}
class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Game {
    constructor() {
        this.player = new Platform(960);
        this.ball = new Ball(960, 1080);
    }
    UpdatePlatform(e) {
        this.player.x = e.x;
        console.log(this.player);
    }
}
class Tile {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
