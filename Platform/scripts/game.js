"use strict";
let game = new Game();
window.onload = () => {
    let gameElement = document.getElementById('game');
    let player = document.createElement('img');
    player.src = './images/player-platform.png';
    player.id = 'player';
    gameElement === null || gameElement === void 0 ? void 0 : gameElement.appendChild(player);
    let ball = document.createElement('img');
    ball.src = './images/ball-platform.png';
    ball.id = 'ball';
    gameElement === null || gameElement === void 0 ? void 0 : gameElement.appendChild(ball);
    game.DisplayTiles();
    document.addEventListener('mousemove', (Event) => game.UpdatePlatform(Event), false);
    setInterval(() => {
        game.ball.UpdateBall();
        game.CheckBallPlayerCollision();
        game.CheckBallTilesCollision();
    }, 1);
};
