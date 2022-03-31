import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/utilitiesFunctions';
import Cart from '../Cart/Cart';
import CartItem from '../CartItem/CartItem';
import './Orders.css';

const Orders = ({ setItemsCount }) => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);

    const handleRemoveFromCart = (selectedItem) => {
        const restItems = cart.filter(cartItem => cartItem.id !== selectedItem.id);
        setCart(restItems);
        removeFromDb(selectedItem.id);
    }

    return (
        <div className='main-container container'>
            <div className="container cart-item-container">
                {
                    cart.map(product => <CartItem key={product.key}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />)
                }
            </div>
            <div className="cart-detail-container">
                <Cart setItemsCount={setItemsCount} cart={cart} setCart={setCart}>
                    <p>Proceed Order</p>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;