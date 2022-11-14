function GuiInit(): void {
    var volumeButton = document.getElementById('btn-volume');
    volumeButton?.addEventListener('click', function () {
        audioPlayer.Toggle();
        if (audioPlayer.SoundsToggle) {
            volumeButton?.children[0].setAttribute('d', 'M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm11.008 2.093c.742.743 1.2 1.77 1.198 2.903-.002 1.133-.462 2.158-1.205 2.9l1.219 1.223c1.057-1.053 1.712-2.511 1.715-4.121.002-1.611-.648-3.068-1.702-4.125l-1.225 1.22zm2.142-2.135c1.288 1.292 2.082 3.073 2.079 5.041s-.804 3.75-2.096 5.039l1.25 1.254c1.612-1.608 2.613-3.834 2.616-6.291.005-2.457-.986-4.681-2.595-6.293l-1.254 1.25z');
        } else {
            volumeButton?.children[0].setAttribute('d', 'M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm15.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z');
        }
    })

    let restartButton = document.createElement('div');
    restartButton.textContent = 'Start again';
    restartButton.addEventListener('click', StrictSmoothRestart, true);
    restartButton.id = 'btn-restart';

    let infoLabel = document.createElement('div');
    infoLabel.id = 'btn-info';

    let actionButton = document.createElement('div');
    actionButton.textContent = '...';
    actionButton.addEventListener('click', makeAction, true);
    actionButton.id = 'btn-action';
    actionButton.classList.add('button');

    let gui = document.getElementById('gui');
    gui?.appendChild(restartButton);
    gui?.appendChild(infoLabel);
    gui?.appendChild(actionButton);
}

function GetDeckCardsInfo(): string {
    if (deck.cards.length > 0) {
        return `, ${deck.cards.length} cards left`
    }

    return '';
}

function GetTrumpType(trump: SuitName): string {
    if (trump.type === 0) return '♦';
    else if (trump.type === 1) return '♥';
    else if (trump.type === 2) return '♣';
    else if (trump.type === 3) return '♠';
    return '';
}

function UpdateInfoBox(): void {
    let infoLabel = document.getElementById('btn-info')!;
    infoLabel.textContent = `Trumps: ${deck.trumps.name} (${GetTrumpType(deck.trumps)}), ${deck.isFirstPlayerMoving ? 'you\'re attacker' : 'you\'re defender'}, it's ${deck.isFirstPlayerMoving ? 'your' : 'bot\'s'} turn now${GetDeckCardsInfo()}`;
    infoLabel.classList.add('visible');
}

function AlertInfoBox(): void {
    let infoLabel = document.getElementById('btn-info')!;
    infoLabel.textContent = `Trumps: ${deck.trumps.name}, no trumps detected in both hands, shuffle is required..`;
    infoLabel.classList.add('visible');
}

function HideInfoBox(): void {
    let infoLabel = document.getElementById('btn-info')!;
    infoLabel.classList.remove('visible');
}

function makeAction(): void {
    if (deck.TurnOver()) {
        let cardIndex = 0;
        audioPlayer.Play('shoved');
        for (const card of deck.heap.discardedCards) {
            let cardItem = document.getElementById(`card${card.id}`);
            cardItem!.style.transform = `translate(${card!.position!.x}%, ${card!.position!.y}%) rotate(${card!.position!.angle}deg)`;
            cardItem!.style.transition = '.5s ease-in-out';
            cardItem!.style.zIndex = `${cardIndex++}`;
            if (card.hidden === true) {
                hideCard(card);
            }
        }

        for (const card of deck.bot.cards) {
            hideCard(card);
            card.bundle = undefined;
        }

        for (const card of deck.player.cards) {
            card.bundle = undefined;
            showCard(card);

            let cardItem = document.getElementById(`card${card.id}`)!;
            cardItem.addEventListener('mouseenter', (event) => ScaleCard(card, cardItem), true);
            cardItem.addEventListener('mouseleave', (event) => NormalizeCard(card, cardItem), true);
        }

        ArrangeCards(deck.bot.cards, false);
        ArrangeCards(deck.player.cards, true);

        if (deck.cards.length === 0 &&
            (deck.bot.cards.length === 0
                || deck.player.cards.length === 0)) {

            if (deck.bot.cards.length === 0 && deck.player.cards.length === 0) {
                DisplayWinner('tie');
            }
            else if (deck.bot.cards.length === 0 && deck.player.cards.length !== 0) {
                DisplayWinner('bot');
            }
            else if (deck.bot.cards.length !== 0 && deck.player.cards.length === 0) {
                DisplayWinner('player');
            }
        }
        else {
            if (!deck.isFirstPlayerMoving) {
                // console.log('attacked');
                timeoutBotAttack = setTimeout(() => {
                    BotAttack();
                }, 1000);
            }
        }
    }
}

function DisplayWinner(player: string) {
    if (player === 'bot') {
        audioPlayer.Play('lose');
        let winner = document.createElement('div');
        winner.textContent = 'BOT WINS';
        winner.id = 'winner';

        let game = document.getElementById('game');
        game?.appendChild(winner);
    }
    else if (player === 'player') {
        audioPlayer.Play('win');
        let winner = document.createElement('div');
        winner.textContent = 'PLAYER WINS';
        winner.id = 'winner';

        let game = document.getElementById('game');
        game?.appendChild(winner);
    }
    else if (player === 'tie') {
        audioPlayer.Play('lose');
        let winner = document.createElement('div');
        winner.textContent = 'TIE';
        winner.id = 'winner';

        let game = document.getElementById('game');
        game?.appendChild(winner);
    }
}

function toggleActionButton(makeVisible: boolean) {
    let actionbtn = document.getElementById('btn-action');

    if (actionbtn !== null && makeVisible) {
        actionbtn?.classList.add('visible');
    }
    else {
        actionbtn?.classList.remove('visible');
        actionbtn!.textContent = '...';
    }
}

function toggleActionButtonContext(makeVisible: boolean, context: string) {
    let actionbtn = document.getElementById('btn-action');

    if (actionbtn !== null && makeVisible) {
        actionbtn?.classList.add('visible');
        actionbtn!.textContent = context;
    }
    else {
        actionbtn?.classList.remove('visible');
        actionbtn!.textContent = '...';
    }
}

function toggleBotsDecision(makeVisible: boolean, context?: string) {
    let botAction = document.getElementById('bot-action');
    let botActionDecision = document.getElementById('bot-action-decision');

    if (botAction !== null && botActionDecision !== null) {
        if (makeVisible && (context !== null && context !== undefined)) {
            botActionDecision.textContent = context!;
            if (!botAction.classList.contains('visible')) {
                audioPlayer.Play('alert');
            }
            botAction.classList.add('visible');
        }
        else {
            botActionDecision.textContent = '...';
            botAction.classList.remove('visible');
        }
    }
}