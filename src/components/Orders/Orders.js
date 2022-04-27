import { removeFromDb } from '../../utilities/utilitiesFunctions';
import useCart from '../../hooks/useCart';
import Cart from '../Cart/Cart';
import CartItem from '../CartItem/CartItem';
import Spinner from '../Spinner/Spinner';
import './Orders.css';

const Orders = () => {
    const { cart, setCart, isLoading } = useCart();


    const handleRemoveFromCart = (selectedItem) => {
        const restItems = cart.filter(cartItem => cartItem._id !== selectedItem._id);
        setCart(restItems);
        removeFromDb(selectedItem._id);
    }

    return (
        <>
            {isLoading ? <Spinner />
                :
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
                </div>}
        </>
    );
};

export default Orders;