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
                item.speed += 0.02;
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
        this.speed = 1;
    }

    Die = () => {
        this.alive = false;
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