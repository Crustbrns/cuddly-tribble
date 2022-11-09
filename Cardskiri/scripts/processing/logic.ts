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
    bundle?: number;
    hidden?: boolean;

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
        if (this.activeCards.length === 0 || this.activeCards.filter(x => x.force === card.force).length !== 0) {
            card.position!.angle = -5 + Math.floor(Math.random() * 10);
            this.activeCards.push(card);

            this.attackingCards++;
            this.CalcPosition();

            return true;
        }
        return false;
    }

    private CalcPosition(): void {
        let isEven: boolean = this.attackingCards % 2 === 0;
        let startPosX: number;

        if (isEven) {
            startPosX = 0 - (Math.floor(this.attackingCards / 2) - 0.5) * 140;
        }
        else {
            startPosX = 0 - Math.floor(this.attackingCards / 2) * 140;
        }

        for (const item of this.activeCards.filter(x => x.bundle === undefined)) {
            item.position = new Position(startPosX, -45, item.position?.angle || 0);

            let cardBundle = this.activeCards.find(x => x.bundle === item.id);
            if (cardBundle != null) {
                cardBundle!.position = new Position(item?.position?.x! + 14, item?.position?.y! + 9, item?.position?.angle! + 5);
            }

            startPosX += 140;
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
        // console.log(this.cards);

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
        } else return null;
    }

    TryPushPlayersCards(): void {
        if (this.cards.length > 0) {
            while (this.player.cards.length < 6 && this.cards.length > 0) {
                if (this.cards.length > 1) {
                    this.player.AddCard(this.cards[1]!);
                    this.cards.splice(1, 1);
                }
                else if (this.cards.length === 1) {
                    this.player.AddCard(this.cards[0]!);
                    this.cards.splice(0, 1);
                }
            }

            while (this.bot.cards.length < 6 && this.cards.length > 0) {
                if (this.cards.length > 1) {
                    this.bot.AddCard(this.cards[1]!);
                    this.cards.splice(1, 1);
                }
                else if (this.cards.length === 1) {
                    this.bot.AddCard(this.cards[0]!);
                    this.cards.splice(0, 1);
                }
            }
        }
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
        while (this.heap.activeCards.length > 0) {
            let Card = this.heap.activeCards.pop();
            this.cards.push(Card!);
        }
        while (this.heap.discardedCards.length > 0) {
            let Card = this.heap.discardedCards.pop();
            this.cards.push(Card!);
        }
        // console.log(this.cards, this.player.cards, this.bot.cards);
    }

    TurnOver(): boolean {
        // console.log(this.heap.activeCards.length,
        //     this.heap.activeCards.length % 2 == 0,
        //     this.heap.activeCards.filter(x => x.bundle !== undefined),
        //     this.heap.activeCards.filter(x => x.bundle !== undefined).length === this.heap.activeCards.length / 2);

        if (this.heap.activeCards.length !== 0) {
            if (this.heap.activeCards.length % 2 == 0 &&
                this.heap.activeCards.filter(x => x.bundle !== undefined).length === this.heap.activeCards.length / 2) {

                while (this.heap.activeCards.length > 0) {
                    let discardedCard = this.heap.activeCards.pop()!;

                    discardedCard.position = new Position(
                        610 + Math.random() * 100,
                        -130 + Math.random() * 160,
                        -25 + Math.random() * 50
                    );

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
                    this.bot.AddCard(this.heap.activeCards.pop()!);
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

                let additionalCard: Card | null = TryPushMoreCards();
                if (additionalCard !== null) {
                    while (additionalCard !== null) {
                        if (additionalCard !== null &&
                            ((deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5
                                || (deck.heap.discardIndex !== 0 && deck.heap.attackingCards < 6)))) {

                            if (deck.heap.TryAddAttackingCard(additionalCard!)) {
                                showCard(additionalCard!);
                                deck.bot.RemoveCard(additionalCard!);

                                for (const card of deck.heap.activeCards) {
                                    let cardItem = document.getElementById(`card${card.id}`)!;
                                    cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
                                    cardItem.addEventListener('mouseenter', (event) => ScaleCard(card, cardItem), true);
                                    cardItem.addEventListener('mouseleave', (event) => NormalizeCard(card, cardItem), true);
                                }

                                ArrangeCards(deck.bot.cards, false);
                                toggleActionButtonContext(true, 'Take');
                            }
                        }

                        additionalCard = TryPushMoreCards();
                    }
                    setTimeout(() => {
                        audioPlayer.Play('placed');

                        while (this.heap.activeCards.length > 0) {
                            this.player.AddCard(this.heap.activeCards.pop()!);
                        }

                        this.heap.attackingCards = 0;

                        this.TryPushPlayersCards();
                        toggleActionButton(false);
                        toggleBotsDecision(false);
                        UpdateInfoBox();


                        ArrangeCards(deck.player.cards, true);
                        ArrangeCards(deck.bot.cards, false);
                    }, 550);
                } else {
                    while (this.heap.activeCards.length > 0) {
                        this.player.AddCard(this.heap.activeCards.pop()!);
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
    shouldTake?: boolean;

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

    TryBeatCard(card: Card, trump: SuitName): Card | null | undefined {
        if (this.cards.filter(x => x.suit.type === card.suit.type)
            .filter(x => x.force > card.force).length !== 0) {

            return this.cards.filter(x => x.suit.type === card.suit.type)
                .filter(x => x.force > card.force)
                .sort(function (a, b) { return a.force - b.force })[0];
        }
        else if (card.suit.type !== trump.type &&
            this.cards.filter(x => x.suit.type === trump.type).length !== 0) {

            return this.cards.filter(x => x.suit.type === trump.type)
                .sort(function (a, b) { return a.force - b.force })[0];
        }

        return null;
    }

    ProcessCardToAttack(trump: SuitName): Card | null | undefined {
        if (this.cards.length > 0) {
            if (this.cards.filter(x => x.suit.type !== trump.type).length > 0) {
                return this.cards.filter(x => x.suit.type !== trump.type)
                    .sort(function (a, b) { return a.force - b.force })[0];
            }
            else return this.cards.sort(function (a, b) { return a.force - b.force })[0];
        }

        return null;
    }
}