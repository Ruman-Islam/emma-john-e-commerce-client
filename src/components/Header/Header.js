/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CustomLink from '../CustomLink/CustomLink';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { UseCartItemsCount } from '../../App';

const Header = () => {
    const { itemsCount } = useContext(UseCartItemsCount);
    const [user] = useAuthState(auth);
    const logout = () => {
        signOut(auth)
    }
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
                <CustomLink to="/">Shop</CustomLink>
                <CustomLink to="/orders">Orders</CustomLink>
                <CustomLink to="/inventory">Inventory</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <p className='cart-btn'>
                    <Link to='/orders'>
                        <FontAwesomeIcon className="icon" icon={faCartShopping} />
                        <sup style={{ fontSize: '16px', marginLeft: '5px' }}>{itemsCount}</sup>
                    </Link>
                </p>

                {
                    user ?
                        <div className='sign-out-btn'>
                            <button onClick={logout}>Sign out</button>
                            {user && <small style={{ color: 'white', fontSize: '12px' }}>{user?.displayName}</small>}
                        </div>
                        :
                        <CustomLink to="/login">Login</CustomLink>
                }
            </div>
        </nav>
    );
};

export default Header;