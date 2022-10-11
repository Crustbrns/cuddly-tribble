var intersects = require('intersects');
const death1 = require('./Resources/Sounds/den1.mp3');
const death2 = require('./Resources/Sounds/den2.mp3');
const death3 = require('./Resources/Sounds/den3.mp3');
const death4 = require('./Resources/Sounds/den4.mp3');
const death5 = require('./Resources/Sounds/den5.mp3');
const yarik = require('./Resources/Sounds/yarik.ogg');

const DeadAnim = {
    Rotate: 0,
    Scale: 1,
    RotateReverse: 2,
    Fade: 3
}
const audios = [new Audio(death1), new Audio(death2), new Audio(death3), new Audio(death4), new Audio(death5)]
const shot = new Audio(yarik);

class Game {
    constructor(drops, enemies, spawnTime) {
        this.Drops = drops;
        this.Enemies = enemies;
        this.spawnTime = spawnTime;
    }

    addNewEnemy() {
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;
        let pos = leftBorder + rightBorder * 2 * Math.random();

        this.Enemies.push(new Enemy({ x: pos }));
    }

    addNewDrop(pos) {
        console.log(this.reloadTime);
        this.Drops.push(new Drop(pos));
        shot.play();
    }

    UpdateDrops() {
        for (const key in this.Drops) {
            if (Object.hasOwnProperty.call(this.Drops, key)) {
                const item = this.Drops[key];
                item.pos.y -= item.speed;
                item.speed += window.innerHeight / 54000;
                if (this.CheckKill(item))
                    this.Drops.splice(this.Drops.findIndex(x => x == item), 1);
            }
        }
    }

    CheckKill(drop) {
        for (const item of this.Enemies) {
            if (item.alive) {
                if (intersects.boxBox(drop.pos.x, drop.pos.y, 100, 200, item.pos.x, 0, window.innerHeight * 0.18, window.innerWidth * 0.05)) {
                    console.log('killed');
                    item.alive = false;
                    audios[Math.floor(Math.random() * 5)].play();
                    setTimeout(() => {
                        this.Enemies.splice(this.Enemies.findIndex(x => x == item), 1);
                    }, 500);
                    return true;
                }
            }
        }
        return false;
        // if(intersects())
    }

    UpdateEnemies() {
        for (const key in this.Enemies) {
            if (Object.hasOwnProperty.call(this.Enemies, key)) {
                const item = this.Enemies[key];
                item.Move();
            }
        }
    }

    RemoveLast() {
        if (this.Drops.at(0) !== undefined && this.Drops.at(0).pos.y < -100) {
            this.Drops.splice(0, 1);
        }
    }

    ChangeDelay() {
        if (this.spawnTime > 250) {
            this.spawnTime -= this.spawnTime / 10;
        }
        else this.spawnTime = 250;
    }

    EnemiesShoot() {
        // console.log('shoot');
    }
}

class Enemy {
    constructor(pos) {
        let rand = Math.random();
        this.pos = pos;
        this.alive = true;
        this.deadAnim = Math.floor(rand * 4);
        console.log(this.deadAnim);
        this.direction = rand > 0.5 ? 1 : 2;
    }

    Die = () => {
        this.alive = false;
    }

    ChangeDirection = () => {
        this.direction == 1 ? this.direction = 2 : this.direction = 1;
    }

    CheckBorders() {
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (this.pos.x < leftBorder) {
            this.pos.x = leftBorder;
            this.ChangeDirection();
        }
        else if (this.pos.x > rightBorder) {
            this.pos.x = rightBorder;
            this.ChangeDirection();
        }
    }

    Move() {
        if (this.direction != 0) {
            this.direction == 1 ? this.pos.x -= window.innerWidth / 1920 : this.pos.x += window.innerWidth / 1920;
        }
        this.CheckBorders();
    }
}

class Drop {
    constructor(pos) {
        this.pos = pos;
        this.speed = window.innerHeight / 1080;
    }
}

// function addNewDrop(pos) {
//     Game.Drops.push(new Drop(pos));
//     console.log(Game.Drops.length);
// }

// function UpdateDrops(){
//     for (const item of Game.Drops) {
//         item.pos.y -= item.speed;
//         item.speed += 1;
//     }
// }

// function RemoveDrop() {
//     if (Game.Drops.at(Game.Drops.length - 1).pos.y < 200){
//         Game.Drops.pop();
//     }
// }

module.exports = {
    Game,
    DeadAnim
}