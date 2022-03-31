import { useEffect, useState } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/Ruman-Islam/emma-john-e-commerce/main/public/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return [products, setProducts];
};

export default useProducts;