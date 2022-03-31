import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import Cart from '../Cart/Cart';
import CartItem from '../CartItem/CartItem';
import './Orders.css';

const Orders = ({ setItemsCount }) => {
    const [products] = useProducts();
    const [cart] = useCart(products);
    return (
        <div className='main-container container'>
            <div className="container cart-item-container">
                {
                    cart.map(product => <CartItem key={product.key} product={product} />)
                }
            </div>
            <div className="cart-detail-container">
                <Cart setItemsCount={setItemsCount} cart={cart} />
            </div>
        </div>
    );
};

export default Orders;