import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = ({ product, handleAddToCart }) => {
    const { img, name, price, ratings, seller } = product;
    return (
        <div className="card h-100">
            <img src={img} className="img-fluid" alt="product" />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Price: {'$'}{price}</p>
                <small className="card-text">Manufacturer: {seller}</small>
                <small className="card-text">Rating: {ratings}</small>
            </div>
            <button onClick={() => handleAddToCart(product)}
                className='add-to-cart'>
                Add to Cart
                <FontAwesomeIcon className="icon" icon={faCartPlus} />
            </button>
        </div>
    );
};

export default Product;