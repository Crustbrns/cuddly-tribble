import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import classes from './goods.module.css';

const Goods = function () {
    const [goods, setGoods] = useState([]);
    const [category, setCategory] = useState(null);

    useEffect(() => {
        getGoods();
    });

    async function getGoods() {
        await fetch('/goods')
            .then(result => result.json())
            .then(result => setGoods(result.goods));

        console.log('request sent');
    }

    function clearGoods() {
        setGoods([]);
    }

    function changeCategory(categoryType) {
        setCategory(categoryType);
    }

    if (!goods) {
        return <div>
            <div>Loading...</div>
        </div>
    } else if (goods == null || goods?.length <= 0) {
        return <div>
            <div>There is no goods</div>
            <div onClick={getGoods} className={'button'}>Update</div>
        </div>
    }

    function cropText(text) {
        if (text.length > 200) {
            return text.slice(0, 200) + ' ..';
        }
        else return text;
    }

    function calcTime(index) {
        return `${((index + 1) * 0.15) * 1.1}s`;
    }

    return <div className='flex_content'>
        <div className={classes.header}>
            <div onClick={() => changeCategory(0)}>All</div>
            <div onClick={() => changeCategory(1)}>Food</div>
            <div onClick={() => changeCategory(2)}>Beverages</div>
            <div onClick={() => changeCategory(3)}>Weapon</div>
            <div onClick={() => changeCategory(4)}>Something else</div>
        </div>
        <div className={classes.content__container}>
            {goods?.filter(x=>x.category == category || category == 0).map((item, index) => {
                if (category == 0 || category == item.category) {
                    return <Link to={"/goods/" + item._id} end>
                        <div className={classes.content} style={{ animationDuration: `${calcTime(index)}` }} key={item._id}>
                            <span className={classes.content__general}>{item.title} · <span className={classes.item_price}>${item.price}</span></span>
                            <span id={classes.desc}> {cropText(item.description)}</span>
                            <span>category: {item.category}</span>
                            <div className={classes.img}><img className={classes.item_img} src={item.url} /></div>
                        </div>
                    </Link>
                }
            })}
        </div>
        <div className='flex'>
            <div onClick={clearGoods} className={'button'}>Clear</div>
            <Link to="/" className={'button'}>Back to home</Link>
        </div>
    </div>
}

export default Goods;