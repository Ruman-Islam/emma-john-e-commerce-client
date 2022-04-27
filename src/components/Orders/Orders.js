import React from 'react';
import useCart from '../../hooks/useCart';
import { removeFromDb } from '../../utilities/utilitiesFunctions';
import Cart from '../Cart/Cart';
import CartItem from '../CartItem/CartItem';
import './Orders.css';

const Orders = () => {
    const [cart, setCart] = useCart();

    const handleRemoveFromCart = (selectedItem) => {
        const restItems = cart.filter(cartItem => cartItem._id !== selectedItem._id);
        setCart(restItems);
        removeFromDb(selectedItem._id);
    }

    return (
        <div className='main-container container'>
            <div className="container cart-item-container">
                {
                    cart.map(product => <CartItem key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />)
                }
            </div>
            <div className="cart-detail-container">
                <Cart cart={cart} setCart={setCart}>
                    <p>Proceed Order</p>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;