var deck = new Deck();
function start() {
    console.log(deck);
    var game = document.getElementById('game');
    var gameDeck = document.createElement('div');
    gameDeck.id = 'container';
    for (var i = 0; i < deck.cards.length; i++) {
        var cardItem = document.createElement('div');
        cardItem.classList.add('card');
        cardItem.classList.add('back-side');
        cardItem.id = "card".concat(i);
        cardItem.style.zIndex = i.toString();
        var randdelay = Math.random() * 3;
        console.log(i * randdelay);
        cardItem.style.transform = "translateY(-".concat(i / 2, "%)");
        cardItem.style.animationDelay = "0.".concat(i * randdelay < 10 ? "0".concat(Math.floor(i * randdelay)) : Math.floor(i * randdelay), "s");
        gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.appendChild(cardItem);
    }
    setTimeout(function () {
        for (var i = 0; i < deck.cards.length; i++) {
            var cardItem_1 = document.getElementById("card".concat(i));
            cardItem_1.style.transform = "translate(-500%,-".concat(i / 2, "%)");
        }
        var cardItem = document.getElementById("card0");
        cardItem.classList.remove('back-side');
        cardItem.classList.add(deck.cards[0].GetSuitType());
        var cardItem1 = document.getElementById("card35");
        cardItem1.classList.remove('back-side');
        cardItem1.classList.add(deck.cards[35].GetSuitType());
    }, 1400);
    setTimeout(function () {
        var cardItem = document.getElementById("card0");
        cardItem.style.transform = "translate(-450%, -7%) rotate(".concat(86 + Math.floor(Math.random() * 10), "deg)");
    }, 2100);
    game === null || game === void 0 ? void 0 : game.appendChild(gameDeck);
}
window.onload = function () {
    start();
};
