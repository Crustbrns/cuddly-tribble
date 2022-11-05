class Card {
    readonly suit: string;
    readonly force: number;

    constructor(suit: string, force: number){
        this.suit = suit;
        this.force = force;
    }
}

class Deck {
    cards: Array<Card> = [];

    constructor(){
        for(let i = 0; i < 36; i++){
            this.cards.push(new Card('Spade',4));
        }
    }
}

const deck = new Deck();
console.log(deck);
