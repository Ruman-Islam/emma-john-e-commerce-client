import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Inventory.css';
const Inventory = () => {
    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrders = async () => {
            const email = user?.email;
            const url = `https://tranquil-beach-24557.herokuapp.com/getorders?email=${email}`
            try {
                const { data } = await axios.get(url, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                });
                setOrders(data);
            } catch (err) {
                if (err.response.status === 40 || err.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, [user, navigate])

    return (
        <div className='container my-5'>
            <h1 className='ms-5 text-success'>Your orders: {orders.length}</h1>
            <div className='row d-flex justify-content-center'>
                {
                    orders.map(order =>
                        <div className='m-2 card p-3 col-sm-12 col-md-6 col-lg-4'
                            style={{
                                backgroundImage: `url('${order.products[0]?.img}')`
                            }}>
                            <div className='bg-light p-3 text-dark bg-opacity-75 border rounded-2 h-100'>
                                <div
                                    className='d-flex align-items-center justify-content-between'>
                                    <h2>{order?.userName}</h2>
                                    <span>{order?.orderDate}</span>
                                </div>
                                <h6><strong>Phone:</strong> {order?.phone}</h6>
                                <h6><strong>email:</strong> {order?.email}</h6>
                                <h6><strong>Address:</strong> {order?.address}</h6>
                                <ul>
                                    {order?.products?.map(product =>
                                        <li>
                                            {product?.name}
                                            <ul>
                                                <li>Price: <strong>{product?.price}TK</strong></li>
                                                <li>Quantity: <strong>{product?.quantity}</strong></li>
                                            </ul>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Inventory;