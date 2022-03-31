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
                <Cart setItemsCount={setItemsCount} />
            </div>
            <div className="offCanvas">
                <div className="offcanvas offcanvas-start w-100" tabIndex="1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <Cart setItemsCount={setItemsCount} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;