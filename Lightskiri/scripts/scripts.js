
var intersected = Intersects

class Bulb {
    constructor(id) {
        this.X = Math.random() * 1920 * 0.75;
        this.Y = Math.random() * window.innerHeight * 0.4;
        this.id = `bulb${id}`;
        this.turned = false;
    }
}

class Game {
    constructor() {
        this.Bulbs = [];
        this.Player = new Player();
    }

    Init() {
        this.Bulbs = [];

        for (let i = 0; i < 1 + Math.floor(Math.random() * 6); i++) {
            this.Bulbs.push(new Bulb(i));
        }
    }
}

class Player {
    constructor() {
        this.Shots = [];
        this.LastBulletId = 0;
    }

    Fire(angle) {
        this.Shots.push(new Shot(angle, this.LastBulletId++));
    }

}

class Shot {
    constructor(angle, id) {
        this.angle = angle;
        this.X = window.innerWidth * 0.45;
        this.Y = window.innerHeight * 0.8;
        this.id = `bullet${id}`;
        this.speed = 1;
    }
}

let LightsGame = new Game();
LightsGame.Init();

async function InitGame() {
    let game = document.getElementById('game');
    for (const bulbs of LightsGame.Bulbs) {

        let bulb = document.createElement('img');
        bulb.src = bulbs.turned ? './images/lampon.png' : './images/lampoff.png';
        bulb.classList.add('bulb');
        bulb.id = bulbs.id;
        bulb.style.transform = `translate(${bulbs.X}px, ${bulbs.Y}px)`;

        game.appendChild(bulb);
    }

}

window.onload = () => {
    InitGame();
    
    let game = document.getElementById('game');
    let hand = document.createElement('img');
    hand.src = './images/fire.png';
    hand.id = 'hand';
    game.appendChild(hand);

    timer = setInterval(function () {
        for (const Shot of LightsGame.Player.Shots) {
            if (Shot.Y <= -250) {
                LightsGame.Player.Shots.splice(LightsGame.Player.Shots.findIndex(x => x.id == Shot.id), 1);

                let game = document.getElementById('game');
                let fire = document.getElementById(Shot.id);
                game.removeChild(fire);
            }
            else {
                Shot.X -= Math.cos(Shot.angle) * Shot.speed;
                Shot.Y -= Math.sin(Shot.angle) * Shot.speed;
                Shot.speed += 0.15;
                let shot = document.getElementById(Shot.id);
                shot.style.transform = `translate(${Shot.X}px, ${Shot.Y}px) rotate(${Shot.angle * 180 / Math.PI + 90}deg)`;

                for (const Bulb of LightsGame.Bulbs) {
                    if (Intersects.boxBox(Bulb.X, Bulb.Y, 100, 140, Shot.X, Shot.Y, 80, 80)) {
                        Bulb.turned = true;
                        let bulb = document.getElementById(Bulb.id);
                        bulb.src = Bulb.turned ? './images/lampon.png' : './images/lampoff.png';
                    }
                }
            }
        }
    }, 10);

    checkWin = setInterval(function () {
        if (LightsGame.Bulbs.filter(x => x.turned == false).length === 0) {
            let bulbs = document.getElementsByClassName('bulb');
            while(bulbs.length > 0){
                bulbs[0].parentNode.removeChild(bulbs[0]);
            }

            setTimeout(() => {
                LightsGame.Init();
                InitGame();
            }, 400);
        }
    }, 1000);

}

window.addEventListener("click", function (event) {
    let Angle = Math.atan2(window.innerHeight * 0.8 - event.y, window.innerWidth * 0.45 - event.x);
    LightsGame.Player.Fire(Angle);

    let shot = document.createElement('img');
    shot.src = './images/fire.gif';
    shot.classList.add('fire');
    shot.id = LightsGame.Player.Shots.at(LightsGame.Player.Shots.length - 1).id;
    shot.style.transform = `translate(${window.innerWidth * 0.45}px, ${window.innerHeight * 0.8}px) rotate(${Angle * 180 / Math.PI + 90}deg)`;

    let game = document.getElementById('game');
    game.appendChild(shot);
});