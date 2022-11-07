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

class Position {
    x?: number | null | undefined;;
    y?: number | null | undefined;
    angle?: number | null | undefined;

    constructor(x: number | null | undefined, y: number | null | undefined, angle: number | null | undefined) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}

class Card {
    id: number;
    readonly suit: SuitName;
    readonly force: number;
    position?: Position;

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

class Heap {
    discardIndex: number;
    activeCards: Array<Card>;
    attackingCards: number;

    discardedCards: Array<Card>;

    constructor() {
        this.discardIndex = 0;
        this.attackingCards = 0;
        this.activeCards = [];
        this.discardedCards = [];
    }

    TryAddAttackingCard(card: Card): boolean {
        card.position!.angle = -5 + Math.floor(Math.random() * 10);
        this.activeCards.push(card);

        this.attackingCards++;
        this.CalcPosition();

        return true;
    }

    private CalcPosition(): void {
        let isEven: boolean = this.attackingCards % 2 === 0;
        let startPosX: number;

        if (isEven) {
            startPosX = 0 - (Math.floor(this.attackingCards / 2) - 0.5) * 120;
        }
        else {
            startPosX = 0 - Math.floor(this.attackingCards / 2) * 120;
        }

        for (const item of this.activeCards) {
            item.position = new Position(startPosX, -45, item.position?.angle || 0);
            startPosX += 120;
        }
    }

    Discard(): void {
    }

    Abandon(): Array<Card> {
        return [];
    }

    private ClearTurn(isAbandoned: boolean): void {
        this.attackingCards = 0;
        this.discardIndex += isAbandoned ? 0 : 1;
    }
}

class Deck {
    cards: Array<Card> = [];
    readonly trumps: SuitName;
    lastCard: number = 1;

    heap: Heap = new Heap();
    player: Player = new Player();
    bot: Bot = new Bot();

    isFirstPlayerMoving?: boolean;

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

        for (let i = 0; i < 36; i++) {
            this.cards[i].id = i;
        }

        return this.cards[0];
    }

    InitPlayer(): void {
        console.log(this.cards);
        for (let i = 0; i < 6; i++) {
            this.player.AddCard(this.cards[1]!);
            this.cards.splice(1, 1);

            this.bot.AddCard(this.cards[1]!);
            this.cards.splice(1, 1);
        }
    }

    ProcessFirstMove(): Card | null | undefined {
        let BotCard = this.bot.cards.filter(x => x.suit.type === this.trumps.type).sort(function (a, b) { return a.force - b.force });
        let PlayerCard = this.player.cards.filter(x => x.suit.type === this.trumps.type).sort(function (a, b) { return a.force - b.force });
        console.log(BotCard, PlayerCard);

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
        this.isFirstPlayerMoving = true;

        return null;
    }

    CardsToDeck(): void {
        while (this.player.cards.length > 0) {
            let Card = this.player.cards.pop();
            this.cards.push(Card!);
        }
        while (this.bot.cards.length > 0) {
            let Card = this.bot.cards.pop();
            this.cards.push(Card!);
        }
        console.log(this.cards, this.player.cards, this.bot.cards);
    }
}

interface IPlayer {
    cards: Array<Card>;
    AddCard: (card: Card) => void;
    RemoveCard: (card: Card) => void;
}

class Player implements IPlayer {
    cards: Array<Card>;

    constructor() {
        this.cards = [];
    }

    AddCard(card: Card): void {
        if (!this.cards.includes(card)) {
            this.cards.push(card);
        }
    }

    RemoveCard(card: Card): void {
        if (this.cards.includes(card)) {
            this.cards.splice(this.cards.indexOf(card), 1);
        }
    }
}

class Bot implements IPlayer {
    cards: Array<Card>;

    constructor() {
        this.cards = [];
    }

    AddCard(card: Card): void {
        if (!this.cards.includes(card)) {
            this.cards.push(card);
        }
    }

    RemoveCard(card: Card): void {
        if (this.cards.includes(card)) {
            this.cards.splice(this.cards.indexOf(card), 1);
        }
    }
}