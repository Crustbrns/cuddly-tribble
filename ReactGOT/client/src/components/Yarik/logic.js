var intersects = require('intersects');
const { GameRadio } = require('./radio');
const death1 = require('./Resources/Sounds/den1.mp3');
const death2 = require('./Resources/Sounds/den2.mp3');
const death3 = require('./Resources/Sounds/den3.mp3');
const death4 = require('./Resources/Sounds/den4.mp3');
const death5 = require('./Resources/Sounds/den5.mp3');
const yarik = require('./Resources/Sounds/yarik.ogg');
const yarik2 = require('./Resources/Sounds/yarikboosted.mp3');

const shavuha1 = require('./Resources/Sounds/shavuha1.mp3');
const shavuha2 = require('./Resources/Sounds/shavuha2.mp3');

const DeadAnim = {
    Rotate: 0,
    Scale: 1,
    RotateReverse: 2,
    Fade: 3,
    ScaleUp: 4
}
const audios = [new Audio(death1), new Audio(death2), new Audio(death3), new Audio(death4), new Audio(death5)]
const shot = new Audio(yarik);
const shot2 = new Audio(yarik2);
const shotshavuha = [new Audio(shavuha1), new Audio(shavuha2)];

class Game {
    constructor(drops, enemies, balls, spawnTime, points, killedCount) {
        this.Drops = drops;
        this.Enemies = enemies;
        this.Balls = balls;
        this.Bonuses = [];
        this.spawnTime = spawnTime;
        this.Points = points;
        this.killedCount = killedCount;
        this.Over = false;
        this.Started = false;
        this.BulletsCount = 0;
        this.ShavuhaCount = 0;
        this.BusterTime = 0;
        this.TolikTime = 0;
        this.TimeAlive = 0;
        this.PillsCount = 0;
        shot.volume = 0.35;
        shotshavuha[0].volume = 0.35;
        shotshavuha[1].volume = 0.20;
    }

    addNewEnemy() {
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;
        let pos = leftBorder + rightBorder * 2 * Math.random();

        this.Enemies.push(new Enemy({ x: pos }));
    }

    addNewBonus(pos, type) {
        this.Bonuses.push(new Bonus(pos, type));
    }

    UpdateBonuses(player) {
        for (const key in this.Bonuses) {
            if (Object.hasOwnProperty.call(this.Bonuses, key)) {
                const item = this.Bonuses[key];
                item.pos.y += item.speed;
                item.speed += window.innerHeight / 108000;

                if (this.CheckPlayerKill(item, player)) {
                    this.Bonuses.splice(this.Bonuses.findIndex(x => x == item), 1);
                    if (item.type === 'Pill') {
                        this.BusterTime = 3;
                        this.PillsCount++;
                    }
                    else if (item.type === 'Shavuha') {
                        this.TolikTime = 5;
                    }
                }
            }
        }
    }

    getBulletType() {
        if (this.TolikTime === 0) {
            return 'Shishka';
        }
        else return 'Shavuha';
    }

    addNewDrop(pos) {
        this.Drops.push(new Drop(pos, this.getBulletType()));
        shot.volume = 1;
        this.BusterTime === 0 ? shot.play() : shot2.play();
        this.getBulletType() === 'Shishka' ? this.BulletsCount++ : this.ShavuhaCount++;
    }

    addNewBall(pos) {
        this.Balls.push(new Ball(pos));
    }

    UpdateBalls(player) {
        for (const key in this.Balls) {
            if (Object.hasOwnProperty.call(this.Balls, key)) {
                const item = this.Balls[key];
                item.pos.y += item.speed;
                item.speed += window.innerHeight / 54000;
                if (this.CheckPlayerKill(item, player)) {
                    this.Over = true;
                    GameRadio.ToggleSomething();
                }
            }
        }
    }

    CheckPlayerKill(ball, player) {
        if (intersects.boxBox(player.x + window.innerHeight * 0.02, window.innerHeight * 0.82, window.innerWidth * 0.04, window.innerHeight * 0.02, ball.pos.x, ball.pos.y, window.innerWidth * 0.02, window.innerHeight * 0.02)) {
            return true;
        }
        return false;
    }

    UpdateDrops() {
        for (const key in this.Drops) {
            if (Object.hasOwnProperty.call(this.Drops, key)) {
                const item = this.Drops[key];
                item.pos.y -= item.speed;
                item.speed += window.innerHeight / 42000;
                if (this.CheckKill(item)) {
                    if (item.type === 'Shishka') {
                        this.Drops.splice(this.Drops.findIndex(x => x == item), 1);
                    }
                    else if (item.type === 'Shavuha') {
                        shotshavuha.at(Math.floor(Math.random() * shotshavuha.length)).play();
                    }
                    this.Points += this.MultiplyPoints();
                    if (Math.random() < 0.0015 * this.TimeAlive) {
                        if (Math.random() > 0.5) {
                            this.addNewBonus({ x: item.pos.x, y: window.innerHeight * 0.05 }, 'Pill');
                        }
                        else {
                            this.addNewBonus({ x: item.pos.x, y: window.innerHeight * 0.05 }, 'Shavuha');
                        }
                    }
                }
            }
        }
    }

    MultiplyPoints() {
        let NewPoints = this.AddPoints();
        NewPoints += (3000 - this.spawnTime) / 100;
        return Math.floor(NewPoints);
    }

    AddPoints() {
        ++this.killedCount;
        if (this.killedCount < 10) return 100;
        else if (this.killedCount < 30) return 150;
        else if (this.killedCount < 50) return 250;
        else return 400;
    }

    CheckKill(drop) {
        for (const item of this.Enemies) {
            if (item.alive) {
                if (intersects.boxBox(drop.pos.x, drop.pos.y, window.innerWidth * 0.03, window.innerWidth * 0.03, item.pos.x + window.innerWidth * 0.02, 0, window.innerWidth * 0.03, window.innerHeight * 0.18)) {
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
    }

    UpdateEnemies() {
        for (const key in this.Enemies) {
            if (Object.hasOwnProperty.call(this.Enemies, key)) {
                const item = this.Enemies[key];
                item.Move();
                if (Math.random() < 0.0015 * (this.killedCount < 10 ? this.killedCount : Math.sqrt(Math.sqrt(this.killedCount))) && item.alive) {
                    this.addNewBall({ x: item.pos.x + window.innerWidth * 0.01, y: window.innerHeight * 0.1 });
                }
            }
        }
    }

    RemoveLast() {
        if (this.Drops.at(0) !== undefined && this.Drops.at(0).pos.y < -100) {
            this.Drops.splice(0, 1);
        }
        if (this.Balls.at(0) !== undefined && this.Balls.at(0).pos.y > window.innerHeight + 100) {
            this.Balls.splice(0, 1);
        }
    }

    ChangeDelay() {
        if (this.spawnTime > 250) {
            this.spawnTime -= this.spawnTime / 10;
        }
        else this.spawnTime = 250;
    }

    InitGame() {
        if (!this.Started) {
            this.addNewEnemy();
            this.Started = true;
        }
    }
}

class Enemy {
    constructor(pos) {
        let rand = Math.random();
        this.pos = pos;
        this.alive = true;
        this.deadAnim = Math.floor(rand * 5);
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
    constructor(pos, type) {
        this.pos = pos;
        this.speed = window.innerHeight / 540;
        this.type = type;
    }
}

class Ball {
    constructor(pos) {
        this.pos = pos;
        this.speed = window.innerHeight / 540;
    }
}

class Bonus {
    constructor(pos, type) {
        this.pos = pos;
        this.speed = window.innerHeight / 1080;
        this.type = type;
    }
}

module.exports = {
    Game,
    DeadAnim
}