import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import './CartItem.css';

const CartItem = ({ handleRemoveFromCart, product, product: { name, price, shipping, quantity, img } }) => {

    return (
        <div className='cart-item'>
            <div className='item-img-container'>
                <img src={img} alt="" />
            </div>
            <div className='item-detail-container'>
                <h6 title={name} className='detail-title'>{name.length > 10 ? name.slice(0, 20) + '...' : name}</h6>
                <p className='detail-title'>Price: $ {price}</p>
                <p className='detail-title'>Shipping Cost: $ {shipping}</p>
                <p className='detail-title'>Quantity: {quantity}</p>
            </div>
            <div className='remove-item-btn-container'>
                <button onClick={() => handleRemoveFromCart(product)}>
                    <FontAwesomeIcon className='icon' icon={faTrashCan} />
                </button>
            </div>
        </div>
    );
};

export default CartItem;