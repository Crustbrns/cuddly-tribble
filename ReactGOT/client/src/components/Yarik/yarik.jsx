import React from 'react';
import YarikImage from './Resources/Yarik.png';
import YarikBoostedImage from './Resources/YarikBoosted.png';
import TolikImage from './Resources/Tolik.png';
import TolikBoostedImage from './Resources/TolikBoosted.png';
import DropImage from './Resources/Шишка.png';
import BallImage from './Resources/ball.png';
import PillsImage from './Resources/pills.png';
import ShavuhaImage from './Resources/Шавуха.png';
import EnemyImage from './Resources/enemy.png';
import EnemyDeadImage from './Resources/enemy-stuffed.png';
import WinVideo from './Resources/Win.gif';
import classes from './yarik.module.css';
import { DeadAnim, Game } from './logic';
import { GameRadio } from './radio';

import { Confetti, __esModule } from 'react-confetti-cannon';

const Yarik = function () {
    const launchPoints = React.useMemo(
        () => [
            () => ({
                x: window.innerWidth,
                y: window.innerHeight,
                angle: 0.8,
            }),
        ],
        []
    )
    const launchPoints2 = React.useMemo(
        () => [
            () => ({
                x: 0,
                y: window.innerHeight,
                angle: -0.8,
            }),
        ],
        []
    )

    const [pos, setPos] = React.useState({ x: -55 });
    const [game, setGame] = React.useState(new Game([], [], [], 3000, 0, 0));
    const [movement, setMovement] = React.useState({ dirleft: false, dirright: false, shooting: false });
    const [reload, setReload] = React.useState({ time: 0 });
    let [isExploding, setIsExploding] = React.useState(false);

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
                setGame(game, game.UpdateBonuses(pos));
                setGame(game, game.BusterTime = game.BusterTime);
                setGame(game, game.TolikTime = game.TolikTime);

                if (reload.time > 0)
                    setReload(reload.time = reload.time - 1);
            }
            else {
                setIsExploding(isExploding, isExploding = game.getWinConditions());
                console.log(isExploding);
            }
        }, 1);

        const TimeInterval = setInterval(() => {
            if (!game.Over && game.Started) {
                setGame(game, game.TimeAlive += 1);
                setGame(game, game.BusterTime > 0 ? game.BusterTime -= 1 : game.BusterTime = 0);
                setGame(game, game.TolikTime > 0 ? game.TolikTime -= 1 : game.TolikTime = 0);
            }
        }, 1000);

        return function stopTimer() {
            clearInterval(Interval);
            clearInterval(TimeInterval);
        }
    }, [])

    function CreateEnemy() {
        if (!game.Over) {
            if (game.Points < 30000) {
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
                setReload(reload.time = game.BusterTime === 0 ? 150 : 30);
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
        else if (enemy.deadAnim === DeadAnim.ScaleUp) return classes.dead5;
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
        if ((event.key === 'r' || event.key === 'к') && game.Over && truth) {
            StartAgain();
        }
    }
    function StartAgain() {
        GameRadio.ToggleSomething();
        GameRadio.PlaySwitch();
        setGame(new Game([], [], [], 3000, 0, 0));
        setGame(game, game.Balls = []);
        setGame(game, game.Drops = []);
        setGame(game, game.Bonuses = []);
        setGame(game, game.Enemies = []);
        setGame(game, game.spawnTime = 3000);
        setGame(game, game.Points = 0);
        setGame(game, game.killedCount = 0);
        setGame(game, game.Started = false);
        setGame(game, game.Over = false);
        setGame(game, game.BulletsCount = 0);
        setGame(game, game.TimeAlive = 0);
        setGame(game, game.BusterTime = 0);
        setGame(game, game.TolikTime = 0);
        setGame(game, game.ShavuhaCount = 0);
        setGame(game, game.PillsCount = 0);
        setGame(game, game.Win = false);
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

    function getPlayerImage() {
        if (game.TolikTime === 0) {
            return game.BusterTime === 0 ? YarikImage : YarikBoostedImage;
        }
        else {
            return game.BusterTime === 0 ? TolikImage : TolikBoostedImage;
        }
    }

    function getBack() {
        const styles = {
            backgroundImage: `url(${WinVideo})`
        }
        if (game.Over && game.Win) {
            return styles;
        }
        return null;
    }

    return (
        <div style={getBack()} className={`${classes.container} ${game.Points > 10 ? classes.bossArived : ''}`}>
            <div className={classes.darken}>
                <div className={getHints()}>
                    <div className={classes.keysContainer}>
                        <div className={classes.keybutton}>A</div>
                        <div className={classes.keybutton}>D</div>
                    </div>
                </div>
                <div className={`${classes.deadtitle} ${game.Over ? classes.show : ''}`}>
                    <div className={classes.background}>
                        {game.Over && game.Win && <Confetti launchPoints={launchPoints} burstAmount={100} afterBurstAmount={30} />}
                        {game.Over && game.Win && <Confetti launchPoints={launchPoints2} burstAmount={100} afterBurstAmount={30} />}
                        <div style={{ marginBottom: '2vh' }}>{game.Win ? 'Ярик победил)' : 'Денчик выиграл)'}</div>
                        <div>Очки: <span className={classes.counter}>{game.Points}</span></div>
                        <div>Накормлено: <span className={classes.counter}>{game.killedCount}</span></div>
                        <div>Плюшечек: <span className={classes.counter}>{game.BulletsCount}</span></div>
                        <div>Шавух: <span className={classes.counter}>{game.ShavuhaCount}</span></div>
                        <div>Таблеток: <span className={classes.counter}>{game.PillsCount}</span></div>
                        <div>Прожито: <span className={classes.counter}>{calcTimeAlive()}</span></div>
                        <div style={{ marginTop: '4vh' }} className={`${classes.keybutton}`}>R</div>
                        {/* <div className={classes.button} onClick={StartAgain}>Начать заново</div> */}
                    </div>
                </div>
                <img style={{ transform: `translate(${pos.x}px)`, height: `calc(18%)`, width: `5%` }} className={`${classes.yarik} ${game.Over ? classes.gameOver : ''}`} alt='yarik' src={getPlayerImage()} />
                {game.Drops.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={item.type === 'Shishka' ? DropImage : ShavuhaImage} />
                })}
                {game.Enemies.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px` }} className={`${classes.enemy} ${item.alive ? '' : getDeadAnim(item)}`} src={item.alive ? EnemyImage : EnemyDeadImage} />
                })}
                {game.Balls.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={BallImage} />
                })}
                {game.Bonuses.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={item.type == 'Pill' ? PillsImage : ShavuhaImage} />
                })}
                <div className={classes.points}>{game.Points}</div>
            </div>
        </div>
    )
}

export default Yarik;