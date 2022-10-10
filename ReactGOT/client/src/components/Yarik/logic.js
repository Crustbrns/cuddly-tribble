const Game = {
    Drops: []
}

class Drop {
    constructor(pos) {
        this.pos = pos;
        this.speed = 1;
    }
}

function addNewDrop(pos) {
    Game.Drops.push(new Drop(pos));
    console.log(Game.Drops.length);
}

function RemoveDrop() {
    if (Game.Drops.at(Game.Drops.length - 1).pos.y < 200){
        Game.Drops.pop();
    }
}

module.exports = {
    Game,
    addNewDrop,
    RemoveDrop
}