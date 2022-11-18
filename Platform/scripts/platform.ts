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
        this.y = window.innerHeight * 0.85;
        this.angle = 110 - Math.random() * 40;
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

        if (this.speed < 8) {
            this.speed += 0.001;
            this.rotatespeed += 0.001;
            this.rotate %= 360;
        }
        this.rotate += this.rotatespeed;
    }

    private CheckBorders(): void {
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
    public player: Platform;
    public ball: Ball;
    public tiles: Array<Tile>;

    constructor() {
        this.player = new Platform(960);
        this.ball = new Ball();
        this.tiles = new Array<Tile>;
    }

    CheckBallPlayerCollision(): void {
        if (Intersects.circleBox(this.ball.x, this.ball.y, 25, this.player.x - 128, window.innerHeight * 0.93 - 32, 256, 32)) {
            let calcangle = Math.atan2(this.ball.y - window.innerHeight * 0.98, this.ball.x - this.player.x);
            console.log(calcangle, calcangle * 180 / Math.PI);
            
            this.ball.angle = calcangle * 180 / Math.PI + 180;
        }
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