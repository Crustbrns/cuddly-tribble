import React from 'react';
import YarikImage from './Resources/Yarik.png';
import YarikBoostedImage from './Resources/YarikBoosted.png';
import DropImage from './Resources/Шишка.png';
import BallImage from './Resources/ball.png';
import PillsImage from './Resources/pills.png';
import EnemyImage from './Resources/enemy.png';
import EnemyDeadImage from './Resources/enemy-stuffed.png';
import classes from './yarik.module.css';
import { DeadAnim, Game } from './logic';
import { GameRadio } from './radio';

const Yarik = function () {
    const [pos, setPos] = React.useState({ x: -55 });
    const [game, setGame] = React.useState(new Game([], [], [], 3000, 0, 0));
    const [movement, setMovement] = React.useState({ dirleft: false, dirright: false, shooting: false });
    const [reload, setReload] = React.useState({ time: 0 });

    React.useState(() => {
        document.body.addEventListener('keydown', (event) => Move(event, true));
        document.body.addEventListener('keyup', (event) => Move(event, false));
        document.body.style.overflow = 'hidden';
        CreateEnemy();
    });
    React.useEffect(() => {
        const Interval = setInterval(() => {
            if (!game.Over) {
                calcPos();
                setGame(game, game.UpdateDrops());
                setGame(game, game.UpdateBalls(pos));
                setGame(game, game.UpdateEnemies());
                setGame(game, game.RemoveLast());
                setGame(game, game.UpdatePills(pos));
                setGame(game, game.Balls = game.Balls);
                setGame(game, game.BulletsCount = game.BulletsCount);
                setGame(game, game.BusterTime = game.BusterTime);

                if (reload.time > 0)
                    setReload(reload.time = reload.time - 1);
            }
        }, 1);

        const TimeInterval = setInterval(() => {
            if (!game.Over && game.Started) {
                setGame(game, game.TimeAlive += 1);
                setGame(game, game.BusterTime > 0 ? game.BusterTime -= 1 : game.BusterTime = 0);
            }
        }, 1000);

        return function stopTimer() {
            clearInterval(Interval);
            clearInterval(TimeInterval);
        }
    }, [])

    function CreateEnemy() {
        if (!game.Over) {
            if (game.Started) {
                if (game.Enemies.length < 12) {
                    game.addNewEnemy();
                    game.ChangeDelay();
                    setGame(game, game.Enemies = game.Enemies);
                    setGame(game, game.spawnTime = game.spawnTime);
                }
            }

            setTimeout(function () {
                CreateEnemy();
            }, game.spawnTime);
        }
    }
    function calcPos() {
        let tempPos = pos;
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (movement.dirleft || movement.dirright || movement.shooting) {

            if (movement.dirleft) {
                GameRadio.InitRadio();
                setGame(game, game.InitGame());
                tempPos.x -= window.innerWidth / 300;
            }
            if (movement.dirright) {
                GameRadio.InitRadio();
                setGame(game, game.InitGame());
                tempPos.x += window.innerWidth / 300;
            }
            if (movement.shooting && reload.time == 0) {
                setGame(game, game.addNewDrop({ x: tempPos.x + window.innerWidth * 0.01, y: window.innerHeight * 0.8 }));
                setReload(reload.time = game.BusterTime === 0 ? 150 : 25);
            }
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
            setMovement(movement.shooting = truth);
        }
        if (event.key === 'r' && game.Over && truth) {
            StartAgain();
        }
    }
    function StartAgain() {
        GameRadio.PlaySwitch();
        setGame(new Game([], [], [], 3000, 0, 0));
        setGame(game, game.Balls = []);
        setGame(game, game.Drops = []);
        setGame(game, game.Pills = []);
        setGame(game, game.Enemies = []);
        setGame(game, game.spawnTime = 3000);
        setGame(game, game.Points = 0);
        setGame(game, game.killedCount = 0);
        setGame(game, game.Started = false);
        setGame(game, game.Over = false);
        setGame(game, game.BulletsCount = 0);
        setGame(game, game.TimeAlive = 0);
        setGame(game, game.BusterTime = 0);
        setPos(pos, pos.x = -55);
        CreateEnemy();
    }

    function getHints() {
        if (!game.Started) return classes.hintContainer;
        else return `${classes.hintContainer + ' ' + classes.fade}`;
    }

    function calcTimeAlive() {
        if (game.TimeAlive < 60) return `${game.TimeAlive} сек.`;
        else return `${Math.floor(game.TimeAlive / 60)} мин ${game.TimeAlive % 60} сек.`
    }

    return (
        <div className={classes.container}>
            <div className={getHints()}>
                <div className={classes.keysContainer}>
                    <div className={classes.keybutton}>A</div>
                    <div className={classes.keybutton}>D</div>
                </div>
            </div>
            <div className={`${classes.deadtitle} ${game.Over ? classes.show : ''}`}>
                <div style={{ marginBottom: '2vh' }}>Денчик выиграл)</div>
                <div>Очки: <span className={classes.counter}>{game.Points}</span></div>
                <div>Накормлено: <span className={classes.counter}>{game.killedCount}</span></div>
                <div>Плюшечек: <span className={classes.counter}>{game.BulletsCount}</span></div>
                <div>Прожито: <span className={classes.counter}>{calcTimeAlive()}</span></div>
                <div style={{ marginTop: '4vh' }} className={`${classes.keybutton}`}>R</div>
                {/* <div className={classes.button} onClick={StartAgain}>Начать заново</div> */}
            </div>
            <img style={{ transform: `translate(${pos.x}px)`, height: `calc(18%)`, width: `5%` }} className={`${classes.yarik} ${game.Over ? classes.gameOver : ''}`} alt='yarik' src={game.BusterTime === 0 ? YarikImage : YarikBoostedImage} />
            {game.Drops.map((item, index) => {
                return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={DropImage} />
            })}
            {game.Enemies.map((item, index) => {
                return <img key={index} style={{ transform: `translate(${item.pos.x}px` }} className={`${classes.enemy} ${item.alive ? '' : getDeadAnim(item)}`} src={item.alive ? EnemyImage : EnemyDeadImage} />
            })}
            {game.Balls.map((item, index) => {
                return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={BallImage} />
            })}
            {game.Pills.map((item, index) => {
                return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={PillsImage} />
            })}
            <div className={classes.points}>{game.Points}</div>
        </div>
    )
}

export default Yarik;