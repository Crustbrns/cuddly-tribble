
window.onresize = (event) => {
    Resize();
}

window.onmousedown = (event) => {
    let item = document.elementFromPoint(event.x, event.y)!;
    if (item?.classList.contains('card') && deck.player.cards.findIndex(x => x.id === parseInt(item.id.slice(4))) !== -1) {
        item.classList.add('dragging');
        document.getElementsByTagName('html')[0].style.cursor = 'none';

        ArrangeCards(deck.player.cards.filter(x => x.id !== parseInt(item.id.slice(4))), true);
    }
    // console.log(item, deck.player.cards.findIndex(x => x.id === parseInt(item.id.slice(0, 4))), deck.player.cards);
}

window.onmouseup = (event) => {
    let draggings = document.getElementsByClassName('dragging');
    if (draggings.length > 0) {
        for (const item of draggings) {
            const elementId = document.getElementsByClassName('dragging')[0].id;
            const card = document.getElementById(elementId)!;
            const cardObject = deck.player.cards.find(x => x.id === parseInt(elementId.slice(4)))
            card!.style.transform = `translate(${cardObject!.position!.x}%, ${cardObject!.position!.y}%) rotate(${deck.player.cards.find(x => x.id === parseInt(elementId.slice(4)))!.position!.angle}deg)`;

            item.classList.remove('dragging');
            document.getElementsByTagName('html')[0].style.cursor = 'default';

            let y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
            if (y < 0 && deck.isFirstPlayerMoving && (deck.heap.discardIndex !== 0 || (deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5))) {
                if (deck.heap.TryAddAttackingCard(cardObject!)) {
                    audioPlayer.Play('placed');
                    let botcard = deck.bot.TryBeatCard(deck.player.cards.find(x => x.id === cardObject?.id)!, deck.trumps);
                    deck.player.cards.splice(deck.player.cards.findIndex(x => x.id === cardObject?.id), 1);

                    console.log(botcard);
                    if (!deck.bot.shouldTake) {
                        if (botcard !== null) {
                            timeoutbotbeat = setTimeout(() => {
                                audioPlayer.Play('placed');
                                showCard(botcard!);
                                botcard!.position = new Position(cardObject?.position?.x! + 14, cardObject?.position?.y! + 9, cardObject?.position?.angle! + 5);
                                botcard!.bundle = cardObject?.id;

                                let cardItem = document.getElementById(`card${botcard?.id}`);
                                cardItem!.style.transform = `translate(${botcard!.position!.x}%, ${botcard!.position!.y}%) rotate(${botcard?.position.angle}deg)`;
                                // cardItem!.style.transition = '.2s ease';

                                deck.heap.activeCards.push(botcard!);
                                deck.bot.RemoveCard(botcard!);
                                ArrangeCards(deck.bot.cards, false);
                                toggleActionButtonContext(true, 'Done');
                            }, 600);
                        }
                        else {
                            deck.bot.shouldTake = true;
                            toggleBotsDecision(true, 'I take');
                            toggleActionButtonContext(true, 'Pass');
                        }
                    }
                }

                for (const card of deck.heap.activeCards) {
                    let cardItem = document.getElementById(`card${card.id}`)!;
                    cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
                }
            }

            let cardNum: number = 0;
            for (const Card of deck.player.cards) {
                let cardItem = document.getElementById(`card${Card.id}`)!;

                Card.position = new Position(-10 * (deck.player.cards.length - 1) + (cardNum * 20),
                    130 - 6 * (cardNum < (deck.player.cards.length / 2) ? (deck.player.cards.length / 2 - ((deck.player.cards.length - cardNum) / 2)) : (((deck.player.cards.length - cardNum) - 1) / 2)),
                    -5 * (deck.player.cards.length - 1) + (cardNum++ * 10));

                cardItem.style.transform = `translate(${Card.position.x}%, ${Card.position.y}%) rotate(${Card.position.angle}deg)`;
            }
        }
    }
}

window.onmousemove = (event) => {
    if (document.getElementsByClassName('dragging').length !== 0) {
        const elementId = document.getElementsByClassName('dragging')[0].id;
        const card = document.getElementById(elementId)!;

        let x = (event.x - window.innerWidth * 0.52) / window.innerWidth * 1920 + 30;
        let y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
        let angle = Math.atan2(0 - x, 1500 - y);

        card!.style.transform = `translate(${x}px, ${y}px) rotate(${-(angle * 180 / Math.PI) / 2}deg)`;
        document.getElementsByTagName('html')[0].style.cursor = 'none';
    }
}

function Resize(): void {
    let width: number = window.innerWidth!;
    let gameDoc = document.getElementById('container')!;
    gameDoc.style.scale = `${width / 1920}`;

    let guiDoc = document.getElementById('gui')!;
    guiDoc.style.scale = `${width / 1920}`;
}