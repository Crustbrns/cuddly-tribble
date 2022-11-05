const deck = new Deck();

function showCard(cardid: number): void {
    let cardItem = document.getElementById(`card${cardid}`)!;
    cardItem.classList.remove('back-side');
    cardItem.classList.add(deck.cards[cardid].GetSuitType());
    cardItem.title = deck.cards[cardid].GetSuitForce();
    cardItem.classList.add(deck.cards[cardid].suit.name);
}

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
        cardItem.style.zIndex = (35 - i).toString();

        let randdelay: number = Math.random() * 5;
        // cardItem.style.transform = `translateY(${i*40 + Math.floor(Math.random()*15)}%)`;
        cardItem.style.animationName = Math.random() > 0.5 ? 'shuffleleft' : 'shuffleright';
        cardItem.style.animationDelay = `0.${i * randdelay < 10 ? `0${Math.floor(i * randdelay)}` : Math.floor(i * randdelay)}s`;
        gameDeck?.appendChild(cardItem);

        cardItem.style.transform = `translateY(${i / 3.5}%)`;
    }

    setTimeout(() => {
        for (let i = 0; i < deck.cards.length; i++) {
            let cardItem = document.getElementById(`card${i}`)!;
            cardItem.style.transform = `translate(-500%,${10 - i / 2 > 0 ? (10 - i / 2) * -1 : 10 - i / 2}%)`
            cardItem.style.animationDelay = '';
            cardItem.style.animationName = '';
        }

        let cardItem = document.getElementById(`card0`)!;
        cardItem.style.zIndex = '0';

        showCard(0);
    }, 1400);

    setTimeout(() => {
        let cardItem = document.getElementById(`card0`)!;
        cardItem.style.zIndex = '0';
        cardItem.style.transform = `translate(-450%, -7%) rotate(${86 + Math.floor(Math.random() * 10)}deg)`;
    }, 2100);

    game?.appendChild(gameDeck);
}

window.onload = () => {
    start();
}
