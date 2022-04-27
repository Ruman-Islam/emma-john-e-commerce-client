import { useEffect, useState } from "react";
import axios from 'axios';

const useProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('https://tranquil-beach-24557.herokuapp.com/products')
            setProducts(data);
        }
        getProducts()
    }, [])

    return [products, setProducts];
};

export default useProducts;

// This hook is not using right now..