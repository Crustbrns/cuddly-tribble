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
    console.log(deck);
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
        // cardItem.style.transform = `translateY(${i*40 + Math.floor(Math.random()*15)}%)`;
        cardItem.style.animationName = Math.random() > 0.5 ? 'shuffleleft' : 'shuffleright';
        cardItem.style.animationDelay = "0.".concat(i * randdelay < 10 ? "0".concat(Math.floor(i * randdelay)) : Math.floor(i * randdelay), "s");
        gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.appendChild(cardItem);
        cardItem.style.transform = "translateY(".concat(-40 + i / 3.5, "%)");
    }
    timeoutShuffle = setTimeout(function () {
        audioPlayer.Play('moving');
        for (var i = 0; i < deck.cards.length; i++) {
            var cardItem_1 = document.getElementById("card".concat(i));
            cardItem_1.style.transform = "translate(-500%,".concat(-40 + ((10 - i / 2) > 0 ? (10 - i / 2) * -1 : 10 - i / 2), "%)");
            cardItem_1.style.animationDelay = '';
            cardItem_1.style.animationName = '';
        }
        var cardItem = document.getElementById("card0");
        cardItem.style.zIndex = '0';
        showCard(deck.cards[0]);
        timeoutTrumpCard = setTimeout(function () {
            var cardItem = document.getElementById("card0");
            cardItem.style.zIndex = '0';
            cardItem.style.transform = "translate(-450%, -47%) rotate(".concat(86 + Math.floor(Math.random() * 10), "deg)");
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
            console.log(deck);
            timeoutShowCards = setTimeout(function () {
                audioPlayer.Play('appear');
                for (var _i = 0, _a = deck.player.cards; _i < _a.length; _i++) {
                    var Card = _a[_i];
                    showCard(Card);
                }
                var cardNum = 0;
                var _loop_1 = function (Card) {
                    var cardItem_4 = document.getElementById("card".concat(Card.id));
                    Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20), 130 - 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)), -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));
                    cardItem_4.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
                    cardItem_4.style.zIndex = cardNum.toString();
                    cardItem_4.style.transition = "0.55s";
                    cardItem_4.addEventListener('mouseenter', function (event) { return ScaleCard(Card, cardItem_4); }, true);
                    cardItem_4.addEventListener('mouseleave', function (event) { return NormalizeCard(Card, cardItem_4); }, true);
                };
                for (var _b = 0, _c = deck.player.cards; _b < _c.length; _b++) {
                    var Card = _c[_b];
                    _loop_1(Card);
                }
                cardNum = 0;
                for (var _d = 0, _e = deck.bot.cards; _d < _e.length; _d++) {
                    var Card = _e[_d];
                    var cardItem_5 = document.getElementById("card".concat(Card.id));
                    Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20), -210 + 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)), -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));
                    cardItem_5.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(-Card.position.angle, "deg)");
                    cardItem_5.style.transition = "0.55s";
                }
                var DisplayingCard = deck.ProcessFirstMove();
                UpdateInfoBox();
                if (DisplayingCard !== null && DisplayingCard != undefined) {
                    var cardItem_6 = document.getElementById("card".concat(DisplayingCard.id));
                    if (cardItem_6 === null || cardItem_6 === void 0 ? void 0 : cardItem_6.classList.contains('back-side')) {
                        showCard(DisplayingCard);
                    }
                    var tempPosition_1 = new Position(DisplayingCard.position.x, DisplayingCard.position.y, DisplayingCard.position.angle);
                    DisplayingCard.position.x = 0;
                    DisplayingCard.position.y = -37;
                    DisplayingCard.position.angle = 0;
                    cardItem_6.style.transform = "translate(".concat(DisplayingCard.position.x, "%, ").concat(DisplayingCard.position.y, "%) rotate(").concat(DisplayingCard.position.angle, "deg)");
                    timeoutHideCard = setTimeout(function () {
                        DisplayingCard.position = tempPosition_1;
                        audioPlayer.Play('moving');
                        if (deck.bot.cards.find(function (x) { return x.id === (DisplayingCard === null || DisplayingCard === void 0 ? void 0 : DisplayingCard.id); })) {
                            hideCard(DisplayingCard);
                            var cardNum_1 = 0;
                            for (var _i = 0, _a = deck.bot.cards; _i < _a.length; _i++) {
                                var Card = _a[_i];
                                var cardItem_7 = document.getElementById("card".concat(Card.id));
                                Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum_1 * 20), -210 + 6 * (cardNum_1 < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum_1) / 2)) : (((deck.player.cards.length - cardNum_1) - 1) / 2)), -5 * (deck.player.cards.length - 1) + (cardNum_1++ * 10));
                                cardItem_7.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(-Card.position.angle, "deg)");
                                cardItem_7.style.transition = "0.55s";
                            }
                        }
                        else {
                            var cardNum_2 = 0;
                            for (var _b = 0, _c = deck.player.cards; _b < _c.length; _b++) {
                                var Card = _c[_b];
                                var cardItem_8 = document.getElementById("card".concat(Card.id));
                                Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum_2 * 20), 130 - 6 * (cardNum_2 < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum_2) / 2)) : (((deck.player.cards.length - cardNum_2) - 1) / 2)), -5 * (deck.player.cards.length - 1) + (cardNum_2++ * 10));
                                cardItem_8.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
                                cardItem_8.style.zIndex = cardNum_2.toString();
                                cardItem_8.style.transition = "0.55s";
                            }
                        }
                    }, 2000);
                }
                else {
                    timeoutCenterCards = setTimeout(function () {
                        for (var _i = 0, _a = deck.bot.cards; _i < _a.length; _i++) {
                            var Card = _a[_i];
                            var cardItem_9 = document.getElementById("card".concat(Card.id));
                            Card.position = new Position(0, -200, 0);
                            cardItem_9.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(-Card.position.angle, "deg)");
                            cardItem_9.style.transition = "0.35s";
                        }
                        var _loop_2 = function (Card) {
                            var cardItem_10 = document.getElementById("card".concat(Card.id));
                            Card.position = new Position(0, 120, 0);
                            cardItem_10.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
                            cardItem_10.style.transition = "0.35s";
                            hideCard(Card);
                            cardItem_10.removeEventListener('mouseenter', function (event) { return ScaleCard(Card, cardItem_10); }, true);
                            cardItem_10.removeEventListener('mouseleave', function (event) { return NormalizeCard(Card, cardItem_10); }, true);
                        };
                        for (var _b = 0, _c = deck.player.cards; _b < _c.length; _b++) {
                            var Card = _c[_b];
                            _loop_2(Card);
                        }
                        hideCard(deck.cards[0]);
                        document.getElementById("card".concat(deck.cards[0].id)).style.transition = "0.35s";
                        document.getElementById("card".concat(deck.cards[0].id)).style.transform = "translate(-500%, -44%) rotate(0deg)";
                    }, 1200);
                    timeoutRestart = setTimeout(function () {
                        Restart();
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
window.onresize = function (event) {
    Resize();
};
function NormalizeCard(Card, cardItem) {
    cardItem.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
}
function ScaleCard(Card, cardItem) {
    var _a;
    audioPlayer.Play('hover');
    console.log(Card.position, Card.position.angle * Math.PI / 180, (_a = Card.position) === null || _a === void 0 ? void 0 : _a.angle);
    cardItem.style.transform = "translate(".concat(Card.position.x - Math.cos((90 + Card.position.angle) * Math.PI / 180) * 100, "%, ").concat(Card.position.y - Math.sin((90 + Card.position.angle) * Math.PI / 180) * 50, "%) rotate(").concat(Card.position.angle, "deg)");
}
function Resize() {
    var width = window.innerWidth;
    var gameDoc = document.getElementById('container');
    gameDoc.style.scale = "".concat(width / 1920);
    var guiDoc = document.getElementById('gui');
    guiDoc.style.scale = "".concat(width / 1920);
}
function Restart() {
    HideInfoBox();
    for (var _i = 0, _a = deck.bot.cards; _i < _a.length; _i++) {
        var Card = _a[_i];
        var cardItem = document.getElementById("card".concat(Card.id));
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = "translate(0%, 0%) rotate(0deg)";
    }
    for (var _b = 0, _c = deck.player.cards; _b < _c.length; _b++) {
        var Card = _c[_b];
        var cardItem = document.getElementById("card".concat(Card.id));
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = "translate(0%, 0%) rotate(0deg)";
    }
    for (var _d = 0, _e = deck.cards; _d < _e.length; _d++) {
        var Card = _e[_d];
        var cardItem = document.getElementById("card".concat(Card.id));
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = "translate(0%, 0%) rotate(0deg)";
    }
    timeoutSmoothCenter = setTimeout(function () {
        var cards = document.getElementsByClassName('card');
        while (cards.length > 0) {
            cards[0].parentNode.removeChild(cards[0]);
        }
        var gameDeck = document.getElementById('container');
        gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.remove();
        start();
    }, 800);
}
function StrictRestart() {
    HideInfoBox();
    var cards = document.getElementsByClassName('card');
    while (cards.length > 0) {
        cards[0].parentNode.removeChild(cards[0]);
    }
    var gameDeck = document.getElementById('container');
    gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.remove();
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
function StrictSmoothRestart() {
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
    for (var i = 0; i < deck.cards.length; i++) {
        var cardItem = document.getElementById("card".concat(deck.cards[i].id));
        cardItem.style.transform = "translateY(".concat(-40 + i / 3.5, "%)");
        cardItem.style.transition = ".4s ease";
    }
    timeoutStrictSmooth = setTimeout(function () {
        var cards = document.getElementsByClassName('card');
        while (cards.length > 0) {
            cards[0].parentNode.removeChild(cards[0]);
        }
        var gameDeck = document.getElementById('container');
        gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.remove();
        start();
    }, 800);
}
