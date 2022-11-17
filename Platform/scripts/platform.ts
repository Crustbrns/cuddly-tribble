class Platform {
    public x: number;
    constructor(x: number) {
        this.x = x;
    }
}

class Ball {
    public x: number;
    public y: number;
    public angle: number;
    public speed: number;
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight * 0.93;
        this.angle = 90 - Math.random() * 180;
        this.speed = 2;
    }

    UpdateBall(): void {
        let ballElement = document.getElementById('ball')!;
        ballElement!.style.transform = `translate(${this.x}px, ${this.y}px)`;
        this.y -= this.speed;
    }
}

class Game {
    public player: Platform;
    public ball: Ball;

    constructor() {
        this.player = new Platform(960);
        this.ball = new Ball();
    }

    UpdatePlatform(e: MouseEvent): void {
        this.player.x = e.x;
        this.CheckBorders();
        let player = document.getElementById('player')!;
        player!.style.transform = `translateX(${this.player.x - 128}px)`;
        console.log(this.player);
    }

    private CheckBorders(): void {
        if (this.player.x < 128) {
            this.player.x = 128;
        }
        else if (this.player.x > window.innerWidth - 128) {
            this.player.x = window.innerWidth - 128;
        }
    }
}

class Tile {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}