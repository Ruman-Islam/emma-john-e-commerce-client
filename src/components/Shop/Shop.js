/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { addToLocalStorage, deleteShoppingCart, getStoredCart } from '../../utilities/utilitiesFunctions';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = ({ setItemsCount }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const existingProduct = cart.find(product => product.id === selectedProduct.id);
        if (existingProduct) {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            existingProduct.quantity += 1;
            newCart = [...rest, existingProduct];
        } else {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        setCart(newCart);
        addToLocalStorage(selectedProduct.id);
    };

    const handleDeleteCart = () => {
        const emptyCart = [];
        setCart(emptyCart);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedProduct = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id]
                addedProduct.quantity = quantity;
                savedProduct.push(addedProduct);
            }
        }
        setCart(savedProduct);
    }, [products])

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Ruman-Islam/emma-john-e-commerce/main/public/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div className='shop-container'>
            <div className="product-container container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}
                    handleDeleteCart={handleDeleteCart}
                    setItemsCount={setItemsCount}
                />
            </div>
            <div className="offCanvas">
                <div className="offcanvas offcanvas-start w-100" tabIndex="1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <Cart cart={cart}
                            handleDeleteCart={handleDeleteCart}
                            setItemsCount={setItemsCount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;