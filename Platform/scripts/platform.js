"use strict";
class Platform {
    constructor(x) {
        this.x = x;
    }
}
class Ball {
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight * 0.85;
        this.angle = 110 - Math.random() * 40;
        this.speed = 2;
        this.rotate = 0;
        this.rotatespeed = 0;
    }
    UpdateBall() {
        let ballElement = document.getElementById('ball');
        ballElement.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotate}deg)`;
        this.CheckBorders();
        this.MoveBall();
    }
    MoveBall() {
        this.x -= Math.cos(this.angle * Math.PI / 180) * this.speed;
        this.y -= Math.sin(this.angle * Math.PI / 180) * this.speed;
        if (this.speed < 8) {
            this.speed += 0.001;
            this.rotatespeed += 0.001;
            this.rotate %= 360;
        }
        this.rotate += this.rotatespeed;
    }
    CheckBorders() {
        if (Intersects.circleBox(this.x, this.y, 25, 0, -35, window.innerWidth, 10)) {
            this.angle = 180 - this.angle + 180;
            this.angle %= 360;
            console.log(this.angle);
        }
        else if (Intersects.circleBox(this.x, this.y, 25, 0, window.innerHeight - 35, window.innerWidth, 10)) {
            this.angle = 180 - this.angle + 180;
            this.angle %= 360;
            console.log(this.angle);
        }
        else if (Intersects.circleBox(this.x, this.y, 25, -35, 0, 10, window.innerHeight)) {
            this.angle = 0 - this.angle + 180;
            this.angle %= 360;
            console.log(this.angle);
        }
        else if (Intersects.circleBox(this.x, this.y, 25, window.innerWidth - 35, 0, 10, window.innerHeight)) {
            this.angle = 0 - this.angle + 180;
            this.angle %= 360;
            console.log(this.angle);
        }
        // if (Intersects.circleBox(this.x, this.y, 25, 0, 10, window.innerWidth, 10)) this.angle = 270;
    }
}
class Game {
    constructor() {
        this.player = new Platform(960);
        this.ball = new Ball();
        this.tiles = new Array;
        this.tiles.push(new Tile(800, 300));
    }
    DisplayTiles() {
        let index = 0;
        this.tiles.forEach((x) => {
            var _a;
            x.id = index;
            let tile = document.createElement('img');
            tile.id = `tile${index++}`;
            tile.src = `./images/tile-3.png`;
            tile.classList.add('tile');
            tile.style.transform = `translate(${x.x}px, ${x.y}px)`;
            (_a = document.getElementById('game')) === null || _a === void 0 ? void 0 : _a.appendChild(tile);
        });
    }
    CheckBallPlayerCollision() {
        if (Intersects.circleBox(this.ball.x, this.ball.y, 25, this.player.x - 128, window.innerHeight * 0.93 - 32, 256, 32)) {
            let calcangle = Math.atan2(this.ball.y - window.innerHeight * 0.98, this.ball.x - this.player.x);
            console.log(calcangle, calcangle * 180 / Math.PI);
            this.ball.angle = calcangle * 180 / Math.PI + 180;
        }
    }
    CheckBallTilesCollision() {
        this.tiles.forEach(x => {
            if (x.CheckCollision(this.ball)) {
                this.tiles.splice(this.tiles.findIndex(y => y === x), 1);
            }
        });
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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 16;
        this.lives = 3;
    }
    CheckCollision(ball) {
        if (Intersects.circleBox(ball.x, ball.y, 25, this.x, this.y, 64, 16)) {
            this.lives--;
            ball.angle = 180 - ball.angle + 180;
            if (this.lives === 0) {
                document.getElementById(`tile${this.id}`).remove();
                return true;
            }
            else {
                let tile = document.getElementById(`tile${this.id}`).src = `./images/tile-${this.lives}.png`;
            }
        }
        return false;
    }
}
