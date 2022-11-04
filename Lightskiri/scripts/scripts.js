class Bulb {
    constructor() {
        this.X = Math.random() * 1920 * 0.75;
        this.Y = Math.random() * window.innerHeight * 0.4;
        this.turned = false;
    }
}

class Game {
    constructor() {
        this.Bulbs = [];
    }

    Init() {
        this.Bulbs = [];

        this.Bulbs.push(new Bulb());
        this.Bulbs.push(new Bulb());
        this.Bulbs.push(new Bulb());
        this.Bulbs.push(new Bulb());
    }
}

class Player{
    constructor(){
        this.lifes = 3;
    }

}

class Shot{
    constructor(){
        
    }
}

let LightsGame = new Game();
LightsGame.Init();

window.onload = () => {
    let game = document.getElementById('game');

    for (const bulbs of LightsGame.Bulbs) {

        let bulb = document.createElement('img');
        bulb.src = bulbs.turned ? './images/lampon.png' :'./images/lampoff.png';
        bulb.classList.add('bulb');
        bulb.style.transform = `translate(${bulbs.X}px, ${bulbs.Y}px)`;

        game.appendChild(bulb);
    }

    let hand = document.createElement('img');
    hand.src = './images/fire.png';
    hand.classList.add('hand');
    

    game.appendChild(hand);
}