import React from 'react';
import YarikImage from './Resources/Yarik.png';
import YarikBoostedImage from './Resources/YarikBoosted.png';
import TolikImage from './Resources/Tolik.png';
import TolikBoostedImage from './Resources/TolikBoosted.png';
import DropImage from './Resources/snowball.png';
import CoalImage from './Resources/coal.png';
import PillsImage from './Resources/pills.png';
import NeedleImage from './Resources/Шприц.png';
import ShavuhaImage from './Resources/Шавуха.png';
import ZohaImage from './Resources/Zoha.png';
import ZohaDeadImage from './Resources/ZohaDead.png';
import ZohaBoostedImage from './Resources/ZohaBoosted.png';
import ZohaHead from './Resources/ZohaHead.png';
import ZohaDeadHead from './Resources/ZohaDeadHead.png';
import ZohaBoostedHead from './Resources/ZohaBoostedHead.png';
import OdnorazkaImage from './Resources/odnorazka.png';
import UnityImage from './Resources/unity.png';
import BossImage from './Resources/Boss.png';
import BossBoostedImage from './Resources/BossBoosted.png';
import BossDefeatedImage from './Resources/BossDefeated.png';
import WinVideo from './Resources/Win.gif';
import Background from './Resources/Background.jpg';
import classes from './yarik.module.css';
import { DeadAnim, Game } from './logic';
import { GameRadio } from './radio';

import { saveResult } from './result';
import { Confetti, __esModule } from 'react-confetti-cannon';
import { getOdnorazka } from './odnorazka';
import Denchik from './Denchik/Denchik';

const Cookies = require('js-cookie');

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

    const [result, setResult] = React.useState([]);
    const [pos, setPos] = React.useState({ x: -55 });
    const [game, setGame] = React.useState(new Game([], [], [], 3000, 0, 0));
    const [movement, setMovement] = React.useState({ dirleft: false, dirright: false, shooting: false });
    const [reload, setReload] = React.useState({ time: 0 });
    const [name, setName] = React.useState(Cookies.get('user') === 'undefined' ? '' : Cookies.get('user'));
    let [isExploding, setIsExploding] = React.useState(false);

    React.useState(() => {
        document.body.addEventListener('keydown', (event) => Move(event, true));
        document.body.addEventListener('keyup', (event) => Move(event, false));
        document.body.style.overflow = 'hidden';

        getResults();
        CreateEnemy();
    });

    async function getResults() {
        await fetch('/results')
            .then(result => result.json())
            .then(result => setResult(result.result));
    }

    React.useEffect(() => {
        const Interval = setInterval(() => {
            if (!game.Over) {
                calcPos();
                game.UpdateDrops()
                game.UpdateBalls(pos)
                game.UpdateEnemies()
                game.UpdateBoss()
                game.UpdateAllies()
                game.RemoveLast()
                game.UpdateBonuses(pos)
                setGame(game);

                if (reload.time > 0)
                    setReload(--reload.time);
            }
            else {
                setIsExploding(isExploding, isExploding = game.getWinConditions());
            }
        }, 1);

        const TimeInterval = setInterval(() => {
            if (!game.Over && game.Started) {
                game.TimeAlive += 1;
                game.BusterTime > 0 ? game.BusterTime -= 1 : game.BusterTime = 0;
                game.TolikTime > 0 ? game.TolikTime -= 1 : game.TolikTime = 0;
                game.NeedleTime > 0 ? game.NeedleTime -= 1 : game.NeedleTime = 0;
                game.UpdateAlliesBoosters();
                setGame(game);
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
            else {
                if (game.Boss === null) {
                    setGame(game, game.BossInit());
                }
            }
        }
    }
    function calcPos() {
        let tempPos = pos;
        let leftBorder = - window.innerWidth / 2;
        let rightBorder = window.innerWidth / 2 - window.innerWidth * 0.05;

        if (movement.dirleft || movement.dirright || movement.shooting) {

            game.InitGame()
            GameRadio.InitRadio();

            if (movement.dirleft) {
                tempPos.x -= game.NeedleTime === 0 ? window.innerWidth / 300 : window.innerWidth / 200;
            }
            if (movement.dirright) {
                tempPos.x += game.NeedleTime === 0 ? window.innerWidth / 300 : window.innerWidth / 200;
            }
            if (movement.shooting && reload.time === 0) {
                game.addNewDrop({ x: tempPos.x + window.innerWidth * 0.01, y: window.innerHeight * 0.8 })
                setGame(game);
                setReload(reload.time = game.BusterTime === 0 ? 150 : 30);
            }
            setGame(game);
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
        if ((event.key === 'r' || event.key === 'к') && game.Over && truth && (document.activeElement.id !== null && document.activeElement.id !== 'nameInput')) {
            StartAgain();
        }
    }
    function StartAgain() {
        GameRadio.ToggleSomething();
        GameRadio.PlaySwitch();
        setGame(new Game([], [], [], 3000, 0, 0));
        game.Balls = [];
        game.Drops = [];
        game.Bonuses = [];
        game.Enemies = [];
        game.spawnTime = 3000;
        game.Points = 0;
        game.killedCount = 0;
        game.Started = false;
        game.Over = false;
        game.BulletsCount = 0;
        game.TimeAlive = 0;
        game.BusterTime = 0;
        game.TolikTime = 0;
        game.ShavuhaCount = 0;
        game.PillsCount = 0;
        game.UnityCount = 0;
        game.NeedlesCount = 0;
        game.OdnorazkaCount = 0;
        game.ZohaCount = 0;
        game.Win = false;
        game.Boss = null;
        game.NeedleTime = 0;
        game.Allies = [];
        setGame(game);
        pos.x = -55;
        setPos(pos);
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
        if (game.Over && game.Win) {
            return {
                backgroundImage: `url(${WinVideo})`
            };
        } else {
            return {
                backgroundImage: `url(${Background})`
            }
        }
    }

    function getBoss() {
        if (game.Boss !== null) {
            return <>
                <img style={{ transform: `translate(${game.Boss.pos.x}px)` }} className={`${classes.enemy} ${game.Boss.alive ? '' : classes.bossEnemy} ${game.Boss.alive ? '' : getDeadAnim(game.Boss)}`} src={game.Boss.hp > 200 ? BossImage : game.Boss.alive ? BossBoostedImage : BossDefeatedImage} />
                {game.NeedleTime > 0 && <img style={{ transform: `translate(${game.Boss.pos.x}px, ${window.innerHeight * 0.82}px)` }} className={`${classes.enemy} ${game.Boss.alive ? '' : classes.bossEnemy} ${game.Boss.alive ? '' : getDeadAnim(game.Boss)}`} src={game.Boss.hp > 200 ? BossImage : game.Boss.alive ? BossBoostedImage : BossDefeatedImage} />}
            </>
        }
    }

    function getBossHp() {
        if (game.Boss !== null) {
            return <div className={classes.barContainer}>
                <div className={classes.bossTitle}>Big Papa</div>
                <div className={classes.hpContainer}>
                    <div className={classes.hp} style={{ width: `${game.Boss.hp / 15}%`, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}></div>
                    <div className={classes.hpAbsence} style={{ width: `${100 - (game.Boss.hp / 15)}%` }}></div>
                </div>
            </div>
        }
    }

    function getBonusImage(item) {
        if (item.type === 'Pill') return PillsImage;
        else if (item.type === 'Shavuha') return ShavuhaImage;
        else if (item.type === 'Needle') return NeedleImage;
        else if (item.type === 'Unity') return UnityImage;
        else if (item.type === 'Zoha') return OdnorazkaImage;
        else return UnityImage;
    }

    function UpdateName(evt) {
        console.log('qwe');
        let tempname = evt.target.value;
        setName(tempname);
        Cookies.set('user', tempname);
    }

    function getAttempts() {
        return isNaN(parseInt(Cookies.get('attempts'))) ? 0 : parseInt(Cookies.get('attempts'));
    }

    return (
        <div style={getBack()} className={`${classes.container} ${game.Boss !== null ? classes.bossArived : ''}`}>
            <div className={classes.darkenLite}>
                <div className={getHints()}>
                    <div className={classes.keysColumnContainer}>
                        <div className={classes.keysRowContainer}>
                            <div className={classes.keybutton}>A</div>
                            <div className={classes.keybutton}>D</div>
                        </div>
                            <div className={classes.keysRowContainer}>
                            <div className={classes.keybutton + " " + classes.spase}>Spase</div>
                        </div>
                    </div>
                </div>
                <div className={`${classes.deadtitle} ${game.Over ? classes.show : classes.hide}`}>
                    <div className={classes.background}>
                        {game.Over && game.Win && <Confetti launchPoints={launchPoints} burstAmount={100} afterBurstAmount={30} />}
                        {game.Over && game.Win && <Confetti launchPoints={launchPoints2} burstAmount={100} afterBurstAmount={30} />}
                        <div style={{ marginBottom: '1vh' }}>{game.Win ? 'Ярик победил)' : 'Денчик выиграл)'}</div>
                        <input id={'nameInput'} style={{ marginBottom: '2vh' }} className={classes.input} value={name} onChange={event => UpdateName(event)} maxLength={20} placeholder='Введите имя, чтобы попасть в таблицу лидеров..' />
                        <div>Очки: <span className={classes.counter}>{game.Points}</span></div>
                        <div>Накормлено: <span className={classes.counter}>{game.killedCount}</span></div>
                        <div>Плюшечек: <span className={classes.counter}>{game.BulletsCount}</span></div>
                        <div>Шавух: <span className={classes.counter}>{game.ShavuhaCount}</span></div>
                        <div>Таблеток: <span className={classes.counter}>{game.PillsCount}</span></div>
                        <div>Шприцов: <span className={classes.counter}>{game.NeedlesCount}</span></div>
                        <div>Юнити: <span className={classes.counter}>{game.UnityCount}</span></div>
                        <div>Зох: <span className={classes.counter}>{game.ZohaCount}</span></div>
                        <div>Одноразок: <span className={classes.counter}>{game.OdnorazkaCount}</span></div>
                        <div>Попыток: <span className={classes.counter}>{getAttempts()}</span></div>
                        <div>Прожито: <span className={classes.counter}>{calcTimeAlive()}</span></div>
                        <div style={{ marginTop: '4vh' }} className={`${classes.keybutton}`}>R</div>
                    </div>
                </div>
                {game.Allies.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px` }} className={`${classes.zoha}  ${item.alive ? '' : getDeadAnim(item)}`} src={!item.alive ? ZohaDeadImage : item.BusterTime === 0 ? ZohaImage : ZohaBoostedImage} />
                })}
                <img style={{ transform: `translate(${pos.x}px)`, height: `calc(18%)`, width: `5%` }} className={`${classes.yarik} ${game.Over ? classes.gameOver : ''}`} alt='yarik' src={getPlayerImage()} />
                {game.Drops.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={item.type === 'Shishka' ? DropImage : item.type === 'Shavuha' ? ShavuhaImage : getOdnorazka(item.type)} />
                })}
                {game.Enemies.map((item, index) => {
                    return <Denchik key={`${item}${index}`} item={item} game={game} />
                })}

                <div className={classes.allies}>
                    {game.Allies.map((item, index) => {
                        return <>
                            <div key={index} className={classes.allyContainer}>
                                <img className={`${classes.allyImage} ${item.alive ? '' : classes.zohadead}`} src={!item.alive ? ZohaDeadHead : item.BusterTime === 0 ? ZohaHead : ZohaBoostedHead} />
                                <div className={classes.allyTitle}>
                                    <div className={classes.allyName}>Зоха</div>
                                    <div className={classes.allyHp}>
                                        <div className={classes.hpAlly} style={{ width: `${item.hp / 2.6}%`, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}></div>
                                        <div className={classes.hpAbsence} style={{ width: `${100 - (item.hp / 2.6)}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })}
                </div>
                {game.Balls.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={CoalImage} />
                })}
                {game.Bonuses.map((item, index) => {
                    return <img key={index} style={{ transform: `translate(${item.pos.x}px, ${item.pos.y}px)` }} className={classes.drop} src={getBonusImage(item)} />
                })}
                {getBoss()}
                {getBossHp()}
                <div className={classes.points}>{game.Points}</div>
            </div>
        </div>
    )
}

export default Yarik;