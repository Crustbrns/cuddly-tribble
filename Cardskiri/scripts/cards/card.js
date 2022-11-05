var Card = /** @class */ (function () {
    function Card(suit, force) {
        this.suit = suit;
        this.force = force;
    }
    return Card;
}());
var Deck = /** @class */ (function () {
    function Deck() {
        this.cards = [];
        for (var i = 0; i < 36; i++) {
            this.cards.push(new Card('Spade', 4));
        }
    }
    return Deck;
}());
var deck = new Deck();
console.log(deck);
