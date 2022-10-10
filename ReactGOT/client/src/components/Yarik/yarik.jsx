import React from 'react';
import YarikImage from './Yarik.png';
import DropImage from './Шишка.png';
import classes from './yarik.module.css';
import { addNewDrop, Game, UpdateDrops } from './logic';

const Yarik = function () {
    const [pos, setPos] = React.useState({ x: -55 });
    const [game, setGame] = React.useState(new Game([]));

    React.useState(() => {
        document.body.addEventListener('keypress', (event) => Move(event));
        document.body.style.overflow = 'hidden';
    });

    React.useEffect(() => {
        console.log(pos, window.innerWidth);
        calcPos();

        const Interval = setInterval(() => {
            // setStatus((status) => changeStatus(status));
            game.UpdateDrops();
            game.RemoveLast();
            setGame((game) => new Game(game.Drops));
        }, 50);

        return function stopTimer() {
            clearInterval(Interval);
        }
    }, [])

    function calcPos(event) {
        let tempPos = pos;
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (event !== undefined) {
            if (event.key === 'a' || event.key === 'ф') {
                tempPos.x -= window.innerWidth / 48;
            }
            else if (event.key === 'd' || event.key === 'в') {
                tempPos.x += window.innerWidth / 48;
            }
            if (event.code === 'Space') {
                // tempPos.x += window.innerWidth / 48;
                setGame(game, game.addNewDrop({ x: tempPos.x + window.innerWidth * 0.01, y: window.innerHeight * 0.8 }));
            }
        }

        if (tempPos.x < leftBorder) tempPos.x = leftBorder;
        else if (tempPos.x > rightBorder) tempPos.x = rightBorder;

        setPos({ x: tempPos.x });
    }


    function Move(event) {
        if (event.key === 'a' || event.key === 'd' || event.key === 'ф' || event.key === 'в' || event.code === 'Space') {
            calcPos(event);
        }
    }

    return (
        <div className={classes.container}>
            <img style={{ transform: `translate(${pos.x}px)`, height: `calc(18%)`, width: `5%` }} className={classes.yarik} alt='yarik' src={YarikImage} />
            {game.Drops.map((item, index) => {
                return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={DropImage} />
            })}
        </div>
    )
}

export default Yarik;