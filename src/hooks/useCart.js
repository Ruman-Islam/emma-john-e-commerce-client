import axios from "axios";
import { useEffect, useState } from "react";
import { getStoredCart } from "../utilities/utilitiesFunctions";

const useCart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedProduct = [];
        const keys = Object.keys(storedCart);

        const getCart = async () => {
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
        }
        getCart();
    }, [])

    return [cart, setCart];
};

export default useCart;