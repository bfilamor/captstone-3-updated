import { useEffect, useMemo, useState } from 'react';
import { Button, Container, Modal, CloseButton, Card, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useValue } from '../../UserContext';
import moment from 'moment';
import { TotalAmount } from '../checkout/TotalAmount';
import { SubTotal } from '../checkout/SubTotal';

export const OrderDetails = ({ productId }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState([])

    const openModal = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/${productId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.json();
            if (data) {
                const orderMap = data.map((order) => {
                    return (
                        <Card key={order._id} className='p-lg-5 p-3'>
                            <Card.Body>
                                <div className='row'>
                                    <div className='col-lg-6'>

                                        <p className='mb-0 fs-4 fw-bold'>Order ID</p>
                                        <h2>{order._id}</h2>

                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Order Status</p>
                                                <p className={(order.status === "cancelled") ? "fs-4 mt-0 text-danger" : "fs-4 mt-0 text-success"}>{order.status} </p>

                                            </div>
                                            <div className='col-lg-6 d-flex justify-content-end flex-column'>
                                                <p className='mb-0 fs-4 fw-bold'>Purchase Date</p>
                                                <p className='fs-4'>{moment(order.purchasedOn).format("MMM D, YYYY")} </p>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Billing Email</p>
                                                <p className='fs-4'>{order.customerEmail ? order.customerEmail : "Not Indicated"} </p>

                                            </div>
                                            <div className='col-lg-6 d-flex justify-content-end flex-column'>
                                                <p className='mb-0 fs-4 fw-bold'>Billing Mobile Number</p>
                                                <p className='fs-4'>{order.customerMobileNumber ? order.customerMobileNumber : "Not Indicated"} </p>
                                            </div>
                                        </div>


                                        <p className='mb-0 fs-4 fw-bold'>Billing Name</p>
                                        <p className='fs-4'>{order.customerName ? order.customerName : "Not Indicated"} </p>

                                        <p className='mb-0 fs-4 fw-bold'>Billing Address</p>
                                        <p className='fs-4'>{order.billingAddress ? order.billingAddress : "Not Indicated"} </p>


                                    </div>
                                    <div className='col-lg-6'>
                                        <p className='fs-4 fw-bold'>Product(s)</p>
                                        <div className='p-3 bg-light rounded-3'>
                                            {order.products.map(product => (
                                                <div className='border-bottom py-2' key={product.productId}>
                                                    <p className='mb-0 fs-4 fw-bold text-capitalize'>({product.quantity}x) <Link style={{ textDecoration: "none", color: "inherit" }} to={`/products/single/${product.productId}`}>{product.productName}</Link></p>
                                                    {(product.addOns.length > 0) ?
                                                        <>
                                                            <div className='p-3 my-2 border-start border-3 '>
                                                                <p className='mb-0 fs-5 fw-bold'>Add Ons:</p>
                                                                {product.addOns.map(addOn => (
                                                                    <div className='row justify-content-between' key={addOn._id}>
                                                                        <div className='col-7'>
                                                                            <p className='fs-5 mb-0 text-capitalize'>{addOn.name}</p>
                                                                        </div>
                                                                        <div className='col-5 d-flex justify-content-end'>
                                                                            <p className='fs-5 mb-0 fw-bold'>₱{addOn.price}</p>
                                                                        </div>
                                                                    </div>

                                                                ))}

                                                            </div>

                                                        </>

                                                        : null}

                                                    {
                                                        (product.prescription !== undefined) ?
                                                            <>
                                                                <p className='mb-0 fs-4 fw-bold'>Vision Type</p>
                                                                <p className='mt-0 fs-4'>{product.prescription.visionType}</p>

                                                                <p className='mb-0 fs-4 fw-bold'>Lens Type</p>
                                                                <p className='mt-0 fs-4'>{product.prescription.lensUpgrade.lensType} -  P{product.prescription.lensUpgrade.lensPrice}</p>

                                                            </>
                                                            : null
                                                    }

                                                    <SubTotal subTotal={product.subTotal} />
                                                </div>


                                            ))}

                                            <TotalAmount totalAmount={order.totalAmount} />

                                        </div>




                                    </div>
                                </div>

                                {order.products.map(product => (

                                    ((product.prescription !== undefined) && (product.prescription.visionType !== "Non Prescription")) ?

                                        <div key={product._id}>
                                            <p className='mt-5 fs-4 fw-bold text-center'>Prescription Details</p>
                                            <Table striped hover responsive className='text-center'>
                                                <thead>
                                                    <tr>
                                                        <th></th>
                                                        <th>SPH</th>
                                                        <th>CYL</th>
                                                        <th>AXIS</th>
                                                        <th>ADD</th>
                                                        <th>IPD</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>OD Right Eye</td>
                                                        <td>
                                                            {product.prescription.odRightEye.SPH}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.CYL}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.AXIS}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.ADD}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odRightEye.IPD}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>OD Left Eye</td>
                                                        <td>
                                                            {product.prescription.odLeftEye.SPH}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.CYL}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.AXIS}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.ADD}
                                                        </td>
                                                        <td>
                                                            {product.prescription.odLeftEye.IPD}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>

                                        </div>
                                        : null

                                ))}



                            </Card.Body>

                        </Card>

                    )
                })
                setOrderData(orderMap);
                setIsModalOpen(true);

            }

        } catch (error) {
            console.log(error.message)
        }

    }

    const closeModal = () => {
        setIsModalOpen(false);
        setOrderData([]);
    }
    return (
        <>
            <Button variant='primary' onClick={() => openModal()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg> View Details</Button>

            <Modal show={isModalOpen} fullscreen={true}>
                <Modal.Body className='p-0'>
                    <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeModal(e)} /></div>
                    <Container>
                        {orderData}

                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}



