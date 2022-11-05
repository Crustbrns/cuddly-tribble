var deck = new Deck();
function showCard(card) {
    var cardItem = document.getElementById("card".concat(card.id));
    cardItem.classList.remove('back-side');
    cardItem.classList.add(card.GetSuitType());
    cardItem.title = card.GetSuitForce();
    cardItem.classList.add(card.suit.name);
}
function start() {
    console.log(deck);
    var game = document.getElementById('game');
    var gameDeck = document.createElement('div');
    gameDeck.id = 'container';
    for (var i = 0; i < deck.cards.length; i++) {
        var cardItem = document.createElement('div');
        cardItem.classList.add('card');
        cardItem.classList.add('back-side');
        cardItem.id = "card".concat(deck.cards[i].id);
        cardItem.style.zIndex = (35 - i).toString();
        var randdelay = Math.random() * 5;
        // cardItem.style.transform = `translateY(${i*40 + Math.floor(Math.random()*15)}%)`;
        cardItem.style.animationName = Math.random() > 0.5 ? 'shuffleleft' : 'shuffleright';
        cardItem.style.animationDelay = "0.".concat(i * randdelay < 10 ? "0".concat(Math.floor(i * randdelay)) : Math.floor(i * randdelay), "s");
        gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.appendChild(cardItem);
        cardItem.style.transform = "translateY(".concat(i / 3.5, "%)");
    }
    setTimeout(function () {
        for (var i = 0; i < deck.cards.length; i++) {
            var cardItem_1 = document.getElementById("card".concat(i));
            cardItem_1.style.transform = "translate(-500%,".concat(-40 + ((10 - i / 2) > 0 ? (10 - i / 2) * -1 : 10 - i / 2), "%)");
            cardItem_1.style.animationDelay = '';
            cardItem_1.style.animationName = '';
        }
        var cardItem = document.getElementById("card0");
        cardItem.style.zIndex = '0';
        showCard(deck.cards[0]);
        setTimeout(function () {
            var cardItem = document.getElementById("card0");
            cardItem.style.zIndex = '0';
            cardItem.style.transform = "translate(-450%, -47%) rotate(".concat(86 + Math.floor(Math.random() * 10), "deg)");
        }, 700);
        setTimeout(function () {
            deck.InitPlayer();
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
            setTimeout(function () {
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
                    cardItem_4.addEventListener('mouseenter', function (event) {
                        var _a;
                        console.log(Card.position, Card.position.angle * Math.PI / 180, (_a = Card.position) === null || _a === void 0 ? void 0 : _a.angle);
                        cardItem_4.style.transform = "translate(".concat(Card.position.x - Math.cos((90 + Card.position.angle) * Math.PI / 180) * 100, "%, ").concat(Card.position.y - Math.sin((90 + Card.position.angle) * Math.PI / 180) * 50, "%) rotate(").concat(Card.position.angle, "deg)");
                    });
                    cardItem_4.addEventListener('mouseleave', function (event) {
                        console.log(Card.position);
                        cardItem_4.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
                    });
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
            }, 1200);
        }, 1400);
    }, 1400);
    game === null || game === void 0 ? void 0 : game.appendChild(gameDeck);
}
window.onload = function () {
    start();
};
