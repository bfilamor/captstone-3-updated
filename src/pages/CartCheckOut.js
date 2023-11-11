import { useEffect, useState, useContext, useMemo } from 'react';
import { Button, Container, Form, Card, Row } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useValue } from '../UserContext';
import { ProductImage } from '../components/checkout/ProductImage';
import { ProductDetails } from '../components/checkout/ProductDetails';
import { TotalAmount } from '../components/checkout/TotalAmount';
import { SubTotal } from '../components/checkout/SubTotal';
import { BillingInformation } from '../components/checkout/BillingInformation';

export const CartCheckout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { productProp, quantity, selectedAddOn } = location.state ?? '';

    const { _id, name, description, stocks, price, productPhoto } = productProp ?? '';

    const [newQuantity, setNewQuantity] = useState(quantity);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const billingDetailsProps = { firstName, setFirstName, lastName, setLastName, mobileNo, setMobileNo, address, setAddress, email, setEmail }

    const { setIsCartOpen, setCartCounter, getCart, cart, addOns, fetchAddOns, setAddOnToCheckOut, fetchData, productsData } = useValue();




    const buyCartItems = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/cartCheckout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                customerName: `${firstName} ${lastName}`,
                customerEmail: email,
                customerMobileNumber: mobileNo,
                billingAddress: address
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    Swal.fire({
                        title: "Purchase Successful",
                        icon: "success",
                        text: "Please check your Transactions History to track your orders"
                    })
                    setCartCounter(0);
                    navigate('/products');
                }
            }).catch(error => console.log(error.message))
    }

    let totalAmount = 0
    if (cart) {
        cart.forEach((item) => {
            totalAmount = totalAmount + item.subTotal;
        })
    }

    const checkIfLoggedin = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (!data) {
                    //if the token is not an admin, redirect to /courses page
                    navigate("/login")
                }
                if (data.isAdmin === true) {
                    navigate("/dashboard")
                }

            }).catch(error => console.log(error.message))
    }


    useEffect(() => {
        setIsCartOpen(false)
        fetchData();
        fetchAddOns();
        getCart();
        checkIfLoggedin();
    }, [])



    return (
        <>
            {(cart?.length === 0) ? <Navigate to="/products" /> :
                <Container fluid>
                    <Card className='border-0'>
                        <Card.Body className='p-0'>
                            <Row id="checkOutRow">
                                <div className='col-lg-6 pt-lg-5 pt-3'>
                                    <Row className='justify-content-end'>
                                        <div className='col-lg-10'>
                                            <BillingInformation billingDetailsProps={billingDetailsProps} />
                                        </div>
                                    </Row>
                                </div>
                                <div className='col-lg-6 bg-light'>
                                    <Row>
                                        <div className='col-lg-10 p-3 px-lg-5 py-5'>
                                            {
                                                cart?.map((item) => {
                                                    return (
                                                        <div className='py-3 border-bottom' key={item._id}>
                                                            <div className='d-lg-flex mb-1 w-100 text-center'>
                                                                {
                                                                    productsData.map((data) => {
                                                                        if (item.productId === data._id) {

                                                                            return (
                                                                                <ProductImage key={item.productId} productPhoto={data.productPhoto} quantity={item.quantity} />
                                                                            )


                                                                        }
                                                                    })
                                                                }

                                                                <ProductDetails name={item.productName} price={item.productPrice} quantity={item.quantity} selectedAddOn={item.addOns} />

                                                            </div>

                                                            <SubTotal subTotal={item.subTotal} />

                                                        </div>

                                                    )
                                                })


                                            }

                                            <TotalAmount totalAmount={totalAmount} />

                                            <div className='d-flex justify-content-center gap-1 mt-3'>
                                                <Button variant='secondary' onClick={() => { setIsCartOpen(true) }}>Edit Cart</Button>

                                                <Button variant='success' onClick={() => { buyCartItems() }}>Buy Now</Button>

                                            </div>




                                        </div>
                                    </Row>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>

                </Container>
            }
        </>


    )
}
