import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';

export const DeleteInCart = ({ cartItem }) => {
    const { productId, quantity } = cartItem;
    //const [newQuantity, setNewQuantity] = useState(quantity === 0 ? 1 : quantity);
    const { getCart, cart, setCart, deleteCartItem } = useValue();
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        stocks: 0,
        inCart: false
    })
    const { name, description, price } = productData;
    const [inCart, setInCart] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    //const [productId, setProductId] = useState(_id);

    /*  useEffect(() => {
         getCart();
     }, []) */

    return (
        <>
            <div>
                <Button variant='danger' className='p-0' style={{ width: "40px", height: "40px" }} onClick={() => { deleteCartItem(productId, quantity, setInCart, setButtonLoading) }}>
                    {buttonLoading ? <CircularProgress size={15} color="inherit" /> :  <FontAwesomeIcon icon={faTrashAlt} />}            
                </Button>

            </div>


        </>
    )
}
