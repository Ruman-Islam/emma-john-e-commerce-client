import React from 'react';
import { Outlet } from 'react-router-dom';
import './Inventory.css';

const Inventory = () => {
    return (
        <div>
            <h1>This is Inventory Component</h1>
            <div className='foot'>
                <Outlet />
            </div>
        </div>
    );
};

export default Inventory;