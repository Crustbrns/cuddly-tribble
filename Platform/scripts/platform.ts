class Platform {
    public x: number;
    constructor(x: number) {
        this.x = x;
    }
}

class Ball {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Game {
    public player: Platform;
    public ball: Ball;

    constructor(){
        this.player = new Platform(960);
        this.ball = new Ball(960, 1080);
    }

    UpdatePlatform(e: MouseEvent) : void {
        this.player.x = e.x;
        console.log(this.player);
    }
}

class Tile {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}