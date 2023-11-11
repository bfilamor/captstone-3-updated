import { useEffect, useState, useContext, useMemo } from 'react';
import { Button, Container, Form, Card, Row } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useValue } from '../UserContext';
import { ProductImage } from '../components/checkout/ProductImage';
import { ProductDetails } from '../components/checkout/ProductDetails';
import { TotalAmount } from '../components/checkout/TotalAmount';
import { BillingInformation } from '../components/checkout/BillingInformation';

export const Checkout = () => {
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

    const { setIsCartOpen, setCartCounter, getCart, cart, addOns, fetchAddOns, setAddOnToCheckOut } = useValue();

    let addOnSubtotal = 0;

    selectedAddOn?.forEach((addOn) => {
        addOnSubtotal += addOn.price;
    })


    const buyNow = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                customerName: `${firstName} ${lastName}`,
                customerEmail: email,
                customerMobileNumber: mobileNo,
                billingAddress: address,
                products: [
                    {
                        productId: _id,
                        quantity: newQuantity,
                        addOns: selectedAddOn
                    }
                ],
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    Swal.fire({
                        title: "Purchase Successful",
                        icon: "success",
                        text: "Please check your orders list to track your orders"
                    })
                    //setSelectedAddOn([]);
                    navigate("/products")
                }
            }).catch(error => console.log(error.message))
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
        fetchAddOns();
        getCart();
        checkIfLoggedin();
    }, [])




    return (
        <>
            {(_id === undefined) ? <Navigate to="/products" /> :

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

                                            <div className='py-3 border-bottom'>
                                                <div className='d-lg-flex mb-1 w-100 text-center'>
                                                    <ProductImage productPhoto={productPhoto} quantity={quantity} />
                                                    <ProductDetails name={name} price={price} quantity={quantity} selectedAddOn={selectedAddOn} />
                                                </div>

                                            </div>

                                            <TotalAmount totalAmount={(price * newQuantity) + addOnSubtotal} />


                                            <div className='d-flex justify-content-center gap-1 mt-3'>
                                                <Link to={`/products/single/${_id}`} className="btn btn-secondary d-inline-block">Go Back</Link>

                                                <Button variant='success' onClick={() => { buyNow() }}>Buy Now</Button>

                                            </div>


                                        </div>
                                    </Row>
                                </div>
                            </Row>
                        </Card.Body>
                    </Card>


                </Container>}


        </>

    )
}
