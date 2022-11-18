"use strict";
class Platform {
    constructor(x) {
        this.x = x;
    }
}
class Ball {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight * 0.93;
        this.angle = 90 - Math.random() * 180;
        this.speed = 2;
    }
    UpdateBall() {
        let ballElement = document.getElementById('ball');
        ballElement.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.y -= this.speed;
        this.CheckBorders();
    }
    CheckBorders() {
        let intersected = Intersects.circleBox(this.x, this.y, 50, 0, -10, window.innerWidth, 10);
        if (intersected)
            console.log('asd');

        this.X -= Math.cos(this.angle) * this.speed;
        this.Y -= Math.sin(this.angle) * this.speed;
        this.speed += 0.005;
    }
}
class Game {
    constructor() {
        this.player = new Platform(960);
        this.ball = new Ball();
    }
    UpdatePlatform(e) {
        this.player.x = e.x;
        this.CheckBorders();
        let player = document.getElementById('player');
        player.style.transform = `translateX(${this.player.x - 128}px)`;
        console.log(this.player);
    }
    CheckBorders() {
        if (this.player.x < 128) {
            this.player.x = 128;
        }
        else if (this.player.x > window.innerWidth - 128) {
            this.player.x = window.innerWidth - 128;
        }
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
