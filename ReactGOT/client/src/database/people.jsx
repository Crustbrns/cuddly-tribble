import { useState, useEffect } from 'react';
import classes from './people.module.css';

function PeopleFetch(props) {
    const [people, setPeople] = useState([]);

    const getPeople = async () => {
        await fetch('/people')
            .then(result => result.json())
            .then(result => setPeople(result.characters));
    }

    if (people.length <= 0) {
        return <div>
            <div>There is no characters</div>
            <div onClick={getPeople} className={classes.button}>Update</div>
        </div>
    }

    return <div>
        {people.map((character) => {
            return <div className={classes.content + ' ' + classes.content_active} key={character.id}>
                <h1>{character.name} {character.surname} {character.family}</h1>
            </div>
        })}
    </div>
}

export default PeopleFetch;