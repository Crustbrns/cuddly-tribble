import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import classes from './createPerson.module.css';

const CreatePerson = function () {

    const { name, setName } = useState([]);
    const { surname, setSurname } = useState([]);
    const { family, setFamily } = useState([]);

    async function CreatePerson() {
        const article = {
            name: name,
            surname: surname,
            family: family
        };
        await axios.post('/createpeople', article);
    }

    return (
        <div>
            <div className='flex_content'>
                <input value={name} onInput={e => setName(e.target.value)} className={classes.input_box} name="name" type="text" class="form-control" placeholder="Name" aria-label="Name" />
                <input value={surname} onInput={e => setSurname(e.target.value)} className={classes.input_box} name="surname" type="text" class="form-control" placeholder="Surname" aria-label="Surname" />
                <input value={family} onInput={e => setFamily(e.target.value)} className={classes.input_box} name="family" type="text" class="form-control" placeholder="Family" aria-label="Family" />
            </div>
            <div onClick={CreatePerson} className={'button'}>Create</div>
        </div>
    )
}

export default CreatePerson;