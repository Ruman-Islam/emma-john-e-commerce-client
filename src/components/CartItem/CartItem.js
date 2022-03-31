import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';

const CartItem = ({ product: { name, price, shipping, quantity, img } }) => {
    return (
        <div className='cart-item'>
            <div className='item-img-container'>
                <img src={img} alt="" />
            </div>
            <div className='item-detail-container'>
                <h5 title={name} className='detail-title'>{name.length > 20 ? name.slice(2, 20) + '...' : name}</h5>
                <p className='detail-title'>Price: $ {price}</p>
                <p className='detail-title'>Shipping Cost: $ {shipping}</p>
                <p className='detail-title'>Quantity: {quantity}</p>
            </div>
            <div className='remove-item-btn-container'>
                <FontAwesomeIcon className='icon' icon={faTrashCan} />
            </div>
        </div>
    );
};

export default CartItem;