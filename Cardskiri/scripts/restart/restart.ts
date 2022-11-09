
function Restart(): void {
    HideInfoBox();
    for (const Card of deck.bot.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = `translate(0%, 0%) rotate(0deg)`;
    }
    for (const Card of deck.player.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = `translate(0%, 0%) rotate(0deg)`;
    }
    for (const Card of deck.cards) {
        let cardItem = document.getElementById(`card${Card.id}`)!;
        Card.position = new Position(0, 0, 0);
        cardItem.style.transform = `translate(0%, 0%) rotate(0deg)`;
    }
    timeoutSmoothCenter = setTimeout(() => {
        let cards = document.getElementsByClassName('card');
        while (cards.length > 0) {
            cards[0].parentNode!.removeChild(cards[0]);
        }
        let gameDeck = document.getElementById('container');
        gameDeck?.remove();

        start();
    }, 800);
}
function StrictRestart(): void {
    HideInfoBox();
    let cards = document.getElementsByClassName('card');
    while (cards.length > 0) {
        cards[0].parentNode!.removeChild(cards[0]);
    }
    let gameDeck = document.getElementById('container');
    gameDeck?.remove();

    clearTimeout(timeoutShuffle);
    clearTimeout(timeoutTrumpCard);
    clearTimeout(timeoutInitCards);
    clearTimeout(timeoutShowCards);
    clearTimeout(timeoutHideCard);
    clearTimeout(timeoutCenterCards);
    clearTimeout(timeoutRestart);
    clearTimeout(timeoutSmoothCenter);
    clearTimeout(timeoutStrictSmooth);

    start();
}
function StrictSmoothRestart(): void {
    HideInfoBox();

    clearTimeout(timeoutShuffle);
    clearTimeout(timeoutTrumpCard);
    clearTimeout(timeoutInitCards);
    clearTimeout(timeoutShowCards);
    clearTimeout(timeoutHideCard);
    clearTimeout(timeoutCenterCards);
    clearTimeout(timeoutRestart);
    clearTimeout(timeoutSmoothCenter);
    clearTimeout(timeoutStrictSmooth);
    clearTimeout(timeoutAccurateShuffle);
    clearTimeout(timeoutbotbeat);

    toggleActionButton(false);
    toggleBotsDecision(false, '...');

    deck.CardsToDeck();
    audioPlayer.Play('sweep');
    // console.log(deck.cards.length, deck);
    for (let i = 0; i < deck.cards.length; i++) {
        let cardItem = document.getElementById(`card${deck.cards[i].id}`)!;
        cardItem.style.transform = `translate(0, ${-40 + i / 3.5}%) rotate(${-10 + Math.floor(Math.random() * 20)}deg)`;
        cardItem.style.transition = `.4s ease`;
        cardItem.classList.add('no-shadow');
    }

    timeoutStrictSmooth = setTimeout(() => {
        for (let i = 0; i < deck.cards.length; i++) {
            let cardItem = document.getElementById(`card${deck.cards[i].id}`)!;
            cardItem.style.transform = `translate(0, ${-40 + i / 3.5}%) rotate(0deg)`;
            cardItem.style.transition = `.35s ease`;
        }
        timeoutAccurateShuffle = setTimeout(() => {
            let cards = document.getElementsByClassName('card');
            while (cards.length > 0) {
                cards[0].parentNode!.removeChild(cards[0]);
            }
            let gameDeck = document.getElementById('container');
            gameDeck?.remove();

            start();
        }, 400);
    }, 600);

    let winner = document.getElementById('winner');
    if (winner !== null) {
        winner.remove();
    }
}