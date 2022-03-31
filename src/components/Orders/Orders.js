import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Cart from '../Cart/Cart';
import './Orders.css';

const Orders = () => {
    const [products] = useProducts();
    const [cart] = useCart(products);
    return (
        <div className='main-container container'>
            <div className="container cart-item-container">
                {
                    cart.map(product => <li>{product.id}</li>)
                }
            </div>
            <div className="cart-detail-container">
                <Cart cart={cart} />
            </div>
        </div>
    );
};

export default Orders;