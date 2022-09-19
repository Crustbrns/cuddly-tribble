import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/categories/categories';

const DisplayWithHeader = function () {
    return (
        <>
            <div>
                <Header />
                <Outlet />
            </div>
        </>
    )
}

export default DisplayWithHeader;