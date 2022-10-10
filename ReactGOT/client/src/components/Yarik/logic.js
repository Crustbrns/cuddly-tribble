class Game {
    constructor(drops, enemies) {
        this.Drops = drops;
        this.Enemies = enemies;
    }

    addNewEnemy() {
        this.Enemies.push(new Enemy({ x: 0 }));
    }

    addNewDrop(pos) {
        this.Drops.push(new Drop(pos));
    }

    UpdateDrops() {
        for (const key in this.Drops) {
            if (Object.hasOwnProperty.call(this.Drops, key)) {
                const item = this.Drops[key];
                item.pos.y -= item.speed;
                item.speed += window.innerHeight / 54000;
            }
        }
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

}

class Enemy {
    constructor(pos) {
        this.pos = pos;
        this.alive = true;
        this.direction = Math.random() > 0.5 ? 2 : 1;
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
            this.direction == 1 ? this.pos.x -= 1 : this.pos.x += 1;
        }
        this.CheckBorders();
    }
}

class Drop {
    constructor(pos) {
        this.pos = pos;
        this.speed = 1;
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
    Game
}