const deck = new Deck();
const audioPlayer = new AudioManager();

function showCard(card: Card): void {
    let cardItem = document.getElementById(`card${card.id}`)!;
    cardItem.classList.remove('back-side');
    cardItem.classList.add(card.GetSuitType());
    cardItem.title = card.GetSuitForce();
    cardItem.classList.add(card.suit.name);
}

function start() {
    document.addEventListener('contextmenu', event => event.preventDefault());
    console.log(deck);
    let game = document.getElementById('game');
    let gameDeck = document.createElement('div');
    gameDeck.id = 'container'
    for (let i = 0; i < deck.cards.length; i++) {
        let cardItem = document.createElement('div');
        cardItem.classList.add('card');
        cardItem.classList.add('back-side');
        cardItem.id = `card${deck.cards[i].id}`
        cardItem.style.zIndex = (35 - i).toString();

        let randdelay: number = Math.random() * 5;
        // cardItem.style.transform = `translateY(${i*40 + Math.floor(Math.random()*15)}%)`;
        cardItem.style.animationName = Math.random() > 0.5 ? 'shuffleleft' : 'shuffleright';
        cardItem.style.animationDelay = `0.${i * randdelay < 10 ? `0${Math.floor(i * randdelay)}` : Math.floor(i * randdelay)}s`;
        gameDeck?.appendChild(cardItem);

        cardItem.style.transform = `translateY(${i / 3.5}%)`;
    }

    setTimeout(() => {
        for (let i = 0; i < deck.cards.length; i++) {
            let cardItem = document.getElementById(`card${i}`)!;
            cardItem.style.transform = `translate(-500%,${-40 + ((10 - i / 2) > 0 ? (10 - i / 2) * -1 : 10 - i / 2)}%)`
            cardItem.style.animationDelay = '';
            cardItem.style.animationName = '';
        }

        let cardItem = document.getElementById(`card0`)!;
        cardItem.style.zIndex = '0';

        showCard(deck.cards[0]);

        setTimeout(() => {
            let cardItem = document.getElementById(`card0`)!;
            cardItem.style.zIndex = '0';
            cardItem.style.transform = `translate(-450%, -47%) rotate(${86 + Math.floor(Math.random() * 10)}deg)`;
        }, 700);

        setTimeout(() => {
            deck.InitPlayer();

            for (const Card of deck.player.cards) {
                let cardItem = document.getElementById(`card${Card.id}`)!;
                cardItem.style.transform = 'translate(0%, 120%)';
                cardItem.style.transition = `${0.55 + Card.id / 15}s`;
            }

            for (const Card of deck.bot.cards) {
                let cardItem = document.getElementById(`card${Card.id}`)!;
                cardItem.style.transform = 'translate(0%, -200%)';
                cardItem.style.transition = `${0.55 + Card.id / 15}s`;
            }
            console.log(deck);

            setTimeout(() => {
                for (const Card of deck.player.cards) {
                    showCard(Card);
                }

                let cardNum: number = 0;
                for (const Card of deck.player.cards) {
                    let cardItem = document.getElementById(`card${Card.id}`)!;

                    Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20),
                        130 - 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)),
                        -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));

                    cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${Card.position.angle}deg)`;
                    cardItem.style.zIndex = cardNum.toString();
                    cardItem.style.transition = `0.55s`;
                    cardItem.addEventListener('mouseenter', (event) => {
                        audioPlayer.Play('hover');
                        console.log(Card.position, Card.position!.angle! * Math.PI / 180, Card.position?.angle);
                        cardItem.style.transform = `translate(${Card.position!.x! - Math.cos((90 + Card.position!.angle!) * Math.PI / 180) * 100}%, ${Card.position!.y! - Math.sin((90 + Card.position!.angle!) * Math.PI / 180) * 50}%) rotate(${Card.position!.angle}deg)`;
                    })
                    cardItem.addEventListener('mouseleave', (event) => {
                        console.log(Card.position);
                        cardItem.style.transform = `translate(${Card.position!.x}%, ${Card.position!.y}%) rotate(${Card.position!.angle}deg)`;
                    })
                }

                cardNum = 0;
                for (const Card of deck.bot.cards) {
                    let cardItem = document.getElementById(`card${Card.id}`)!;

                    Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20),
                        -210 + 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)),
                        -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));

                    cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${-Card.position.angle!}deg)`;
                    cardItem.style.transition = `0.55s`;
                }
            }, 1200);
        }, 1400);
    }, 1400);

    game?.appendChild(gameDeck);
    Resize();
    GuiInit();
}

window.onload = () => {
    start();
}

window.onresize = (event) => {
    Resize();
}

function Resize(): void {
    let width: number = window.innerWidth!;
    let gameDoc = document.getElementById('container')!;
    gameDoc.style.scale = `${width / 1920}`;

    let guiDoc = document.getElementById('gui')!;
    guiDoc.style.scale = `${width / 1920}`;
}