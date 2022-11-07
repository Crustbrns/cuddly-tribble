window.onresize = function (event) {
    Resize();
};
window.onmousedown = function (event) {
    var item = document.elementFromPoint(event.x, event.y);
    if ((item === null || item === void 0 ? void 0 : item.classList.contains('card')) && deck.player.cards.findIndex(function (x) { return x.id === parseInt(item.id.slice(4)); }) !== -1) {
        item.classList.add('dragging');
        document.getElementsByTagName('html')[0].style.cursor = 'none';
        ArrangeCards(deck.player.cards.filter(function (x) { return x.id !== parseInt(item.id.slice(4)); }), true);
    }
    // console.log(item, deck.player.cards.findIndex(x => x.id === parseInt(item.id.slice(0, 4))), deck.player.cards);
};
window.onmouseup = function (event) {
    var draggings = document.getElementsByClassName('dragging');
    if (draggings.length > 0) {
        var _loop_1 = function (item) {
            var elementId = document.getElementsByClassName('dragging')[0].id;
            var card = document.getElementById(elementId);
            var cardObject = deck.player.cards.find(function (x) { return x.id === parseInt(elementId.slice(4)); });
            card.style.transform = "translate(".concat(cardObject.position.x, "%, ").concat(cardObject.position.y, "%) rotate(").concat(deck.player.cards.find(function (x) { return x.id === parseInt(elementId.slice(4)); }).position.angle, "deg)");
            item.classList.remove('dragging');
            document.getElementsByTagName('html')[0].style.cursor = 'default';
            var y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
            if (y < 0 && deck.isFirstPlayerMoving && (deck.heap.discardIndex !== 0 || (deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5))) {
                if (deck.heap.TryAddAttackingCard(cardObject)) {
                    audioPlayer.Play('placed');
                    var botcard_1 = deck.bot.TryBeatCard(deck.player.cards.find(function (x) { return x.id === (cardObject === null || cardObject === void 0 ? void 0 : cardObject.id); }), deck.trumps);
                    deck.player.cards.splice(deck.player.cards.findIndex(function (x) { return x.id === (cardObject === null || cardObject === void 0 ? void 0 : cardObject.id); }), 1);
                    console.log(botcard_1);
                    if (botcard_1 !== null) {
                        setTimeout(function () {
                            var _a, _b, _c;
                            audioPlayer.Play('placed');
                            showCard(botcard_1);
                            botcard_1.position = new Position(((_a = cardObject === null || cardObject === void 0 ? void 0 : cardObject.position) === null || _a === void 0 ? void 0 : _a.x) + 14, ((_b = cardObject === null || cardObject === void 0 ? void 0 : cardObject.position) === null || _b === void 0 ? void 0 : _b.y) + 9, ((_c = cardObject === null || cardObject === void 0 ? void 0 : cardObject.position) === null || _c === void 0 ? void 0 : _c.angle) + 5);
                            botcard_1.bundle = cardObject === null || cardObject === void 0 ? void 0 : cardObject.id;
                            var cardItem = document.getElementById("card".concat(botcard_1 === null || botcard_1 === void 0 ? void 0 : botcard_1.id));
                            cardItem.style.transform = "translate(".concat(botcard_1.position.x, "%, ").concat(botcard_1.position.y, "%) rotate(").concat(botcard_1 === null || botcard_1 === void 0 ? void 0 : botcard_1.position.angle, "deg)");
                            // cardItem!.style.transition = '.2s ease';
                            deck.heap.activeCards.push(botcard_1);
                            deck.bot.RemoveCard(botcard_1);
                            ArrangeCards(deck.bot.cards, false);
                        }, 600);
                    }
                }
                for (var _a = 0, _b = deck.heap.activeCards; _a < _b.length; _a++) {
                    var card_1 = _b[_a];
                    var cardItem = document.getElementById("card".concat(card_1.id));
                    cardItem.style.transform = "translate(".concat(card_1.position.x, "%, ").concat(card_1.position.y, "%) rotate(").concat(card_1.position.angle, "deg)");
                }
            }
            var cardNum = 0;
            for (var _c = 0, _d = deck.player.cards; _c < _d.length; _c++) {
                var Card = _d[_c];
                var cardItem = document.getElementById("card".concat(Card.id));
                Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20), 130 - 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)), -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));
                cardItem.style.transform = "translate(".concat(Card.position.x, "%, ").concat(Card.position.y, "%) rotate(").concat(Card.position.angle, "deg)");
            }
        };
        for (var _i = 0, draggings_1 = draggings; _i < draggings_1.length; _i++) {
            var item = draggings_1[_i];
            _loop_1(item);
        }
    }
};
window.onmousemove = function (event) {
    if (document.getElementsByClassName('dragging').length !== 0) {
        var elementId = document.getElementsByClassName('dragging')[0].id;
        var card = document.getElementById(elementId);
        var x = (event.x - window.innerWidth * 0.52) / window.innerWidth * 1920 + 30;
        var y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
        var angle = Math.atan2(0 - x, 1500 - y);
        card.style.transform = "translate(".concat(x, "px, ").concat(y, "px) rotate(").concat(-(angle * 180 / Math.PI) / 2, "deg)");
        document.getElementsByTagName('html')[0].style.cursor = 'none';
    }
};
function Resize() {
    var width = window.innerWidth;
    var gameDoc = document.getElementById('container');
    gameDoc.style.scale = "".concat(width / 1920);
    var guiDoc = document.getElementById('gui');
    guiDoc.style.scale = "".concat(width / 1920);
}
