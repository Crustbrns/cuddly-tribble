import React from 'react';
import { BrowserRouter as Router, Link, NavLink } from "react-router-dom";

const Navigation = function () {
    return (
        <div>
            <Link className='button' to="/people" end>Overview</Link>
            <Link className='button' to="/create" end>Create person</Link>
        </div>
    )
}

export default Navigation;