import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { handleDeleteCart } from '../../utilities/utilitiesFunctions';
import { useNavigate } from 'react-router-dom';
import { UseCartItemsCount } from '../../App';
import './Cart.css';

const Cart = ({ cart, setCart, children: { props: { children } = {} } = {} }) => {
    const { setItemsCount } = useContext(UseCartItemsCount);
    const navigate = useNavigate();

    let totalPrice = 0;
    let totalShippingCost = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity += product.quantity;
        totalPrice += product.price * product.quantity;
        totalShippingCost += product.shipping * product.quantity;
    }
    const tax = parseFloat((totalPrice * 0.1).toFixed(2));
    const grandTotal = totalPrice + totalShippingCost + tax;

    setItemsCount(quantity);

    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: {'$'} {totalPrice}</p>
            <p>Total Shipping Charge: {'$'} {totalShippingCost}</p>
            <p>Tax: {'$'} {tax}</p>
            <h5>Grand Total: {'$'} {grandTotal}</h5>
            <div className='btn-container'>
                <button className='clear-btn' onClick={() => handleDeleteCart(setCart)}>
                    Clear Cart
                    <FontAwesomeIcon className='icon' icon={faTrashCan} />
                </button>
                <button onClick={() => {
                    children === 'Review Order' ? (
                        navigate('/orders')
                    ) : (
                        navigate('/shipment')
                    )
                }} className='review-btn'>
                    {children}
                    <FontAwesomeIcon className='icon' icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
};

export default Cart;