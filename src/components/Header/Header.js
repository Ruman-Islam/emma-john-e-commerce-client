/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = ({ itemsCount }) => {
    return (
        <nav>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <input type="checkbox" name="" id="toggler" />
            <label className="nav-toggler-icon" for="toggler">
                <FontAwesomeIcon icon={faBars} />
            </label>
            <div className='navigations'>
                <Link to="/shop">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                <p className='cart-btn'>
                    <FontAwesomeIcon className="icon" icon={faCartShopping} />
                    <Link to='/orders'> <sup style={{ fontSize: '16px', marginLeft: '5px' }}>{itemsCount}</sup></Link>
                </p>
            </div>
        </nav>
    );
};

export default Header;