
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

            let x = (event.x - window.innerWidth * 0.52) / window.innerWidth * 1920 + 30;
            let y = (event.y - window.innerHeight * 0.52) / window.innerHeight * 1080 - 40;
            if (y < 0 && deck.isFirstPlayerMoving && deck.bot.cards.length !== 0 && ((deck.heap.discardIndex === 0 && deck.heap.attackingCards < 5) || (deck.heap.discardIndex !== 0 && deck.heap.attackingCards < 6))) {
                if (deck.heap.TryAddAttackingCard(cardObject!)) {
                    audioPlayer.Play('placed');
                    let botcard = deck.bot.TryBeatCard(deck.player.cards.find(x => x.id === cardObject?.id)!, deck.trumps);
                    deck.player.cards.splice(deck.player.cards.findIndex(x => x.id === cardObject?.id), 1);

                    // console.log(botcard);
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
                    else {
                        deck.bot.shouldTake = true;
                        toggleBotsDecision(true, 'I take');
                        toggleActionButtonContext(true, 'Pass');
                    }
                }

                for (const card of deck.heap.activeCards) {
                    let cardItem = document.getElementById(`card${card.id}`)!;
                    cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
                }
            }
            else if (!deck.isFirstPlayerMoving) {
                let card = deck.heap.activeCards.filter(x => x.bundle === undefined).filter(x => deck.heap.activeCards.filter(y => y.bundle === x.id).length === 0)
                    .find(card => Intersects.boxPoint(card.position!.x! * 100 / 70 - 90, card.position!.y! * 140 / 45 - 20, 170, 200, x, y));

                // console.log(card);

                if (card !== undefined && ((card.suit.type === cardObject?.suit.type && card.force < cardObject.force)
                    || (card!.suit.type !== deck.trumps.type && cardObject?.suit.type == deck.trumps.type))) {

                    toggleActionButton(false);
                    audioPlayer.Play('placed');
                    cardObject!.position = new Position(card?.position?.x! + 14, card?.position?.y! + 9, card?.position?.angle! + 5);
                    cardObject!.bundle = card?.id;

                    let cardItem = document.getElementById(`card${cardObject?.id}`);
                    cardItem!.style.transform = `translate(${cardObject!.position!.x}%, ${cardObject!.position!.y}%) rotate(${cardObject?.position.angle}deg)`;
                    // cardItem!.style.transition = '.2s ease';

                    deck.heap.activeCards.push(cardObject!);
                    deck.player.RemoveCard(cardObject!);
                    ArrangeCards(deck.player.cards, true);

                    if (deck.player.cards.length === 0 && deck.cards.length === 0) {
                        makeAction();
                    }

                    let cardIndex = 1;
                    for (const card of deck.heap.activeCards) {
                        let cardItem = document.getElementById(`card${card.id}`)!;
                        cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
                        if (card.bundle !== undefined) {
                            cardItem.style.zIndex = `${cardIndex + 50}`;
                        }
                        else {
                            cardItem.style.zIndex = `${cardIndex}`;
                        }
                        cardIndex++;
                    }

                    BotAttackNext();
                    for (const card of deck.heap.activeCards) {
                        let cardItem = document.getElementById(`card${card.id}`)!;
                        cardItem.style.transform = `translate(${card.position!.x}%, ${card.position!.y}%) rotate(${card.position!.angle}deg)`;
                    }

                    // console.log('After bot attack');
                }
                else {
                    let cardItems = document.getElementsByClassName('bordered');
                    for (const card of cardItems) {
                        card.classList.remove('bordered');
                    }
                }
            }

            let cardsBordered = document.getElementsByClassName('bordered');
            for (const card of cardsBordered) {
                card.classList.remove('bordered');
            }
        }
        ArrangeCards(deck.player.cards, true);
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

        if (!deck.isFirstPlayerMoving) {
            for (const card of deck.heap.activeCards.filter(x => x.bundle === undefined)) {
                let intersected = Intersects.boxPoint(card.position!.x! * 100 / 70 - 90, card.position!.y! * 140 / 45 - 20, 170, 200, x, y);
                // console.log('card x', card.position!.x! * 100 / 70 - 70, 'card y', card.position!.y! * 140 / 45, `x:${x}, y${y}`, intersected);
                if (intersected && deck.heap.activeCards.filter(x => x.bundle === card.id).length === 0) {
                    let cardItem = document.getElementById(`card${card.id}`)!;
                    cardItem.classList.add('bordered');
                }
                else {
                    let cardItem = document.getElementById(`card${card.id}`)!;
                    cardItem.classList.remove('bordered');
                }
            }
        }
    }
}

function Resize(): void {
    let width: number = window.innerWidth!;
    let gameDoc = document.getElementById('container')!;
    gameDoc.style.scale = `${width / 1920}`;

    let guiDoc = document.getElementById('gui')!;
    guiDoc.style.scale = `${width / 1920}`;
}