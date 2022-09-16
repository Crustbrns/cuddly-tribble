import { ClassNames } from '@emotion/react';
import React from 'react';
import { BrowserRouter as Router, Link, useParams } from 'react-router-dom';
import classes from './item.module.css';

const Item = function () {

    const [item, setItem] = React.useState(null);
    const { _id } = useParams();

    async function getItem() {
        console.log(`/goods/${_id}`);

        await fetch(`/goods/${_id}`)
            .then(result => result.json())
            .then(result => setItem(result.item));

    }

    React.useState(() => {
        getItem();
    }, null);

    return (
        <div className='flex_content'>
            {item ?
                <div className={`flex ${classes.container}`}>
                    <div className={classes.image_container}>
                    <img src={item.url} className={classes.image} />
                    </div>
                    <div className={classes.additional}>
                        <p>Title: {item.title}</p>
                        <p>Price: {item.price}</p>
                        <p className={classes.description}>{item.description}</p>
                    </div>
                </div> : "Loading"}
            <div>
                {/* <img src={item.url} />
                {item ? item.title : "Loading"} */}
            </div>
            <div className='flex'>
                <Link to="/" className={'button'}>Back to home</Link>
            </div>
        </div >
    )
}

export default Item;