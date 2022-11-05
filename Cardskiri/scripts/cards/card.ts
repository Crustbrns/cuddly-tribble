enum Suit {
    DIAMOND = 0,
    HEART,
    CLUB,
    SPADE
}

class SuitName {
    readonly type: number;
    readonly name: string;

    constructor(type: number, name: string) {
        this.type = type;
        this.name = name;
    }
}

let Suits = new Map<Suit, SuitName>();
Suits.set(Suit.DIAMOND, { type: 0, name: 'Бубна' });
Suits.set(Suit.HEART, { type: 1, name: 'Чирва' });
Suits.set(Suit.CLUB, { type: 2, name: 'Креста' });
Suits.set(Suit.SPADE, { type: 3, name: 'Пика' });

class Card {
    readonly suit: string;
    readonly force: number;

    constructor(suit: string, force: number) {
        this.suit = suit;
        this.force = force;
    }
}

class Deck {
    cards: Array<Card> = [];
    readonly trumps: SuitName;

    constructor() {
        for (let i = 0; i < 4; i++) {
            let suit: string = Suits.get(i)?.name!;
            for (let j = 0; j < 9; j++) {
                this.cards.push(new Card(suit, 6 + j));
            }
        }

        this.trumps = Suits.get(Math.floor(Math.random() * 4))!;
    }

    Mix() {
        for (let i = 0; i < 36; i++) {
            let randcard = Math.floor(Math.random() * 36);
            let temp = this.cards.at(randcard)!;
            this.cards[randcard] = this.cards[i];
            this.cards[i] = temp;
        }
    }
}

const deck = new Deck();
deck.Mix();
console.log(deck);
