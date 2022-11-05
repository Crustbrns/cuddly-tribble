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
var Deck = /** @class */ (function () {
    function Deck() {
        var _a;
        this.cards = [];
        this.lastCard = 1;
        this.player = new Player();
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
        for (var i = 0; i < 6; i++) {
            this.player.AddCard(this.cards[1]);
            this.cards.splice(1, 1);
        }
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
