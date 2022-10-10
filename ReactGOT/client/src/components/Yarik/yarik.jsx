import React from 'react';
import YarikImage from './Yarik.png';
import classes from './yarik.module.css';

const Yarik = function () {
    const [pos, setPos] = React.useState({ x: -55 });

    React.useState(() => {
        document.body.addEventListener('keypress', (event) => Move(event));
        document.body.style.overflow = 'hidden';
    });

    React.useEffect(() => {
        console.log(pos, window.innerWidth);
    })

    function Move(event) {
        if (event.key === 'a') {
            setPos({ x: pos.x -= window.innerWidth/64 });
        }
        else if (event.key === 'd') {
            setPos({ x: pos.x += window.innerWidth/64 });
        }
    }

    return (
        <div className={classes.container}>
            <img style={{ transform: `translate(${pos.x}px)`, height: `calc(18%)`, width: `5%` }} className={classes.yarik} src={YarikImage} />
        </div> 
    )
}

export default Yarik;