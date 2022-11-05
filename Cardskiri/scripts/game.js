var deck = new Deck();
function showCard(cardid) {
    var cardItem = document.getElementById("card".concat(cardid));
    cardItem.classList.remove('back-side');
    cardItem.classList.add(deck.cards[cardid].GetSuitType());
    cardItem.title = deck.cards[cardid].GetSuitForce();
    cardItem.classList.add(deck.cards[cardid].suit.name);
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
        cardItem.id = "card".concat(i);
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
            cardItem_1.style.transform = "translate(-500%,".concat(10 - i / 2 > 0 ? (10 - i / 2) * -1 : 10 - i / 2, "%)");
            cardItem_1.style.animationDelay = '';
            cardItem_1.style.animationName = '';
        }
        var cardItem = document.getElementById("card0");
        cardItem.style.zIndex = '0';
        showCard(0);
    }, 1400);
    setTimeout(function () {
        var cardItem = document.getElementById("card0");
        cardItem.style.zIndex = '0';
        cardItem.style.transform = "translate(-450%, -7%) rotate(".concat(86 + Math.floor(Math.random() * 10), "deg)");
    }, 2100);
    game === null || game === void 0 ? void 0 : game.appendChild(gameDeck);
}
window.onload = function () {
    start();
};
