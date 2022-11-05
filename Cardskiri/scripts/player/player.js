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
