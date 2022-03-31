import React from 'react';
import { Outlet } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
    return (
        <div>
            <h1>This is Order Component</h1>
            <div className='foot'>
                <Outlet />
            </div>
        </div>
    );
};

export default Orders;