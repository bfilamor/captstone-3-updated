import { useEffect, useState, useContext, useMemo } from 'react';
import { Button, Container, Form, Card, Nav, Row } from 'react-bootstrap';
import { Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useValue } from '../UserContext';
import { ProductImage } from '../components/checkout/ProductImage';
import { ProductDetails } from '../components/checkout/ProductDetails';
import { TotalAmount } from '../components/checkout/TotalAmount';
import { BillingInformation } from '../components/checkout/BillingInformation';

export const PrescriptionCheckout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { productProp, quantity, selectedAddOn } = location.state ?? '';

    const { _id, name, description, stocks, price, leftADD, leftAXIS, leftCYL, leftIPD, leftSPH, rightADD, rightAXIS, rightCYL, rightIPD, rightSPH, visionType, lensUpgrade, lensUpgradePrice, isPrescription, subTotal, productPhoto } = productProp ?? '';

    const [newQuantity, setNewQuantity] = useState(quantity);
    const { setIsCartOpen, setCartCounter, getCart, cart, addOns, fetchAddOns, setAddOnToCheckOut } = useValue();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const billingDetailsProps = { firstName, setFirstName, lastName, setLastName, mobileNo, setMobileNo, address, setAddress, email, setEmail }



    const buyNow = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/prescriptionCheckout`, {
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
                        addOns: selectedAddOn,
                        isPrescription: true,
                        prescription: {
                            visionType: visionType,
                            lensUpgrade: {
                                lensType: lensUpgrade,
                                lensPrice: lensUpgradePrice
                            },
                            odRightEye: {
                                SPH: rightSPH,
                                CYL: rightCYL,
                                AXIS: rightAXIS,
                                ADD: rightADD,
                                IPD: rightIPD
                            },
                            odLeftEye: {
                                SPH: leftSPH,
                                CYL: leftCYL,
                                AXIS: leftAXIS,
                                ADD: leftADD,
                                IPD: leftIPD
                            }

                        }
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
                    navigate("/products")
                    // setSelectedAddOn([]);
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
        if (typeof _id === undefined) {
            navigate('/products');
        }
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

                                                <p className='fs-4 mb-0 fw-bold pt-3'>Lens Upgrade</p>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <p className='fs-4'>{lensUpgrade}</p>

                                                    </div>
                                                    <div className='col-6 d-flex justify-content-end'>
                                                        <p className='fs-4 fw-bold'>₱{lensUpgradePrice}</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <TotalAmount totalAmount={subTotal} />


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

                </Container>
            }

        </>
    )
}
