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
let timeoutbotbeat: NodeJS.Timeout;
let timeoutBotAttack: NodeJS.Timeout;

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
    // console.log(deck);
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
            cardItem.style.transform = `translate(-520%, -47%) rotate(${86 + Math.floor(Math.random() * 10)}deg)`;
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
            // console.log(deck);

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

                            timeoutBotAttack = setTimeout(() => {
                                BotAttack();
                            }, 1000);
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

function BotAttack(): void {
    let cardAttack = deck.bot.ProcessCardToAttack(deck.trumps);

    if (cardAttack !== null) {
        if (deck.heap.TryAddAttackingCard(cardAttack!)) {
            audioPlayer.Play('placed');

            showCard(cardAttack!);
            deck.bot.RemoveCard(cardAttack!);

            for (const card of deck.heap.activeCards) {
                let cardItem = document.getElementById(`card${card.id}`)!;
                cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
            }

            ArrangeCards(deck.bot.cards, false);
            toggleActionButtonContext(true, 'Take');
        }
    }
    else if (cardAttack === null && deck.bot.cards.length === 0) {
        makeAction();
    }
    else {
        toggleBotsDecision(true, 'Done');
        toggleActionButtonContext(true, 'Done');
    }
}

function BotAttackNext(): void {
    let cardAttack: Card | null = null;

    if (deck.player.cards.length !== 0) {
        for (const card of deck.heap.activeCards) {
            if (deck.bot.cards.filter(x => x.force === card.force).length !== 0) {
                cardAttack = deck.bot.cards.filter(x => x.force === card.force)[0];
                break;
            }
        }

        if (cardAttack !== null &&
            ((deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5
                || (deck.heap.discardIndex !== 0 && deck.heap.attackingCards < 6)))) {

            if (deck.heap.TryAddAttackingCard(cardAttack!)) {
                audioPlayer.Play('placed');

                showCard(cardAttack!);
                deck.bot.RemoveCard(cardAttack!);

                for (const card of deck.heap.activeCards) {
                    let cardItem = document.getElementById(`card${card.id}`)!;
                    cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
                }

                ArrangeCards(deck.bot.cards, false);
                toggleActionButtonContext(true, 'Take');
            }
        }
        else {
            setTimeout(() => {
                if (deck.bot.cards.length > 0) {
                    toggleBotsDecision(true, 'Done');
                }
                setTimeout(() => {
                    makeAction();
                }, 1200);
            }, 500);
            // toggleActionButtonContext(true, 'Done');
        }
    }
    else {
        makeAction();
    }
}

function TryPushMoreCards(): Card | null {
    if (deck.heap.attackingCards !== deck.heap.activeCards.length / 2 && deck.heap.attackingCards < 6 &&
        deck.player.cards.length > deck.heap.attackingCards - deck.heap.activeCards.filter(x => x.bundle !== undefined).length) {
        for (const card of deck.heap.activeCards) {
            if (deck.bot.cards.filter(x => x.suit.type !== deck.trumps.type)
                .filter(x => x.force <= 10).filter(x => x.force == card.force)
                .sort(function (a, b) { return a.force - b.force }).length !== 0) {
                return deck.bot.cards.filter(x => x.suit.type !== deck.trumps.type)
                    .filter(x => x.force <= 10).filter(x => x.force == card.force)
                    .sort(function (a, b) { return a.force - b.force })[0];
            }
        }
    }

    return null;
}

function InitializeCards(): void {
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
            ((isPlayer ? 130 : -210) - (isPlayer ? 1 : -1) * (6 * (cardNum < (Cards.length / 2) ? (Cards.length / 2 - ((Cards.length - cardNum) / 2)) : (((Cards.length - cardNum) - 1) / 2)))),
            (-5 * (Cards.length - 1) + (cardNum++ * 10)) * (multiplier >= 1 ? 1 : multiplier * 1.5));

        cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${isPlayer ? Card.position.angle : -Card.position.angle!}deg)`;
        cardItem.style.zIndex = isPlayer ? cardNum.toString() : ((cardNum * -1) + 40).toString();
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
        cardItem.style.cursor = 'grab';
        cardItem.style.transform = `translate(${Card.position!.x! - Math.cos((90 + Card.position!.angle!) * Math.PI / 180) * 70}%, ${Card.position!.y! - Math.sin((90 + Card.position!.angle!) * Math.PI / 180) * 35}%) rotate(${Card.position!.angle}deg)`;
        // console.log(Card.position, Card.position!.angle! * Math.PI / 180, Card.position?.angle);
    }
    else {
        cardItem.style.cursor = 'default';
    }
}
