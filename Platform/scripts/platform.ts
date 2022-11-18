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
    public rotate: number;
    public rotatespeed: number;
    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight * 0.93;
        this.angle = 0;
        this.speed = 2;
        this.rotate = 0;
        this.rotatespeed = 0;
    }

    UpdateBall(): void {
        let ballElement = document.getElementById('ball')!;
        ballElement!.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotate}deg)`;

        this.CheckBorders();
        this.MoveBall();
    }

    private MoveBall(): void {
        this.x -= Math.cos(this.angle * Math.PI / 180) * this.speed;
        this.y -= Math.sin(this.angle * Math.PI / 180) * this.speed;
        this.speed += 0.001;
        this.rotate += this.rotatespeed;
        this.rotate %= 360;
        this.rotatespeed += 0.001;
    }

    private CheckBorders(): void {
        if (Intersects.circleBox(this.x, this.y, 25, 0, -35, window.innerWidth, 10)) {
            this.angle += 180;
        }
        else if (Intersects.circleBox(this.x, this.y, 25, 0, window.innerHeight - 35, window.innerWidth, 10)) {
            this.angle += 180;
        }
        else if (Intersects.circleBox(this.x, this.y, 25, -35, 0, 10, window.innerHeight)) {
            this.angle += 180;
        }
        else if (Intersects.circleBox(this.x, this.y, 25, window.innerWidth - 35, 0, 10, window.innerHeight)) {
            this.angle += 180;
        }
        // if (Intersects.circleBox(this.x, this.y, 25, 0, 10, window.innerWidth, 10)) this.angle = 270;

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