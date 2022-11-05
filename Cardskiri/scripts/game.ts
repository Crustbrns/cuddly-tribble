const deck = new Deck();


function start() {
    console.log(deck);
    let game = document.getElementById('game');
    let gameDeck = document.createElement('div');
    gameDeck.id = 'container'
    for (let i = 0; i < deck.cards.length; i++) {
        let cardItem = document.createElement('div');
        cardItem.classList.add('card');
        cardItem.classList.add('back-side');
        cardItem.id = `card${i}`
        cardItem.style.zIndex = i.toString();

        let randdelay: number = Math.random() * 3;
        console.log(i * randdelay);
        cardItem.style.transform = `translateY(-${i / 2}%)`
        cardItem.style.animationDelay = `0.${i * randdelay < 10 ? `0${Math.floor(i * randdelay)}` : Math.floor(i * randdelay)}s`;
        gameDeck?.appendChild(cardItem);
    }

    setTimeout(() => {
        for (let i = 0; i < deck.cards.length; i++) {
            let cardItem = document.getElementById(`card${i}`)!;
            cardItem.style.transform = `translate(-500%,-${i / 2}%)`
        }
        
        let cardItem = document.getElementById(`card0`)!;
        cardItem.classList.remove('back-side');
        cardItem.classList.add(deck.cards[0].GetSuitType());
        
        let cardItem1 = document.getElementById(`card35`)!;
        cardItem1.classList.remove('back-side');
        cardItem1.classList.add(deck.cards[35].GetSuitType());
    }, 1400);

    setTimeout(() => {
        let cardItem = document.getElementById(`card0`)!;
        cardItem.style.transform = `translate(-450%, -7%) rotate(${86 + Math.floor(Math.random() * 10)}deg)`;
    }, 2100);

    game?.appendChild(gameDeck);
}

window.onload = () => {
    start();
}
