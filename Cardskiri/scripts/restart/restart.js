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
    clearTimeout(timeoutAccurateShuffle);
    clearTimeout(timeoutbotbeat);
    toggleActionButton(false);
    toggleBotsDecision(false, '...');
    deck.CardsToDeck();
    audioPlayer.Play('sweep');
    // console.log(deck.cards.length, deck);
    for (var i = 0; i < deck.cards.length; i++) {
        var cardItem = document.getElementById("card".concat(deck.cards[i].id));
        cardItem.style.transform = "translate(0, ".concat(-40 + i / 3.5, "%) rotate(").concat(-10 + Math.floor(Math.random() * 20), "deg)");
        cardItem.style.transition = ".4s ease";
        cardItem.classList.add('no-shadow');
    }
    timeoutStrictSmooth = setTimeout(function () {
        for (var i = 0; i < deck.cards.length; i++) {
            var cardItem = document.getElementById("card".concat(deck.cards[i].id));
            cardItem.style.transform = "translate(0, ".concat(-40 + i / 3.5, "%) rotate(0deg)");
            cardItem.style.transition = ".35s ease";
        }
        timeoutAccurateShuffle = setTimeout(function () {
            var cards = document.getElementsByClassName('card');
            while (cards.length > 0) {
                cards[0].parentNode.removeChild(cards[0]);
            }
            var gameDeck = document.getElementById('container');
            gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.remove();
            start();
        }, 400);
    }, 600);
    var winner = document.getElementById('winner');
    if (winner !== null) {
        winner.remove();
    }
}
