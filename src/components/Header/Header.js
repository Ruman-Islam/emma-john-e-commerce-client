/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = ({ itemsCount }) => {
    return (
        // <nav className="navbar navbar-expand-lg navbar-light bg-dark w-100">
        //     <div className="container">
        //         <img src={logo} alt="" />
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <FontAwesomeIcon className="navbar-toggler-icon" icon={faBars} />
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav ms-auto">
        //                 <li className="nav-item">
        //                     <a className="nav-link text-white" aria-current="page" href="#">Shop</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link text-white" href="#">Orders</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link text-white" href="#">Inventory</a>
        //                 </li>
        //                 <li className="nav-item">
        //                     <a className="nav-link text-white" href="#">About</a>
        //                 </li>
        //                 <li className="nav-item text-white position-relative">
        //                     <a className="nav-link cart-icon" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
        //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        //                             <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        //                         </svg><sup>{itemsCount}</sup>
        //                     </a>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
        <nav>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <input type="checkbox" name="" id="toggler" />
            <label className="nav-toggler-icon" for="toggler">
                <FontAwesomeIcon icon={faBars} />
            </label>
            <div className='navigations'>
                <a href="/shop">Shop</a>
                <a href="/orders">Orders</a>
                <a href="/inventory">Inventory</a>
                <a href="/about">About</a>
                <p className='cart-btn' data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                    <FontAwesomeIcon className="icon" icon={faCartShopping} />
                    <sup style={{ fontSize: '16px', marginLeft: '5px' }}>{itemsCount}</sup>
                </p>
            </div>
        </nav>
    );
};

export default Header;