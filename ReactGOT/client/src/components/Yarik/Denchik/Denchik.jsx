import React from 'react';
import classes from './Denchik.module.css';

import EnemyImage from '../Resources/enemy_2.png';
import EnemyDeadImage from '../Resources/enemy-stuffed_2.png';
import { DeadAnim } from '../logic';

function getDeadAnim(enemy) {
    if (enemy.deadAnim === DeadAnim.Rotate) return classes.dead1;
    else if (enemy.deadAnim === DeadAnim.Scale) return classes.dead2;
    else if (enemy.deadAnim === DeadAnim.RotateReverse) return classes.dead3;
    else if (enemy.deadAnim === DeadAnim.Fade) return classes.dead4;
    else if (enemy.deadAnim === DeadAnim.ScaleUp) return classes.dead5;
    else return classes.dead4;
}

const Denchik = function (props) {
    return (
        <>
            <img style={{ transform: `translate(${props.item.pos.x}px` }} className={`${classes.enemy} ${props.item.alive ? '' : getDeadAnim(props.item)}`} src={props.item.alive ? EnemyImage : EnemyDeadImage} />
            {props.game.NeedleTime > 0 && <img style={{ transform: `translate(${props.item.pos.x - window.innerWidth * 0.05}px, ${window.innerHeight * 0.82}px` }} className={`${classes.enemy} ${props.item.alive ? '' : getDeadAnim(props.item)}`} src={props.item.alive ? EnemyImage : EnemyDeadImage} />}
        </>
    )
}

export default Denchik;