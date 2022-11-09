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
    var _a, _b, _c;
    var draggings = document.getElementsByClassName('dragging');
    if (draggings.length > 0) {
        var _loop_1 = function (item) {
            var elementId = document.getElementsByClassName('dragging')[0].id;
            var card = document.getElementById(elementId);
            var cardObject = deck.player.cards.find(function (x) { return x.id === parseInt(elementId.slice(4)); });
            card.style.transform = "translate(".concat(cardObject.position.x, "%, ").concat(cardObject.position.y, "%) rotate(").concat(deck.player.cards.find(function (x) { return x.id === parseInt(elementId.slice(4)); }).position.angle, "deg)");
            item.classList.remove('dragging');
            document.getElementsByTagName('html')[0].style.cursor = 'default';
            var x = (event.x - window.innerWidth * 0.52) / window.innerWidth * 1920 + 30;
            var y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
            if (y < 0 && deck.isFirstPlayerMoving && deck.bot.cards.length !== 0 && ((deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5) || (deck.heap.discardIndex !== 0 && deck.heap.attackingCards < 6))) {
                if (deck.heap.TryAddAttackingCard(cardObject)) {
                    audioPlayer.Play('placed');
                    var botcard_1 = deck.bot.TryBeatCard(deck.player.cards.find(function (x) { return x.id === (cardObject === null || cardObject === void 0 ? void 0 : cardObject.id); }), deck.trumps);
                    deck.player.cards.splice(deck.player.cards.findIndex(function (x) { return x.id === (cardObject === null || cardObject === void 0 ? void 0 : cardObject.id); }), 1);
                    // console.log(botcard);
                    if (!deck.bot.shouldTake) {
                        if (botcard_1 !== null) {
                            timeoutbotbeat = setTimeout(function () {
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
                                toggleActionButtonContext(true, 'Done');
                            }, 600);
                        }
                        else {
                            deck.bot.shouldTake = true;
                            toggleBotsDecision(true, 'I take');
                            toggleActionButtonContext(true, 'Pass');
                        }
                    }
                    else {
                        deck.bot.shouldTake = true;
                        toggleBotsDecision(true, 'I take');
                        toggleActionButtonContext(true, 'Pass');
                    }
                }
                for (var _d = 0, _e = deck.heap.activeCards; _d < _e.length; _d++) {
                    var card_1 = _e[_d];
                    var cardItem = document.getElementById("card".concat(card_1.id));
                    cardItem.style.transform = "translate(".concat(card_1.position.x, "%, ").concat(card_1.position.y, "%) rotate(").concat(card_1.position.angle, "deg)");
                }
            }
            else if (!deck.isFirstPlayerMoving) {
                var card_2 = deck.heap.activeCards.filter(function (x) { return x.bundle === undefined; }).filter(function (x) { return deck.heap.activeCards.filter(function (y) { return y.bundle === x.id; }).length === 0; })
                    .find(function (card) { return Intersects.boxPoint(card.position.x * 100 / 70 - 90, card.position.y * 140 / 45 - 20, 170, 200, x, y); });
                // console.log(card);
                if (card_2 !== undefined && ((card_2.suit.type === (cardObject === null || cardObject === void 0 ? void 0 : cardObject.suit.type) && card_2.force < cardObject.force)
                    || (card_2.suit.type !== deck.trumps.type && (cardObject === null || cardObject === void 0 ? void 0 : cardObject.suit.type) == deck.trumps.type))) {
                    toggleActionButton(false);
                    audioPlayer.Play('placed');
                    cardObject.position = new Position(((_a = card_2 === null || card_2 === void 0 ? void 0 : card_2.position) === null || _a === void 0 ? void 0 : _a.x) + 14, ((_b = card_2 === null || card_2 === void 0 ? void 0 : card_2.position) === null || _b === void 0 ? void 0 : _b.y) + 9, ((_c = card_2 === null || card_2 === void 0 ? void 0 : card_2.position) === null || _c === void 0 ? void 0 : _c.angle) + 5);
                    cardObject.bundle = card_2 === null || card_2 === void 0 ? void 0 : card_2.id;
                    var cardItem = document.getElementById("card".concat(cardObject === null || cardObject === void 0 ? void 0 : cardObject.id));
                    cardItem.style.transform = "translate(".concat(cardObject.position.x, "%, ").concat(cardObject.position.y, "%) rotate(").concat(cardObject === null || cardObject === void 0 ? void 0 : cardObject.position.angle, "deg)");
                    // cardItem!.style.transition = '.2s ease';
                    deck.heap.activeCards.push(cardObject);
                    deck.player.RemoveCard(cardObject);
                    ArrangeCards(deck.player.cards, true);
                    if (deck.player.cards.length === 0 && deck.cards.length === 0) {
                        makeAction();
                    }
                    var cardIndex = 1;
                    for (var _f = 0, _g = deck.heap.activeCards; _f < _g.length; _f++) {
                        var card_3 = _g[_f];
                        var cardItem_1 = document.getElementById("card".concat(card_3.id));
                        cardItem_1.style.transform = "translate(".concat(card_3.position.x, "%, ").concat(card_3.position.y, "%) rotate(").concat(card_3.position.angle, "deg)");
                        if (card_3.bundle !== undefined) {
                            cardItem_1.style.zIndex = "".concat(cardIndex + 50);
                        }
                        else {
                            cardItem_1.style.zIndex = "".concat(cardIndex);
                        }
                        cardIndex++;
                    }
                    BotAttackNext();
                    for (var _h = 0, _j = deck.heap.activeCards; _h < _j.length; _h++) {
                        var card_4 = _j[_h];
                        var cardItem_2 = document.getElementById("card".concat(card_4.id));
                        cardItem_2.style.transform = "translate(".concat(card_4.position.x, "%, ").concat(card_4.position.y, "%) rotate(").concat(card_4.position.angle, "deg)");
                    }
                    // console.log('After bot attack');
                }
                else {
                    var cardItems = document.getElementsByClassName('bordered');
                    for (var _k = 0, cardItems_1 = cardItems; _k < cardItems_1.length; _k++) {
                        var card_5 = cardItems_1[_k];
                        card_5.classList.remove('bordered');
                    }
                }
            }
            var cardsBordered = document.getElementsByClassName('bordered');
            for (var _l = 0, cardsBordered_1 = cardsBordered; _l < cardsBordered_1.length; _l++) {
                var card_6 = cardsBordered_1[_l];
                card_6.classList.remove('bordered');
            }
        };
        for (var _i = 0, draggings_1 = draggings; _i < draggings_1.length; _i++) {
            var item = draggings_1[_i];
            _loop_1(item);
        }
        ArrangeCards(deck.player.cards, true);
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
        if (!deck.isFirstPlayerMoving) {
            var _loop_2 = function (card_7) {
                var intersected = Intersects.boxPoint(card_7.position.x * 100 / 70 - 90, card_7.position.y * 140 / 45 - 20, 170, 200, x, y);
                // console.log('card x', card.position!.x! * 100 / 70 - 70, 'card y', card.position!.y! * 140 / 45, `x:${x}, y${y}`, intersected);
                if (intersected && deck.heap.activeCards.filter(function (x) { return x.bundle === card_7.id; }).length === 0) {
                    var cardItem = document.getElementById("card".concat(card_7.id));
                    cardItem.classList.add('bordered');
                }
                else {
                    var cardItem = document.getElementById("card".concat(card_7.id));
                    cardItem.classList.remove('bordered');
                }
            };
            for (var _i = 0, _a = deck.heap.activeCards.filter(function (x) { return x.bundle === undefined; }); _i < _a.length; _i++) {
                var card_7 = _a[_i];
                _loop_2(card_7);
            }
        }
    }
};
function Resize() {
    var width = window.innerWidth;
    var gameDoc = document.getElementById('container');
    gameDoc.style.scale = "".concat(width / 1920);
    var guiDoc = document.getElementById('gui');
    guiDoc.style.scale = "".concat(width / 1920);
}
