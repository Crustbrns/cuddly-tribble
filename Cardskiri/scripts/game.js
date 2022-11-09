var deck = new Deck();
var audioPlayer = new AudioManager();
var timeoutShuffle;
var timeoutTrumpCard;
var timeoutInitCards;
var timeoutShowCards;
var timeoutHideCard;
var timeoutCenterCards;
var timeoutRestart;
var timeoutSmoothCenter;
var timeoutStrictSmooth;
var timeoutAccurateShuffle;
var timeoutbotbeat;
var timeoutBotAttack;
function showCard(card) {
    var cardItem = document.getElementById("card".concat(card.id));
    cardItem.classList.remove('back-side');
    cardItem.classList.add(card.GetSuitType());
    cardItem.title = card.GetSuitForce();
    cardItem.classList.add(card.suit.name);
}
function hideCard(card) {
    var cardItem = document.getElementById("card".concat(card.id));
    cardItem.classList.remove('red', 'black', 'diamond', 'spade', 'club', 'heart');
    cardItem.classList.add('back-side');
    cardItem.title = '';
}
function start() {
    deck = new Deck();
    document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
    // console.log(deck);
    var game = document.getElementById('game');
    var gameDeck = document.createElement('div');
    gameDeck.id = 'container';
    audioPlayer.Play('start');
    for (var i = 0; i < deck.cards.length; i++) {
        var cardItem = document.createElement('div');
        cardItem.classList.add('card');
        cardItem.classList.add('back-side');
        cardItem.id = "card".concat(deck.cards[i].id);
        cardItem.style.zIndex = (35 - i).toString();
        var randdelay = Math.random() * 2.2;
        cardItem.style.animationName = Math.random() > 0.5 ? 'shuffleleft' : 'shuffleright';
        cardItem.style.animationDelay = "0.".concat(i * randdelay < 10 ? "0".concat(Math.floor(i * randdelay)) : Math.floor(i * randdelay), "s");
        gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.appendChild(cardItem);
        cardItem.style.transform = "translateY(".concat(-40 + i / 3.5, "%)");
    }
    timeoutShuffle = setTimeout(function () {
        audioPlayer.Play('moving');
        for (var i = 0; i < deck.cards.length; i++) {
            var cardItem_1 = document.getElementById("card".concat(i));
            cardItem_1.style.transform = "translate(-560%,".concat(-40 + ((10 - i / 2) > 0 ? (10 - i / 2) * -1 : 10 - i / 2), "%)");
            cardItem_1.style.animationDelay = '';
            cardItem_1.style.animationName = '';
            // cardItem.style.transition = '0.4s ease-in-out';
        }
        var cardItem = document.getElementById("card0");
        cardItem.style.zIndex = '0';
        showCard(deck.cards[0]);
        timeoutTrumpCard = setTimeout(function () {
            audioPlayer.Play('trump');
            var cardItem = document.getElementById("card0");
            cardItem.style.zIndex = '0';
            cardItem.style.transform = "translate(-520%, -47%) rotate(".concat(86 + Math.floor(Math.random() * 10), "deg)");
        }, 700);
        timeoutInitCards = setTimeout(function () {
            deck.InitPlayer();
            audioPlayer.Play('shuffle');
            for (var _i = 0, _a = deck.player.cards; _i < _a.length; _i++) {
                var Card = _a[_i];
                var cardItem_2 = document.getElementById("card".concat(Card.id));
                cardItem_2.style.transform = 'translate(0%, 120%)';
                cardItem_2.style.transition = "".concat(0.55 + Card.id / 15, "s");
            }
            for (var _b = 0, _c = deck.bot.cards; _b < _c.length; _b++) {
                var Card = _c[_b];
                var cardItem_3 = document.getElementById("card".concat(Card.id));
                cardItem_3.style.transform = 'translate(0%, -200%)';
                cardItem_3.style.transition = "".concat(0.55 + Card.id / 15, "s");
            }
            // console.log(deck);
            timeoutShowCards = setTimeout(function () {
                audioPlayer.Play('appear');
                for (var _i = 0, _a = deck.player.cards; _i < _a.length; _i++) {
                    var Card = _a[_i];
                    showCard(Card);
                }
                InitializeCards();
                ArrangeCards(deck.player.cards, true);
                ArrangeCards(deck.bot.cards, false);
                var DisplayingCard = deck.ProcessFirstMove();
                if (DisplayingCard !== null && DisplayingCard != undefined) {
                    UpdateInfoBox();
                    var cardItem_4 = document.getElementById("card".concat(DisplayingCard.id));
                    if (cardItem_4 === null || cardItem_4 === void 0 ? void 0 : cardItem_4.classList.contains('back-side')) {
                        showCard(DisplayingCard);
                    }
                    var tempPosition_1 = new Position(DisplayingCard.position.x, DisplayingCard.position.y, DisplayingCard.position.angle);
                    DisplayingCard.position.x = 0;
                    DisplayingCard.position.y = -37;
                    DisplayingCard.position.angle = 0;
                    cardItem_4.style.transform = "translate(".concat(DisplayingCard.position.x, "%, ").concat(DisplayingCard.position.y, "%) rotate(").concat(DisplayingCard.position.angle, "deg)");
                    timeoutHideCard = setTimeout(function () {
                        DisplayingCard.position = tempPosition_1;
                        audioPlayer.Play('moving');
                        if (deck.bot.cards.find(function (x) { return x.id === (DisplayingCard === null || DisplayingCard === void 0 ? void 0 : DisplayingCard.id); })) {
                            hideCard(DisplayingCard);
                            ArrangeCards(deck.bot.cards, false);
                            timeoutBotAttack = setTimeout(function () {
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
                    timeoutCenterCards = setTimeout(function () {
                        for (var _i = 0, _a = deck.bot.cards; _i < _a.length; _i++) {
                            var Card = _a[_i];
                            var cardItem_5 = document.getElementById("card".concat(Card.id));
                            Card.position = new Position(0, -200, 0);
                            cardItem_5.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(-Card.position.angle, "deg)");
                            cardItem_5.style.transition = "0.35s";
                        }
                        for (var _b = 0, _c = deck.player.cards; _b < _c.length; _b++) {
                            var Card = _c[_b];
                            var cardItem_6 = document.getElementById("card".concat(Card.id));
                            Card.position = new Position(0, 120, 0);
                            cardItem_6.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
                            cardItem_6.style.transition = "0.35s";
                            hideCard(Card);
                            // cardItem.removeEventListener('mouseenter', (event) => ScaleCard(Card, cardItem), true);
                            // cardItem.removeEventListener('mouseleave', (event) => NormalizeCard(Card, cardItem), true);
                        }
                        hideCard(deck.cards[0]);
                        document.getElementById("card".concat(deck.cards[0].id)).style.transition = "0.35s";
                        document.getElementById("card".concat(deck.cards[0].id)).style.transform = "translate(-560%, -44%) rotate(0deg)";
                    }, 1200);
                    timeoutRestart = setTimeout(function () {
                        StrictSmoothRestart();
                    }, 1800);
                }
            }, 1200);
        }, 1400);
    }, 1400);
    game === null || game === void 0 ? void 0 : game.appendChild(gameDeck);
}
window.onload = function () {
    start();
    Resize();
    GuiInit();
};
function BotAttack() {
    var cardAttack = deck.bot.ProcessCardToAttack(deck.trumps);
    if (cardAttack !== null) {
        if (deck.heap.TryAddAttackingCard(cardAttack)) {
            audioPlayer.Play('placed');
            showCard(cardAttack);
            deck.bot.RemoveCard(cardAttack);
            for (var _i = 0, _a = deck.heap.activeCards; _i < _a.length; _i++) {
                var card = _a[_i];
                var cardItem = document.getElementById("card".concat(card.id));
                cardItem.style.transform = "translate(".concat(card.position.x, "%, ").concat(card.position.y, "%) rotate(").concat(card.position.angle, "deg)");
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
function BotAttackNext() {
    var cardAttack = null;
    if (deck.player.cards.length !== 0) {
        var _loop_1 = function (card) {
            if (deck.bot.cards.filter(function (x) { return x.force === card.force; }).length !== 0) {
                cardAttack = deck.bot.cards.filter(function (x) { return x.force === card.force; })[0];
                return "break";
            }
        };
        for (var _i = 0, _a = deck.heap.activeCards; _i < _a.length; _i++) {
            var card = _a[_i];
            var state_1 = _loop_1(card);
            if (state_1 === "break")
                break;
        }
        if (cardAttack !== null &&
            ((deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5
                || (deck.heap.discardIndex !== 0 && deck.heap.attackingCards < 6)))) {
            if (deck.heap.TryAddAttackingCard(cardAttack)) {
                audioPlayer.Play('placed');
                showCard(cardAttack);
                deck.bot.RemoveCard(cardAttack);
                for (var _b = 0, _c = deck.heap.activeCards; _b < _c.length; _b++) {
                    var card = _c[_b];
                    var cardItem = document.getElementById("card".concat(card.id));
                    cardItem.style.transform = "translate(".concat(card.position.x, "%, ").concat(card.position.y, "%) rotate(").concat(card.position.angle, "deg)");
                }
                ArrangeCards(deck.bot.cards, false);
                toggleActionButtonContext(true, 'Take');
            }
        }
        else {
            setTimeout(function () {
                if (deck.bot.cards.length > 0) {
                    toggleBotsDecision(true, 'Done');
                }
                setTimeout(function () {
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
function TryPushMoreCards() {
    if (deck.heap.attackingCards !== deck.heap.activeCards.length / 2 && deck.heap.attackingCards < 6 &&
        deck.player.cards.length > deck.heap.attackingCards - deck.heap.activeCards.filter(function (x) { return x.bundle !== undefined; }).length) {
        var _loop_2 = function (card) {
            if (deck.bot.cards.filter(function (x) { return x.suit.type !== deck.trumps.type; })
                .filter(function (x) { return x.force <= 10; }).filter(function (x) { return x.force == card.force; })
                .sort(function (a, b) { return a.force - b.force; }).length !== 0) {
                return { value: deck.bot.cards.filter(function (x) { return x.suit.type !== deck.trumps.type; })
                        .filter(function (x) { return x.force <= 10; }).filter(function (x) { return x.force == card.force; })
                        .sort(function (a, b) { return a.force - b.force; })[0] };
            }
        };
        for (var _i = 0, _a = deck.heap.activeCards; _i < _a.length; _i++) {
            var card = _a[_i];
            var state_2 = _loop_2(card);
            if (typeof state_2 === "object")
                return state_2.value;
        }
    }
    return null;
}
function InitializeCards() {
    var _loop_3 = function (Card) {
        var cardItem = document.getElementById("card".concat(Card.id));
        cardItem.addEventListener('mouseenter', function (event) { return ScaleCard(Card, cardItem); }, true);
        cardItem.addEventListener('mouseleave', function (event) { return NormalizeCard(Card, cardItem); }, true);
        cardItem.style.transition = "0.55s";
    };
    for (var _i = 0, _a = deck.player.cards; _i < _a.length; _i++) {
        var Card = _a[_i];
        _loop_3(Card);
    }
    for (var _b = 0, _c = deck.bot.cards; _b < _c.length; _b++) {
        var Card = _c[_b];
        var cardItem = document.getElementById("card".concat(Card.id));
        cardItem.style.transition = "0.55s";
    }
}
function ArrangeCards(Cards, isPlayer) {
    var cardNum = 0;
    for (var _i = 0, Cards_1 = Cards; _i < Cards_1.length; _i++) {
        var Card = Cards_1[_i];
        var cardItem = document.getElementById("card".concat(Card.id));
        var multiplier = 6 / Cards.length;
        Card.position = new Position((-10 * (Cards.length - 1) + (cardNum * 20)) * (multiplier >= 1 ? 1 : multiplier / 0.8), ((isPlayer ? 130 : -210) - (isPlayer ? 1 : -1) * (6 * (cardNum < (Cards.length / 2) ? (Cards.length / 2 - ((Cards.length - cardNum) / 2)) : (((Cards.length - cardNum) - 1) / 2)))), (-5 * (Cards.length - 1) + (cardNum++ * 10)) * (multiplier >= 1 ? 1 : multiplier * 1.5));
        cardItem.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(isPlayer ? Card.position.angle : -Card.position.angle, "deg)");
        cardItem.style.zIndex = isPlayer ? cardNum.toString() : ((cardNum * -1) + 40).toString();
    }
}
function NormalizeCard(Card, cardItem) {
    if (deck.player.cards.find(function (x) { return x.id === Card.id; })) {
        cardItem.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
    }
}
function ScaleCard(Card, cardItem) {
    if (!cardItem.classList.contains('dragging') && deck.player.cards.find(function (x) { return x.id === Card.id; })) {
        audioPlayer.Play('hover');
        cardItem.style.cursor = 'grab';
        cardItem.style.transform = "translate(".concat(Card.position.x - Math.cos((90 + Card.position.angle) * Math.PI / 180) * 70, "%, ").concat(Card.position.y - Math.sin((90 + Card.position.angle) * Math.PI / 180) * 35, "%) rotate(").concat(Card.position.angle, "deg)");
        // console.log(Card.position, Card.position!.angle! * Math.PI / 180, Card.position?.angle);
    }
    else {
        cardItem.style.cursor = 'default';
    }
}
