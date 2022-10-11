import React from 'react';
import YarikImage from './Resources/Yarik.png';
import DropImage from './Resources/Шишка.png';
import EnemyImage from './Resources/enemy.png';
import EnemyDeadImage from './Resources/enemy-stuffed.png';
import classes from './yarik.module.css';
import { addNewDrop, DeadAnim, Game, UpdateDrops } from './logic';

const Yarik = function () {
    const [pos, setPos] = React.useState({ x: -55 });
    const [game, setGame] = React.useState(new Game([], [], 3000));
    const [movement, setMovement] = React.useState({ dirleft: false, dirright: false });

    React.useState(() => {
        document.body.addEventListener('keydown', (event) => Move(event, true));
        document.body.addEventListener('keyup', (event) => Move(event, false));
        document.body.style.overflow = 'hidden';
        CreateEnemy();
    });

    async function CreateEnemy() {
        game.addNewEnemy();
        game.ChangeDelay();

        setGame((game) => new Game(game.Drops, game.Enemies, game.spawnTime));

        setTimeout(async function () {
            await CreateEnemy();
        }, game.spawnTime);
    }

    React.useEffect(() => {
        console.log(pos, window.innerWidth);

        // const CreateEnemyInterval = setInterval(() => {
        //     game.addNewEnemy();
        //     game.spawnTime -= 300;
        //     setGame((game) => new Game(game.Drops, game.Enemies, game.spawnTime));
        //     setTime(time.delay = time.delay - 300);
        //     console.log(time.delay);
        // }, time.delay);

        const Interval = setInterval(() => {
            calcPos();
            if (movement.dirleft || movement.dirright) calcPos();
            game.UpdateDrops();
            game.UpdateEnemies();
            game.RemoveLast();
            setGame((game) => new Game(game.Drops, game.Enemies, game.spawnTime));
        }, 1);

        return function stopTimer() {
            clearInterval(Interval);
            // clearInterval(CreateEnemyInterval);
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

    function getDeadAnim(enemy) {
        if (enemy.deadAnim === DeadAnim.Rotate) return classes.dead1;
        else if (enemy.deadAnim === DeadAnim.Scale) return classes.dead2;
        else if (enemy.deadAnim === DeadAnim.RotateReverse) return classes.dead3;
        else if (enemy.deadAnim === DeadAnim.Fade) return classes.dead4;
        else return classes.dead4;
    }

    function Move(event, truth) {
        if (event.key === 'a' || event.key === 'ф') {
            setMovement(movement.dirleft = truth);
        }
        if (event.key === 'd' || event.key === 'в') {
            setMovement(movement.dirright = truth);
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
                return <img key={index} style={{ transform: `translate(${item.pos.x}px` }} className={`${classes.enemy} ${item.alive ? '' : getDeadAnim(item)}`} src={item.alive ? EnemyImage : EnemyDeadImage} />
            })}
        </div>
    )
}

export default Yarik;