import React from 'react';
import YarikImage from './Yarik.png';
import DropImage from './drop.png';
import classes from './yarik.module.css';
import { addNewDrop, Game } from './logic';

const Yarik = function () {
    const [pos, setPos] = React.useState({ x: -55 });
    const [ammo, setAmmo] = React.useState([]);

    React.useState(() => {
        document.body.addEventListener('keypress', (event) => Move(event));
        document.body.style.overflow = 'hidden';
    });

    React.useEffect(() => {
        console.log(pos, window.innerWidth);
        calcPos();
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
            if(event.code === 'Space'){
                // tempPos.x += window.innerWidth / 48;
                addNewDrop({x: tempPos.x, y: window.innerHeight });
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

    function GetDrops() {
        let output = [];
        let index = 0;
        for (const item of Game.Drops) {
            output.push(<img key={index++} style={{transform: `translate(${item.pos.x}px, ${item.pos.y}px)`}} className={classes.drop} src={DropImage}/>);
        }
        return output;
    }

    return (
        <div className={classes.container}>
            <img style={{ transform: `translate(${pos.x}px)`, height: `calc(18%)`, width: `5%` }} className={classes.yarik} alt='yarik' src={YarikImage} />
            {GetDrops()}
        </div>
    )
}

export default Yarik;