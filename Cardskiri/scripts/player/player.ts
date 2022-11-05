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