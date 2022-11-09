var Suit;
(function (Suit) {
    Suit[Suit["DIAMOND"] = 0] = "DIAMOND";
    Suit[Suit["HEART"] = 1] = "HEART";
    Suit[Suit["CLUB"] = 2] = "CLUB";
    Suit[Suit["SPADE"] = 3] = "SPADE";
})(Suit || (Suit = {}));
var SuitName = /** @class */ (function () {
    function SuitName(type, name) {
        this.type = type;
        this.name = name;
    }
    return SuitName;
}());
var Suits = new Map();
Suits.set(Suit.DIAMOND, { type: 0, name: 'diamond' });
Suits.set(Suit.HEART, { type: 1, name: 'heart' });
Suits.set(Suit.CLUB, { type: 2, name: 'club' });
Suits.set(Suit.SPADE, { type: 3, name: 'spade' });
var Position = /** @class */ (function () {
    function Position(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
    ;
    return Position;
}());
var Card = /** @class */ (function () {
    function Card(type, suit, force, id) {
        this.suit = new SuitName(type, suit);
        this.force = force;
        this.id = id;
    }
    Card.prototype.GetSuitType = function () {
        if (this.suit.type === 0 || this.suit.type === 1) {
            return 'red';
        }
        return 'black';
    };
    Card.prototype.GetSuitForce = function () {
        if (this.force > 10) {
            if (this.force === 11)
                return 'J';
            if (this.force === 12)
                return 'Q';
            if (this.force === 13)
                return 'K';
            if (this.force === 14)
                return 'A';
        }
        return this.force.toString();
    };
    return Card;
}());
var Heap = /** @class */ (function () {
    function Heap() {
        this.discardIndex = 0;
        this.attackingCards = 0;
        this.activeCards = [];
        this.discardedCards = [];
    }
    Heap.prototype.TryAddAttackingCard = function (card) {
        if (this.activeCards.length === 0 || this.activeCards.filter(function (x) { return x.force === card.force; }).length !== 0) {
            card.position.angle = -5 + Math.floor(Math.random() * 10);
            this.activeCards.push(card);
            this.attackingCards++;
            this.CalcPosition();
            return true;
        }
        return false;
    };
    Heap.prototype.CalcPosition = function () {
        var _a, _b, _c, _d;
        var isEven = this.attackingCards % 2 === 0;
        var startPosX;
        if (isEven) {
            startPosX = 0 - (Math.floor(this.attackingCards / 2) - 0.5) * 140;
        }
        else {
            startPosX = 0 - Math.floor(this.attackingCards / 2) * 140;
        }
        var _loop_1 = function (item) {
            item.position = new Position(startPosX, -45, ((_a = item.position) === null || _a === void 0 ? void 0 : _a.angle) || 0);
            var cardBundle = this_1.activeCards.find(function (x) { return x.bundle === item.id; });
            if (cardBundle != null) {
                cardBundle.position = new Position(((_b = item === null || item === void 0 ? void 0 : item.position) === null || _b === void 0 ? void 0 : _b.x) + 14, ((_c = item === null || item === void 0 ? void 0 : item.position) === null || _c === void 0 ? void 0 : _c.y) + 9, ((_d = item === null || item === void 0 ? void 0 : item.position) === null || _d === void 0 ? void 0 : _d.angle) + 5);
            }
            startPosX += 140;
        };
        var this_1 = this;
        for (var _i = 0, _e = this.activeCards.filter(function (x) { return x.bundle === undefined; }); _i < _e.length; _i++) {
            var item = _e[_i];
            _loop_1(item);
        }
    };
    Heap.prototype.Discard = function () {
    };
    Heap.prototype.Abandon = function () {
        return [];
    };
    Heap.prototype.ClearTurn = function (isAbandoned) {
        this.attackingCards = 0;
        this.discardIndex += isAbandoned ? 0 : 1;
    };
    return Heap;
}());
var Deck = /** @class */ (function () {
    function Deck() {
        var _a;
        this.cards = [];
        this.lastCard = 1;
        this.heap = new Heap();
        this.player = new Player();
        this.bot = new Bot();
        for (var i = 0; i < 4; i++) {
            var suit = (_a = Suits.get(i)) === null || _a === void 0 ? void 0 : _a.name;
            for (var j = 0; j < 9; j++) {
                this.cards.push(new Card(i, suit, 6 + j, i * 9 + j));
            }
        }
        this.trumps = this.Shuffle().suit;
    }
    Deck.prototype.Shuffle = function () {
        for (var i = 0; i < 36; i++) {
            var randcard = Math.floor(Math.random() * 36);
            var temp = this.cards.at(randcard);
            this.cards[randcard] = this.cards[i];
            this.cards[i] = temp;
        }
        for (var i = 0; i < 36; i++) {
            this.cards[i].id = i;
        }
        return this.cards[0];
    };
    Deck.prototype.InitPlayer = function () {
        // console.log(this.cards);
        for (var i = 0; i < 6; i++) {
            this.player.AddCard(this.cards[1]);
            this.cards.splice(1, 1);
            this.bot.AddCard(this.cards[1]);
            this.cards.splice(1, 1);
        }
    };
    Deck.prototype.ProcessFirstMove = function () {
        var _this = this;
        var BotCard = this.bot.cards.filter(function (x) { return x.suit.type === _this.trumps.type; }).sort(function (a, b) { return a.force - b.force; });
        var PlayerCard = this.player.cards.filter(function (x) { return x.suit.type === _this.trumps.type; }).sort(function (a, b) { return a.force - b.force; });
        // console.log(BotCard, PlayerCard);
        if (BotCard.length === 0 && PlayerCard.length !== 0) {
            this.isFirstPlayerMoving = true;
            return PlayerCard[0];
        }
        else if (PlayerCard.length === 0 && BotCard.length !== 0) {
            this.isFirstPlayerMoving = false;
            return BotCard[0];
        }
        else if (PlayerCard.length !== 0 && BotCard.length !== 0) {
            if (PlayerCard[0].force < BotCard[0].force) {
                this.isFirstPlayerMoving = true;
                return PlayerCard[0];
            }
            else {
                this.isFirstPlayerMoving = false;
                return BotCard[0];
            }
        }
        else
            return null;
    };
    Deck.prototype.TryPushPlayersCards = function () {
        if (this.cards.length > 0) {
            while (this.player.cards.length < 6 && this.cards.length > 0) {
                if (this.cards.length > 1) {
                    this.player.AddCard(this.cards[1]);
                    this.cards.splice(1, 1);
                }
                else if (this.cards.length === 1) {
                    this.player.AddCard(this.cards[0]);
                    this.cards.splice(0, 1);
                }
            }
            while (this.bot.cards.length < 6 && this.cards.length > 0) {
                if (this.cards.length > 1) {
                    this.bot.AddCard(this.cards[1]);
                    this.cards.splice(1, 1);
                }
                else if (this.cards.length === 1) {
                    this.bot.AddCard(this.cards[0]);
                    this.cards.splice(0, 1);
                }
            }
        }
    };
    Deck.prototype.CardsToDeck = function () {
        while (this.player.cards.length > 0) {
            var Card_1 = this.player.cards.pop();
            this.cards.push(Card_1);
        }
        while (this.bot.cards.length > 0) {
            var Card_2 = this.bot.cards.pop();
            this.cards.push(Card_2);
        }
        while (this.heap.activeCards.length > 0) {
            var Card_3 = this.heap.activeCards.pop();
            this.cards.push(Card_3);
        }
        while (this.heap.discardedCards.length > 0) {
            var Card_4 = this.heap.discardedCards.pop();
            this.cards.push(Card_4);
        }
        // console.log(this.cards, this.player.cards, this.bot.cards);
    };
    Deck.prototype.TurnOver = function () {
        // console.log(this.heap.activeCards.length,
        //     this.heap.activeCards.length % 2 == 0,
        //     this.heap.activeCards.filter(x => x.bundle !== undefined),
        //     this.heap.activeCards.filter(x => x.bundle !== undefined).length === this.heap.activeCards.length / 2);
        var _this = this;
        if (this.heap.activeCards.length !== 0) {
            if (this.heap.activeCards.length % 2 == 0 &&
                this.heap.activeCards.filter(function (x) { return x.bundle !== undefined; }).length === this.heap.activeCards.length / 2) {
                while (this.heap.activeCards.length > 0) {
                    var discardedCard = this.heap.activeCards.pop();
                    discardedCard.position = new Position(610 + Math.random() * 100, -130 + Math.random() * 160, -25 + Math.random() * 50);
                    if (Math.random() > 0.5) {
                        discardedCard.hidden = true;
                    }
                    this.heap.discardedCards.push(discardedCard);
                    this.heap.discardIndex++;
                }
                this.isFirstPlayerMoving = !this.isFirstPlayerMoving;
                this.heap.attackingCards = 0;
                this.TryPushPlayersCards();
                toggleActionButton(false);
                toggleBotsDecision(false);
                UpdateInfoBox();
                return true;
            }
            else if (this.heap.attackingCards !== this.heap.activeCards.length / 2 &&
                this.bot.shouldTake !== undefined && this.bot.shouldTake) {
                this.bot.shouldTake = undefined;
                while (this.heap.activeCards.length > 0) {
                    this.bot.AddCard(this.heap.activeCards.pop());
                }
                this.heap.attackingCards = 0;
                this.TryPushPlayersCards();
                toggleActionButton(false);
                toggleBotsDecision(false);
                UpdateInfoBox();
                return true;
            }
            else if (this.heap.attackingCards !== this.heap.activeCards.length / 2
                && !this.isFirstPlayerMoving) {
                this.bot.shouldTake = undefined;
                var additionalCard = TryPushMoreCards();
                if (additionalCard !== null) {
                    while (additionalCard !== null) {
                        if (additionalCard !== null &&
                            ((deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5
                                || (deck.heap.discardIndex !== 0 && deck.heap.attackingCards < 6)))) {
                            if (deck.heap.TryAddAttackingCard(additionalCard)) {
                                showCard(additionalCard);
                                deck.bot.RemoveCard(additionalCard);
                                var _loop_2 = function (card) {
                                    var cardItem = document.getElementById("card".concat(card.id));
                                    cardItem.style.transform = "translate(".concat(card.position.x, "%, ").concat(card.position.y, "%) rotate(").concat(card.position.angle, "deg)");
                                    cardItem.addEventListener('mouseenter', function (event) { return ScaleCard(card, cardItem); }, true);
                                    cardItem.addEventListener('mouseleave', function (event) { return NormalizeCard(card, cardItem); }, true);
                                };
                                for (var _i = 0, _a = deck.heap.activeCards; _i < _a.length; _i++) {
                                    var card = _a[_i];
                                    _loop_2(card);
                                }
                                ArrangeCards(deck.bot.cards, false);
                                toggleActionButtonContext(true, 'Take');
                            }
                        }
                        additionalCard = TryPushMoreCards();
                    }
                    setTimeout(function () {
                        audioPlayer.Play('placed');
                        while (_this.heap.activeCards.length > 0) {
                            _this.player.AddCard(_this.heap.activeCards.pop());
                        }
                        _this.heap.attackingCards = 0;
                        _this.TryPushPlayersCards();
                        toggleActionButton(false);
                        toggleBotsDecision(false);
                        UpdateInfoBox();
                        ArrangeCards(deck.player.cards, true);
                        ArrangeCards(deck.bot.cards, false);
                    }, 550);
                }
                else {
                    while (this.heap.activeCards.length > 0) {
                        this.player.AddCard(this.heap.activeCards.pop());
                    }
                    this.heap.attackingCards = 0;
                    this.TryPushPlayersCards();
                    toggleActionButton(false);
                    toggleBotsDecision(false);
                    UpdateInfoBox();
                }
                return true;
            }
        }
        return false;
    };
    return Deck;
}());
var Player = /** @class */ (function () {
    function Player() {
        this.cards = [];
    }
    Player.prototype.AddCard = function (card) {
        if (!this.cards.includes(card)) {
            this.cards.push(card);
        }
    };
    Player.prototype.RemoveCard = function (card) {
        if (this.cards.includes(card)) {
            this.cards.splice(this.cards.indexOf(card), 1);
        }
    };
    return Player;
}());
var Bot = /** @class */ (function () {
    function Bot() {
        this.cards = [];
    }
    Bot.prototype.AddCard = function (card) {
        if (!this.cards.includes(card)) {
            this.cards.push(card);
        }
    };
    Bot.prototype.RemoveCard = function (card) {
        if (this.cards.includes(card)) {
            this.cards.splice(this.cards.indexOf(card), 1);
        }
    };
    Bot.prototype.TryBeatCard = function (card, trump) {
        if (this.cards.filter(function (x) { return x.suit.type === card.suit.type; })
            .filter(function (x) { return x.force > card.force; }).length !== 0) {
            return this.cards.filter(function (x) { return x.suit.type === card.suit.type; })
                .filter(function (x) { return x.force > card.force; })
                .sort(function (a, b) { return a.force - b.force; })[0];
        }
        else if (card.suit.type !== trump.type &&
            this.cards.filter(function (x) { return x.suit.type === trump.type; }).length !== 0) {
            return this.cards.filter(function (x) { return x.suit.type === trump.type; })
                .sort(function (a, b) { return a.force - b.force; })[0];
        }
        return null;
    };
    Bot.prototype.ProcessCardToAttack = function (trump) {
        if (this.cards.length > 0) {
            if (this.cards.filter(function (x) { return x.suit.type !== trump.type; }).length > 0) {
                return this.cards.filter(function (x) { return x.suit.type !== trump.type; })
                    .sort(function (a, b) { return a.force - b.force; })[0];
            }
            else
                return this.cards.sort(function (a, b) { return a.force - b.force; })[0];
        }
        return null;
    };
    return Bot;
}());
