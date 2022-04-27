import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons"
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './Shipment.css';
import useCart from '../../hooks/useCart';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Shipment = () => {
    const [user] = useAuthState(auth);
    const [cart] = useCart();
    const [address, setAddress] = useState({ value: "", error: "" });
    const [phone, setPhone] = useState({ value: "", error: "" });
    const navigate = useNavigate();

    const handleAddress = e => {
        const addressInput = e.target.value;
        setAddress({ value: addressInput, error: "" });
    }

    const handlePhone = e => {
        const phoneInput = e.target.value;
        setPhone({ value: phoneInput, error: "" })
    }

    const handleSubmit = async e => {
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        e.preventDefault();
        if (address.value === "") {
            setAddress({ value: "", error: "Address is required" })
        } if (phone.value === "") {
            setPhone({ value: "", error: "Phone is required" })
        } else {
            const orderedProduct = {
                userName: user?.displayName,
                email: user?.email,
                address: address?.value,
                phone: phone?.value,
                orderDate: `${date}/${month}/${year}`,
                products: cart
            }
            await fetch('https://tranquil-beach-24557.herokuapp.com/addorder', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(orderedProduct)
            })
                .then(res => res.json())
                .then(data => {
                    swal("Congrats!", "Your order has been placed", "success");
                    e.target.username.value = '';
                    e.target.email.value = '';
                    e.target.address.value = '';
                    e.target.phone.value = '';
                    navigate('/');
                })
        }

    }
    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <h5>Shipment Information</h5>
                <label htmlFor="username">You name</label>
                <input value={user?.displayName} readOnly disabled type="text" name="username" id="username" />

                <label htmlFor="email">Email</label>
                <input value={user?.email} readOnly disabled type="email" name="email" id="email" />
                <label htmlFor="address">Address</label>
                <input onBlur={handleAddress} type="text" name="address" id="address" />
                {address.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {address.error}
                    </small>
                )}
                <label htmlFor="phone">phone</label>
                <input onBlur={handlePhone} type="text" name="phone" id="phone" />
                {phone.error && (
                    <small className='error'>
                        <AiOutlineExclamationCircle className='warning-icon' />
                        {phone.error}
                    </small>
                )}
                <br />
                <button
                    className='login-btn' type='submit'>
                    Checkout
                </button>
            </form>
        </div>
    );
};

export default Shipment;