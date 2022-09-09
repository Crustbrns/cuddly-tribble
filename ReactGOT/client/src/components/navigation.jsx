import React from 'react';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

const Navigation = function () {
    return (
        <div>
            <Link className='button' to="/people" end>Go to people section</Link>
        </div>
    )
}

export default Navigation;