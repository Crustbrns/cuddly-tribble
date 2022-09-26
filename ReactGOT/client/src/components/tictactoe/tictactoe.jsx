import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import classes from './tictactoe.module.css';

const Moves = {
    PlayerOne: 1,
    PlayerTwo: 2
}

const TicTacToe = function () {
    const [currentPlayer, setCurrentPlayer] = React.useState(Moves.PlayerOne);

    function changePlayer() {
        setCurrentPlayer(currentPlayer == Moves.PlayerOne ? Moves.PlayerTwo : Moves.PlayerOne);
    }

    function makeMove(x, y) {
        console.log(`${x} ${y}`);
        let tile = document.getElementById(x * 3 + y);
        if (tile.textContent == '') {
            tile.textContent = currentPlayer == Moves.PlayerOne ? 'X' : 'O';
            changePlayer();
            checkWin();
        }
    }

    function checkWin() {
        let res = document.getElementsByClassName(classes.tile);

        if (res[0].textContent != '' && res[0].textContent == res[1].textContent && res[0].textContent == res[2].textContent) DisplayWin(res[0].textContent);
        else if (res[3].textContent != '' && res[3].textContent == res[4].textContent && res[3].textContent == res[5].textContent) DisplayWin(res[3].textContent);
        else if (res[6].textContent != '' && res[6].textContent == res[7].textContent && res[6].textContent == res[8].textContent) DisplayWin(res[6].textContent);

        else if (res[0].textContent != '' && res[0].textContent == res[3].textContent && res[0].textContent == res[6].textContent) DisplayWin(res[0].textContent);
        else if (res[1].textContent != '' && res[1].textContent == res[4].textContent && res[1].textContent == res[7].textContent) DisplayWin(res[1].textContent);
        else if (res[2].textContent != '' && res[2].textContent == res[5].textContent && res[2].textContent == res[8].textContent) DisplayWin(res[2].textContent);

        else if (res[0].textContent != '' && res[0].textContent == res[4].textContent && res[0].textContent == res[8].textContent) DisplayWin(res[0].textContent);
        else if (res[6].textContent != '' && res[6].textContent == res[4].textContent && res[6].textContent == res[2].textContent) DisplayWin(res[6].textContent);

        else if (res[0].textContent != '' && res[1].textContent != '' && res[2].textContent != '' && res[3].textContent != ''
            && res[4].textContent != '' && res[5].textContent != '' && res[6].textContent != '' && res[7].textContent != ''
            && res[8].textContent != '') DisplayWin('tie');
    }

    function DisplayWin(player) {
        let title = document.getElementById(classes.title);
        title.textContent = `Game over, winner is ${player == 'X' ? 'Player 1' : 'Player 2'}`;
        if (player == 'tie') title.textContent = 'Tie';
    }

    function createField() {
        const rows = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rows.push(<div id={i * 3 + j} onClick={() => makeMove(i, j)} className={classes.tile}></div>);
            }
        }
        return rows;
    }
    return (
        <div className={classes.container}>
            <div>
                <div id={classes.title}>
                    tictactoe
                </div>
                <div id={classes.tictactoe}>
                    {createField()}
                </div>
                <Link to="/" end>
                    <div className={`${classes.nav} button`}>Go back</div>
                </Link>
            </div>
        </div>
    );
}

export default TicTacToe;