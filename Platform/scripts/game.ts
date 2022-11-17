let game = new Game();

window.onload = () => {
    let gameElement = document.getElementById('game');
    let player = document.createElement('img');
    player.src = './images/player-platform.png';
    gameElement?.appendChild(player);

    document.addEventListener('mousemove', (Event) => game.UpdatePlatform(Event), false);
}