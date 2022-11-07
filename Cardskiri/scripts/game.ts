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
let timeoutAccurateShuffle: NodeJS.Timeout;

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
        cardItem.style.animationName = Math.random() > 0.5 ? 'shuffleleft' : 'shuffleright';
        cardItem.style.animationDelay = `0.${i * randdelay < 10 ? `0${Math.floor(i * randdelay)}` : Math.floor(i * randdelay)}s`;
        gameDeck?.appendChild(cardItem);

        cardItem.style.transform = `translateY(${-40 + i / 3.5}%)`;
    }

    timeoutShuffle = setTimeout(() => {
        audioPlayer.Play('moving');
        for (let i = 0; i < deck.cards.length; i++) {
            let cardItem = document.getElementById(`card${i}`)!;
            cardItem.style.transform = `translate(-560%,${-40 + ((10 - i / 2) > 0 ? (10 - i / 2) * -1 : 10 - i / 2)}%)`
            cardItem.style.animationDelay = '';
            cardItem.style.animationName = '';
            // cardItem.style.transition = '0.4s ease-in-out';
        }

        let cardItem = document.getElementById(`card0`)!;
        cardItem.style.zIndex = '0';

        showCard(deck.cards[0]);

        timeoutTrumpCard = setTimeout(() => {
            audioPlayer.Play('trump');
            let cardItem = document.getElementById(`card0`)!;
            cardItem.style.zIndex = '0';
            cardItem.style.transform = `translate(-510%, -47%) rotate(${86 + Math.floor(Math.random() * 10)}deg)`;
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

                InitializeCards();
                ArrangeCards(deck.player.cards, true);
                ArrangeCards(deck.bot.cards, false)

                let DisplayingCard = deck.ProcessFirstMove();
                if (DisplayingCard !== null && DisplayingCard != undefined) {
                    UpdateInfoBox();
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
                            ArrangeCards(deck.bot.cards, false);
                        }
                        else {
                            ArrangeCards(deck.player.cards, true);
                        }
                    }, 2000);
                }
                else {
                    AlertInfoBox();
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
                            // cardItem.removeEventListener('mouseenter', (event) => ScaleCard(Card, cardItem), true);
                            // cardItem.removeEventListener('mouseleave', (event) => NormalizeCard(Card, cardItem), true);
                        }
                        hideCard(deck.cards[0]);
                        document.getElementById(`card${deck.cards[0].id}`)!.style.transition = `0.35s`;
                        document.getElementById(`card${deck.cards[0].id}`)!.style.transform = `translate(-560%, -44%) rotate(0deg)`;
                    }, 1200);

                    timeoutRestart = setTimeout(() => {
                        StrictSmoothRestart();
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

window.onmousedown = (event) => {
    let item = document.elementFromPoint(event.x, event.y)!;
    if (item?.classList.contains('card') && deck.player.cards.findIndex(x => x.id === parseInt(item.id.slice(4))) !== -1) {
        item.classList.add('dragging');
        document.getElementsByTagName('html')[0].style.cursor = 'none';

        let cardNum: number = 0;
        for (const Card of deck.player.cards.filter(x => x.id !== parseInt(item.id.slice(4)))) {
            let cardItem = document.getElementById(`card${Card.id}`)!;

            Card.position = new Position(-10 * (deck.player.cards.length - 2) + (cardNum * 20),
                130 - 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)),
                -5 * (deck.player.cards.length - 2) + (cardNum++ * 10));

            cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${Card.position.angle}deg)`;
        }
    }
    // console.log(item, deck.player.cards.findIndex(x => x.id === parseInt(item.id.slice(0, 4))), deck.player.cards);
}

window.onmouseup = (event) => {
    let draggings = document.getElementsByClassName('dragging');
    if (draggings.length > 0) {
        for (const item of draggings) {
            const elementId = document.getElementsByClassName('dragging')[0].id;
            const card = document.getElementById(elementId)!;
            const cardObject = deck.player.cards.find(x => x.id === parseInt(elementId.slice(4)))
            card!.style.transform = `translate(${cardObject!.position!.x}%, ${cardObject!.position!.y}%) rotate(${deck.player.cards.find(x => x.id === parseInt(elementId.slice(4)))!.position!.angle}deg)`;

            item.classList.remove('dragging');
            document.getElementsByTagName('html')[0].style.cursor = 'default';

            let y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
            if (y < 0 && deck.isFirstPlayerMoving) {
                if (deck.heap.TryAddAttackingCard(cardObject!)) {
                    deck.player.cards.splice(deck.player.cards.findIndex(x => x.id === cardObject?.id), 1);
                }

                for (const card of deck.heap.activeCards) {
                    let cardItem = document.getElementById(`card${card.id}`)!;
                    cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
                }
            }

            let cardNum: number = 0;
            for (const Card of deck.player.cards) {
                let cardItem = document.getElementById(`card${Card.id}`)!;

                Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20),
                    130 - 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)),
                    -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));

                cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${Card.position.angle}deg)`;
            }
        }
    }

}

window.onmousemove = (event) => {
    if (document.getElementsByClassName('dragging').length !== 0) {
        const elementId = document.getElementsByClassName('dragging')[0].id;
        const card = document.getElementById(elementId)!;

        let x = (event.x - window.innerWidth * 0.52) / window.innerWidth * 1920 + 30;
        let y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
        let angle = Math.atan2(0 - x, 1500 - y);

        card!.style.transform = `translate(${x}px, ${y}px) rotate(${-(angle * 180 / Math.PI) / 2}deg)`;
        document.getElementsByTagName('html')[0].style.cursor = 'none';
    }
}

function InitializeCards() : void {
    for (const Card of deck.player.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;

        cardItem.addEventListener('mouseenter', (event) => ScaleCard(Card, cardItem), true);
        cardItem.addEventListener('mouseleave', (event) => NormalizeCard(Card, cardItem), true);
        cardItem.style.transition = `0.55s`;
    }

    for (const Card of deck.bot.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;
        cardItem.style.transition = `0.55s`;
    }
}

function ArrangeCards(Cards: Array<Card>, isPlayer: boolean): void {
    let cardNum: number = 0;
    for (const Card of Cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;

        let multiplier = 6 / Cards.length;
        Card.position = new Position((-10 * (Cards.length - 1) + (cardNum * 20)) * (multiplier >= 1 ? 1 : multiplier / 0.8),
            ((isPlayer ? 130 : -210) - 6 * (cardNum < (Cards.length / 2) ? (Cards.length / 2 - ((Cards.length - cardNum) / 2)) : (((Cards.length - cardNum) - 1) / 2))),
            (-5 * (Cards.length - 1) + (cardNum++ * 10)) * (multiplier >= 1 ? 1 : multiplier * 1.5));

        cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${isPlayer ? Card.position.angle : -Card.position.angle!}deg)`;
        cardItem.style.zIndex = cardNum.toString();
    }
}

function NormalizeCard(Card: Card, cardItem: HTMLElement): void {
    if (deck.player.cards.find(x => x.id === Card.id)) {
        cardItem.style.transform = `translate(${Card.position!.x}%, ${Card.position!.y}%) rotate(${Card.position!.angle}deg)`;
    }
}
function ScaleCard(Card: Card, cardItem: HTMLElement): void {
    if (!cardItem.classList.contains('dragging') && deck.player.cards.find(x => x.id === Card.id)) {
        audioPlayer.Play('hover');
        console.log(Card.position, Card.position!.angle! * Math.PI / 180, Card.position?.angle);
        cardItem.style.cursor = 'grab';
        cardItem.style.transform = `translate(${Card.position!.x! - Math.cos((90 + Card.position!.angle!) * Math.PI / 180) * 70}%, ${Card.position!.y! - Math.sin((90 + Card.position!.angle!) * Math.PI / 180) * 35}%) rotate(${Card.position!.angle}deg)`;
    }
    else {
        cardItem.style.cursor = 'default';
    }
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
    clearTimeout(timeoutAccurateShuffle);

    deck.CardsToDeck();
    audioPlayer.Play('sweep');
    console.log(deck.cards.length, deck);
    for (let i = 0; i < deck.cards.length; i++) {
        let cardItem = document.getElementById(`card${deck.cards[i].id}`)!;
        cardItem.style.transform = `translate(0, ${-40 + i / 3.5}%) rotate(${-10 + Math.floor(Math.random() * 20)}deg)`;
        cardItem.style.transition = `.4s ease`;
    }

    timeoutStrictSmooth = setTimeout(() => {
        for (let i = 0; i < deck.cards.length; i++) {
            let cardItem = document.getElementById(`card${deck.cards[i].id}`)!;
            cardItem.style.transform = `translate(0, ${-40 + i / 3.5}%) rotate(0deg)`;
            cardItem.style.transition = `.35s ease`;
        }
        timeoutAccurateShuffle = setTimeout(() => {
            let cards = document.getElementsByClassName('card');
            while (cards.length > 0) {
                cards[0].parentNode!.removeChild(cards[0]);
            }
            let gameDeck = document.getElementById('container');
            gameDeck?.remove();

            start();
        }, 400);
    }, 600);
}