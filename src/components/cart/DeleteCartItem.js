import React, { useEffect, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import CircularProgress from '@mui/material/CircularProgress';

export const DeleteCartItem = ({ setCart, cart, quantity, productId, setInCart }) => {

    const { deleteCartItem } = useValue();
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stocks: 0,
        inCart: false
    })
    const { name, description, price } = productData;
    const [buttonLoading, setButtonLoading] = useState(false);
    //const [inCart, setInCart] = useState(false);

    /* const deleteCartItem = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/deleteCartItem`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: productId
            })
        })
            .then(res => res.json())
            .then(data => {
                //set  as productId state
                setInCart(false)
            })
    } */

    /*  useEffect(() => {
         getCart();
     }, [deleteCartItem]) */

    return (
        <Button className="d-flex gap-1 justify-content-center align-items-center" variant='danger' disabled={buttonLoading ? true : false} onClick={() => { deleteCartItem(productId, quantity, setInCart, setButtonLoading); }}>
            <span>
                {buttonLoading ? <CircularProgress size={15} color="inherit" /> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z" />
                </svg>}
            </span>
            <span>
                Remove From Cart
            </span>
        </Button>
    )
}
