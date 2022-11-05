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
Suits.set(Suit.DIAMOND, { type: 0, name: 'diamond' });
Suits.set(Suit.HEART, { type: 1, name: 'heart' });
Suits.set(Suit.CLUB, { type: 2, name: 'club' });
Suits.set(Suit.SPADE, { type: 3, name: 'spade' });

class Card {
    id: number;
    readonly suit: SuitName;
    readonly force: number;

    constructor(type: number, suit: string, force: number, id: number) {
        this.suit = new SuitName(type, suit);
        this.force = force;
        this.id = id;
    }

    GetSuitType(): string {
        if (this.suit.type === 0 || this.suit.type === 1) {
            return 'red';
        }
        return 'black';
    }

    GetSuitForce(): string {
        if (this.force > 10) {
            if (this.force === 11) return 'J';
            if (this.force === 12) return 'Q';
            if (this.force === 13) return 'K';
            if (this.force === 14) return 'A';
        }
        return this.force.toString();
    }
}

class Deck {
    cards: Array<Card> = [];
    readonly trumps: SuitName;
    lastCard: number = 1;

    player: Player = new Player();

    constructor() {
        for (let i = 0; i < 4; i++) {
            let suit: string = Suits.get(i)?.name!;
            for (let j = 0; j < 9; j++) {
                this.cards.push(new Card(i, suit, 6 + j, i * 9 + j));
            }
        }

        this.trumps = this.Shuffle().suit;
    }

    Shuffle(): Card {
        for (let i = 0; i < 36; i++) {
            let randcard = Math.floor(Math.random() * 36);
            let temp = this.cards.at(randcard)!;
            this.cards[randcard] = this.cards[i];
            this.cards[i] = temp;
        }

        for(let i = 0; i < 36; i++){
            this.cards[i].id = i;
        }

        return this.cards[0];
    }

    InitPlayer(): void {
        for (let i = 0; i < 6; i++) {
            this.player.AddCard(this.cards[1]!);
            this.cards.splice(1, 1);
        }
    }
}

class Player {
    cards: Array<Card> = [];

    constructor(){

    }

    AddCard(card: Card) : void{
        if(!this.cards.includes(card)){
            this.cards.push(card);
        }
    }

    RemoveCard(card: Card) : void{
        if(this.cards.includes(card)){
            this.cards.splice(this.cards.indexOf(card), 1);
        }
    }
}