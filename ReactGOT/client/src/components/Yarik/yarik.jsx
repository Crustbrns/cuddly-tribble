import React from 'react';
import YarikImage from './Resources/Yarik.png';
import DropImage from './Resources/Шишка.png';
import EnemyImage from './Resources/enemy.png';
import EnemyDeadImage from './Resources/enemy-stuffed.png';
import classes from './yarik.module.css';
import { addNewDrop, Game, UpdateDrops } from './logic';

const Yarik = function () {
    const [pos, setPos] = React.useState({ x: -55 });
    const [game, setGame] = React.useState(new Game([], []));
    const [movement, setMovement] = React.useState({ dirleft: false, dirright: false });

    React.useState(() => {
        document.body.addEventListener('keydown', (event) => Move(event, true));
        document.body.addEventListener('keyup', (event) => Move(event, false));
        document.body.style.overflow = 'hidden';
    });

    React.useEffect(() => {
        console.log(pos, window.innerWidth);

        const CreateEnemyInterval = setInterval(() => {
            game.addNewEnemy();
            setGame((game) => new Game(game.Drops, game.Enemies));
        }, 3000);

        const Interval = setInterval(() => {
            calcPos();
            if (movement.dirleft || movement.dirright) calcPos();
            game.UpdateDrops();
            game.UpdateEnemies();
            game.RemoveLast();
            setGame((game) => new Game(game.Drops, game.Enemies));
        }, 1);

        return function stopTimer() {
            clearInterval(Interval);
            clearInterval(CreateEnemyInterval);
        }
    }, [])

    function calcPos(event) {
        // console.log('asd');
        let tempPos = pos;
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (event !== undefined) {
            if (event.code === 'Space') {
                setGame(game, game.addNewDrop({ x: tempPos.x + window.innerWidth * 0.01, y: window.innerHeight * 0.8 }));
            }
        }
        if (movement.dirleft) {
            tempPos.x -= window.innerWidth / 600;
        }
        if (movement.dirright) {
            tempPos.x += window.innerWidth / 600;
        }

        if (tempPos.x < leftBorder) tempPos.x = leftBorder;
        else if (tempPos.x > rightBorder) tempPos.x = rightBorder;

        setPos({ x: tempPos.x });
    }


    function Move(event, truth) {
        if (event.key === 'a' || event.key === 'ф') {
            setMovement(movement.dirleft = truth);
        }
        if (event.key === 'd' || event.key === 'в') {
            setMovement(movement.dirright = truth );
        }
        if (event.code === 'Space') {
            calcPos(event);
        }
    }

    return (
        <div className={classes.container}>
            <img style={{ transform: `translate(${pos.x}px)`, height: `calc(18%)`, width: `5%` }} className={classes.yarik} alt='yarik' src={YarikImage} />
            {game.Drops.map((item, index) => {
                return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={DropImage} />
            })}
            {game.Enemies.map((item, index) => {
                return <img key={index} style={{ transform: `translate(${item.pos.x}px` }} className={classes.enemy} src={EnemyImage} />
            })}
        </div>
    )
}

export default Yarik;