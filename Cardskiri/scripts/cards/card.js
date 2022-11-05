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
Suits.set(Suit.DIAMOND, { type: 0, name: 'Бубна' });
Suits.set(Suit.HEART, { type: 1, name: 'Чирва' });
Suits.set(Suit.CLUB, { type: 2, name: 'Креста' });
Suits.set(Suit.SPADE, { type: 3, name: 'Пика' });
var Card = /** @class */ (function () {
    function Card(type, suit, force) {
        this.suit = new SuitName(type, suit);
        this.force = force;
    }
    Card.prototype.GetSuitType = function () {
        if (this.suit.type === 0 || this.suit.type === 1) {
            return 'red';
        }
        return 'black';
    };
    return Card;
}());
var Deck = /** @class */ (function () {
    function Deck() {
        var _a;
        this.cards = [];
        for (var i = 0; i < 4; i++) {
            var suit = (_a = Suits.get(i)) === null || _a === void 0 ? void 0 : _a.name;
            for (var j = 0; j < 9; j++) {
                this.cards.push(new Card(i, suit, 6 + j));
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
        return this.cards[0];
    };
    return Deck;
}());
