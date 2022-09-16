import { useState, useEffect } from 'react';
import classes from './people.module.css';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

function PeopleFetch(props) {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        getPeople();
    }, [])

    const getPeople = async () => {
        await fetch('/people')
            .then(result => result.json())
            .then(result => setPeople(result.characters));
    }

    function clearPeople() {
        setPeople([]);
    }

    function calcTime(index) {
        return `${((index + 1) * 0.1)*1.1}s`;
    }

    if (!people) {
        return <div>
            <div>Loading...</div>
        </div>
    }
    else if (people == null || people?.length <= 0) {
        return <div>
            <div>There is no characters</div>
            <div onClick={getPeople} className={'button'}>Update</div>
        </div>
    }

    return <div className='flex_content'>
        <div className={classes.content__container}>
            {people?.map((character, index) => {
                return <div className={classes.content + ' ' + classes.content_active} style={{ animationDuration: `${calcTime(index)}` }} key={character._id}>
                    <h2>{character.name} {character.surname} · {character.family}</h2>
                </div>
            })}
        </div>
        <div className='flex'>
            <div onClick={clearPeople} className={'button'}>Clear</div>
            <Link to="/" className={'button'}>Back to home</Link>
        </div>
    </div>
}

export default PeopleFetch;