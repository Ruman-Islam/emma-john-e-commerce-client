import axios from "axios";
import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/utilitiesFunctions";

const useCart = () => {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedProduct = [];
        const keys = Object.keys(storedCart);

        const getCart = async () => {
            setIsLoading(true);
            const url = 'https://tranquil-beach-24557.herokuapp.com/productByKeys';
            const { data } = await axios.post(url, keys)
            for (const id in storedCart) {
                const addedProduct = data.find(product => product._id === id);
                if (addedProduct) {
                    const quantity = storedCart[id]
                    addedProduct.quantity = quantity;
                    savedProduct.push(addedProduct);
                }
            }
            setCart(savedProduct);
            setIsLoading(false);
        }
        getCart();
    }, [])

    return { cart, setCart, isLoading };
};

export default useCart;