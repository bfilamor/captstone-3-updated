import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useValue } from '../UserContext';
import { SavedProductsList } from '../components/products/SavedProductsList';
import { Card, Container, Row } from 'react-bootstrap';
import { SavedProductsLoader } from '../components/products/SavedProductsLoader';

export const SavedProducts = () => {
    const { savedProducts, getSavedProducts } = useValue();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getProfile = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    //console.log(data);
                    navigate("/products")
                }
                if (data.isAdmin === true) {
                    navigate("/dashboard")
                }
            }).catch(error => console.log(error.message))
    }


    useEffect(() => {
        getProfile();
        getSavedProducts(setLoading);
    }, [])

    return (
        <>
            {
                <Container className='py-5'>
                    <h2 className='mb-3 text-center'>My Saved Products</h2>
                    <Row className='justify-content-center'>
                        <div className='col-lg-7'>
                            <Card>
                                <Card.Body>
                                    {
                                        (savedProducts?.length > 0) ?
                                            <>
                                                {
                                                    savedProducts.map((product) => {
                                                        return (<SavedProductsList productId={product} key={product} />)
                                                    })
                                                }
                                            </>
                                            : <p className='text-center py-5'>No Products saved</p>

                                    }

                                </Card.Body>
                            </Card>

                        </div>
                    </Row>

                </Container>


            }
        </>
    )
}
