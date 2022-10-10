class Game {
    constructor(drops) {
        this.Drops = drops;
    }

    addNewDrop(pos) {
        this.Drops.push(new Drop(pos));
        console.log(this.Drops.length);
    }

    UpdateDrops() {
        for (const key in this.Drops) {
            if (Object.hasOwnProperty.call(this.Drops, key)) {
                const item = this.Drops[key];
                item.pos.y -= item.speed;
                item.speed += 1;
            }
        }
    }

    RemoveLast() {
        if (this.Drops.at(this.Drops.length - 1) !== undefined && this.Drops.at(this.Drops.length - 1).pos.y < -100) {
            this.Drops.pop();
        }
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