/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UseCartItemsCount } from '../../App';
import useCart from '../../hooks/useCart';
import { addToLocalStorage } from '../../utilities/utilitiesFunctions';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import Spinner from '../Spinner/Spinner';
import './Shop.css';

const Shop = () => {
    const { setItemsCount } = useContext(UseCartItemsCount);
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const { cart, setCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getPageCount = async () => {
            const url = 'https://tranquil-beach-24557.herokuapp.com/productCount';
            const { data } = await axios.get(url)
            const count = data.count;
            const pageCount = Math.ceil(count / 10);
            setPageCount(pageCount);
        }
        getPageCount();
    }, [])

    useEffect(() => {
        setIsLoading(true);
        const url = `https://tranquil-beach-24557.herokuapp.com/products?page=${page}&size=${size}`;
        const getProducts = async () => {
            const { data } = await axios.get(url)
            setIsLoading(false);
            setProducts(data)
        }
        getProducts();
    }, [page, size])

    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const existingProduct = cart.find(product => product._id === selectedProduct._id);
        if (existingProduct) {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            existingProduct.quantity += 1;
            newCart = [...rest, existingProduct];
        } else {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        setCart(newCart);
        addToLocalStorage(selectedProduct._id);
    };

    return (
        <>
            {isLoading ? <Spinner />
                :
                <div className='shop-container'>
                    <>
                        <div className="product-container container">
                            {
                                products.map(product => <Product
                                    key={product._id}
                                    product={product}
                                    handleAddToCart={handleAddToCart}
                                />)
                            }
                        </div>
                        <div className="cart-container">
                            <Cart setItemsCount={setItemsCount} cart={cart} setCart={setCart}>
                                <p>Review Order</p>
                            </Cart>
                        </div>
                    </>
                    {isLoading ||
                        <div className='page-btn'>
                            <div>
                                {
                                    [...Array(pageCount).keys()]
                                        .map(pageNumber =>
                                            <button key={pageNumber} className={page === pageNumber ? 'selected-btn' : ''}
                                                onClick={() => setPage(pageNumber)}>
                                                {pageNumber + 1}
                                            </button>
                                        )
                                }
                            </div>
                            <div className='selected-page-btn'>
                                <select defaultValue="10"
                                    onChange={(e) => setSize(e.target.value)}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                        </div>}
                </div>
            }
        </>
    );
};

export default Shop;