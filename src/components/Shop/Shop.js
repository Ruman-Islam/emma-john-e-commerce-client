/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { addToLocalStorage } from '../../utilities/utilitiesFunctions';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = ({ setItemsCount }) => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);

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
                <Cart setItemsCount={setItemsCount} cart={cart} setCart={setCart}>
                    <p>Review Order</p>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;