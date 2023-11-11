import React, { useEffect, useMemo, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartOutlined } from '@fortawesome/free-regular-svg-icons'

export const SaveProductToggle = ({ productId, savedBy, inSavedProductsList }) => {
    const { isLoggedin , getSavedProducts} = useValue();
    const [savedStatus, setSavedStatus] = useState(true);
    const [productData, setProductData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchProductData = async () => {
        try {
            const productDataRes = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const prodData = await productDataRes.json();

            if (prodData) {
                setProductData({
                    savedBy: prodData.savedBy
                })

            }
        } catch (error) {
            console.log(error.message)
        }


    }

    const handleSaveProduct = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/users/saveProduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    productId: productId
                })
            })

            const data = await res.json();
            if (data) {
                if (savedStatus === true) {
                    setSavedStatus(false)
                } else {
                    setSavedStatus(true);
                }
            }

        } catch (error) {
            console.log(error.message)
        }
    }


    useEffect(() => {
        //getSavedProducts();
        //fetchProductData();
        const savedByUserIndex = savedBy?.findIndex((user) => user === localStorage.getItem("userId"));
        if (savedByUserIndex !== -1) {
            setSavedStatus(false);
        } else {
            setSavedStatus(true);
        }
    }, [])

    useEffect(() => {
        fetchProductData();
        getSavedProducts(setLoading);
    }, [savedStatus])


    return (
        <>
            {(isLoggedin) ?
                <>
                    {(savedStatus) ? <Button variant='dark' onClick={() => { handleSaveProduct() }}> <FontAwesomeIcon icon={faHeartOutlined} /> <FontAwesomeIcon icon={faPlus} /></Button> : <Button variant='dark' onClick={() => { handleSaveProduct() }} > <FontAwesomeIcon icon={!inSavedProductsList ? faHeart : faClose} /></Button>}

                </>
                :
                <Button variant='dark'> <FontAwesomeIcon icon={faHeartOutlined} /></Button>
            }

            <p className='text-light m-0 text-center'><small>{(productData?.savedBy?.length >= 0) ? productData?.savedBy?.length : 0}</small></p>
        </>
    )
}
