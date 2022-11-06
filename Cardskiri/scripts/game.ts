let deck = new Deck();
const audioPlayer = new AudioManager();

let timeoutShuffle: NodeJS.Timeout;
let timeoutTrumpCard: NodeJS.Timeout;
let timeoutInitCards: NodeJS.Timeout;
let timeoutShowCards: NodeJS.Timeout;
let timeoutHideCard: NodeJS.Timeout;
let timeoutCenterCards: NodeJS.Timeout;
let timeoutRestart: NodeJS.Timeout;
let timeoutSmoothCenter: NodeJS.Timeout;
let timeoutStrictSmooth: NodeJS.Timeout;

function showCard(card: Card): void {
    let cardItem = document.getElementById(`card${card.id}`)!;
    cardItem.classList.remove('back-side');
    cardItem.classList.add(card.GetSuitType());
    cardItem.title = card.GetSuitForce();
    cardItem.classList.add(card.suit.name);
}

function hideCard(card: Card): void {
    let cardItem = document.getElementById(`card${card.id}`)!;
    cardItem.classList.remove('red', 'black', 'diamond', 'spade', 'club', 'heart');
    cardItem.classList.add('back-side');
    cardItem.title = '';
}

function start() {
    deck = new Deck();
    document.addEventListener('contextmenu', event => event.preventDefault());
    console.log(deck);
    let game = document.getElementById('game');
    let gameDeck = document.createElement('div');
    gameDeck.id = 'container'
    audioPlayer.Play('start');
    for (let i = 0; i < deck.cards.length; i++) {
        let cardItem = document.createElement('div');
        cardItem.classList.add('card');
        cardItem.classList.add('back-side');
        cardItem.id = `card${deck.cards[i].id}`
        cardItem.style.zIndex = (35 - i).toString();

        let randdelay: number = Math.random() * 2.2;
        // cardItem.style.transform = `translateY(${i*40 + Math.floor(Math.random()*15)}%)`;
        cardItem.style.animationName = Math.random() > 0.5 ? 'shuffleleft' : 'shuffleright';
        cardItem.style.animationDelay = `0.${i * randdelay < 10 ? `0${Math.floor(i * randdelay)}` : Math.floor(i * randdelay)}s`;
        gameDeck?.appendChild(cardItem);

        cardItem.style.transform = `translateY(${-40 + i / 3.5}%)`;
    }

    timeoutShuffle = setTimeout(() => {
        audioPlayer.Play('moving');
        for (let i = 0; i < deck.cards.length; i++) {
            let cardItem = document.getElementById(`card${i}`)!;
            cardItem.style.transform = `translate(-500%,${-40 + ((10 - i / 2) > 0 ? (10 - i / 2) * -1 : 10 - i / 2)}%)`
            cardItem.style.animationDelay = '';
            cardItem.style.animationName = '';
        }

        let cardItem = document.getElementById(`card0`)!;
        cardItem.style.zIndex = '0';

        showCard(deck.cards[0]);

        timeoutTrumpCard = setTimeout(() => {
            let cardItem = document.getElementById(`card0`)!;
            cardItem.style.zIndex = '0';
            cardItem.style.transform = `translate(-450%, -47%) rotate(${86 + Math.floor(Math.random() * 10)}deg)`;
        }, 700);

        timeoutInitCards = setTimeout(() => {
            deck.InitPlayer();
            audioPlayer.Play('shuffle');

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

            timeoutShowCards = setTimeout(() => {
                audioPlayer.Play('appear');
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
                    cardItem.addEventListener('mouseenter', (event) => ScaleCard(Card, cardItem), true);
                    cardItem.addEventListener('mouseleave', (event) => NormalizeCard(Card, cardItem), true);
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

                let DisplayingCard = deck.ProcessFirstMove();
                UpdateInfoBox();
                if (DisplayingCard !== null && DisplayingCard != undefined) {
                    let cardItem = document.getElementById(`card${DisplayingCard.id}`)!;
                    if (cardItem?.classList.contains('back-side')) {
                        showCard(DisplayingCard);
                    }

                    let tempPosition = new Position(DisplayingCard.position!.x, DisplayingCard.position!.y, DisplayingCard.position!.angle);

                    DisplayingCard.position!.x = 0;
                    DisplayingCard.position!.y = -37;
                    DisplayingCard.position!.angle = 0;

                    cardItem.style.transform = `translate(${DisplayingCard.position!.x}%, ${DisplayingCard.position!.y}%) rotate(${DisplayingCard.position!.angle}deg)`;

                    timeoutHideCard = setTimeout(() => {
                        DisplayingCard!.position = tempPosition;
                        audioPlayer.Play('moving');
                        if (deck.bot.cards.find(x => x.id === DisplayingCard?.id)) {
                            hideCard(DisplayingCard!);

                            let cardNum: number = 0;
                            for (const Card of deck.bot.cards) {
                                let cardItem = document.getElementById(`card${Card.id}`)!;

                                Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20),
                                    -210 + 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)),
                                    -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));

                                cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${-Card.position.angle!}deg)`;
                                cardItem.style.transition = `0.55s`;
                            }
                        }
                        else {
                            let cardNum: number = 0;
                            for (const Card of deck.player.cards) {
                                let cardItem = document.getElementById(`card${Card.id}`)!;

                                Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20),
                                    130 - 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)),
                                    -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));

                                cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${Card.position.angle}deg)`;
                                cardItem.style.zIndex = cardNum.toString();
                                cardItem.style.transition = `0.55s`;
                            }
                        }
                    }, 2000);
                }
                else {
                    timeoutCenterCards = setTimeout(() => {
                        for (const Card of deck.bot.cards) {
                            let cardItem = document.getElementById(`card${Card.id}`)!;
                            Card.position = new Position(0, -200, 0);
                            cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${-Card.position.angle!}deg)`;
                            cardItem.style.transition = `0.35s`;
                        }
                        for (const Card of deck.player.cards) {
                            let cardItem = document.getElementById(`card${Card.id}`)!;
                            Card.position = new Position(0, 120, 0);
                            cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${Card.position.angle}deg)`;
                            cardItem.style.transition = `0.35s`;
                            hideCard(Card);
                            cardItem.removeEventListener('mouseenter', (event) => ScaleCard(Card, cardItem), true);
                            cardItem.removeEventListener('mouseleave', (event) => NormalizeCard(Card, cardItem), true);
                        }
                        hideCard(deck.cards[0]);
                        document.getElementById(`card${deck.cards[0].id}`)!.style.transition = `0.35s`;
                        document.getElementById(`card${deck.cards[0].id}`)!.style.transform = `translate(-500%, -44%) rotate(0deg)`;
                    }, 1200);

                    timeoutRestart = setTimeout(() => {
                        Restart();
                    }, 1800);
                }
            }, 1200);
        }, 1400);
    }, 1400);

    game?.appendChild(gameDeck);
}

window.onload = () => {
    start();
    Resize();
    GuiInit();
}

window.onresize = (event) => {
    Resize();
}

function NormalizeCard(Card: Card, cardItem: HTMLElement): void {
    cardItem.style.transform = `translate(${Card.position!.x}%, ${Card.position!.y}%) rotate(${Card.position!.angle}deg)`;
}
function ScaleCard(Card: Card, cardItem: HTMLElement): void {
    audioPlayer.Play('hover');
    console.log(Card.position, Card.position!.angle! * Math.PI / 180, Card.position?.angle);
    cardItem.style.transform = `translate(${Card.position!.x! - Math.cos((90 + Card.position!.angle!) * Math.PI / 180) * 100}%, ${Card.position!.y! - Math.sin((90 + Card.position!.angle!) * Math.PI / 180) * 50}%) rotate(${Card.position!.angle}deg)`;
}
function Resize(): void {
    let width: number = window.innerWidth!;
    let gameDoc = document.getElementById('container')!;
    gameDoc.style.scale = `${width / 1920}`;

    let guiDoc = document.getElementById('gui')!;
    guiDoc.style.scale = `${width / 1920}`;
}
function Restart(): void {
    HideInfoBox();
    for (const Card of deck.bot.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = `translate(0%, 0%) rotate(0deg)`;
    }
    for (const Card of deck.player.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = `translate(0%, 0%) rotate(0deg)`;
    }
    for (const Card of deck.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = `translate(0%, 0%) rotate(0deg)`;
    }
    timeoutSmoothCenter = setTimeout(() => {
        let cards = document.getElementsByClassName('card');
        while (cards.length > 0) {
            cards[0].parentNode!.removeChild(cards[0]);
        }
        let gameDeck = document.getElementById('container');
        gameDeck?.remove();

        start();
    }, 800);
}
function StrictRestart(): void {
    HideInfoBox();
    let cards = document.getElementsByClassName('card');
    while (cards.length > 0) {
        cards[0].parentNode!.removeChild(cards[0]);
    }
    let gameDeck = document.getElementById('container');
    gameDeck?.remove();

    clearTimeout(timeoutShuffle);
    clearTimeout(timeoutTrumpCard);
    clearTimeout(timeoutInitCards);
    clearTimeout(timeoutShowCards);
    clearTimeout(timeoutHideCard);
    clearTimeout(timeoutCenterCards);
    clearTimeout(timeoutRestart);
    clearTimeout(timeoutSmoothCenter);
    clearTimeout(timeoutStrictSmooth);

    start();
}

function StrictSmoothRestart(): void {
    HideInfoBox();

    clearTimeout(timeoutShuffle);
    clearTimeout(timeoutTrumpCard);
    clearTimeout(timeoutInitCards);
    clearTimeout(timeoutShowCards);
    clearTimeout(timeoutHideCard);
    clearTimeout(timeoutCenterCards);
    clearTimeout(timeoutRestart);
    clearTimeout(timeoutSmoothCenter);
    clearTimeout(timeoutStrictSmooth);

    deck.CardsToDeck();
    console.log(deck.cards.length, deck);
    for (let i = 0; i < deck.cards.length; i++) {
        let cardItem = document.getElementById(`card${deck.cards[i].id}`)!;
        cardItem.style.transform = `translateY(${-40 + i / 3.5}%)`;
        cardItem.style.transition = `.4s ease`;
    }

    timeoutStrictSmooth = setTimeout(() => {
        let cards = document.getElementsByClassName('card');
        while (cards.length > 0) {
            cards[0].parentNode!.removeChild(cards[0]);
        }
        let gameDeck = document.getElementById('container');
        gameDeck?.remove();

        start();
    }, 800);
}