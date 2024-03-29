import React from 'react';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";
import ClickComponent from '../ClickComponent/clickComponent';
import classes from './navigation.module.css';

const Navigation = function () {
    return (
        <div>
            <div className='flex'>
                <div className={classes.get__navs}>
                    <Link to="/people" end>
                        <div className='button'>People overview</div>
                    </Link>

                    <Link to="/goods" end>
                        <div className='button'>Goods overview</div>
                    </Link>
                </div>
            </div>

            <div className={classes.get__navs}>
                <Link to="/yarik" end>
                    <div className='button'>Yarik</div>
                </Link>
                <Link to="/tictactoe" end>
                    <div className='button'>Tictactoe</div>
                </Link>
            </div >
        </div >
    )
}

export default Navigation;