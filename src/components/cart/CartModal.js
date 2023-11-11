import { useEffect, useState, useMemo } from 'react';
import { Badge, Button, Modal, Offcanvas, CloseButton } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import { Link } from 'react-router-dom';
import { DeleteInCart } from './DeleteInCart';
import { CartQuantity } from './CartQuantity';

export const CartModal = () => {
    const { setIsCartOpen, getCart, isCartOpen, cart, cartCounter, setCart, setCartCounter, fetchAddOns, selectedAddOn } = useValue();
    const [totalAmount, setTotalAmount] = useState(0);

    const closeCart = (e) => {
        e.preventDefault();
        setIsCartOpen(false);
    }

    const clearCart = () => {
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/users/clearCart`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCart([]);
                    setCartCounter(0);
                    getCart();
                }
            })

    }


    /*  useEffect(() => {
         getCart();
         // fetchAddOns();
     }, []) */

    useMemo(() => {
        let totalAmount = 0;
        cart.forEach(item => {
            totalAmount += item.subTotal
        })
        setTotalAmount(totalAmount);
    }, [getCart])

    return (
        <>
            <Offcanvas show={isCartOpen} placement='end' >
                <div className='fs-4 d-flex justify-content-end p-3'>
                    <CloseButton onClick={(e) => closeCart(e)} />
                </div>
                <Offcanvas.Body>
                    {cart.length > 0 ?
                        cart.map((item) => {
                            return (
                                <div key={item.productId}>
                                    <div className='row py-3'>
                                        <div className='col-10'>
                                            <div className='row'>
                                                <div className='col-5 pe-1'>
                                                    <CartQuantity
                                                        quantity={item.quantity}
                                                        productId={item.productId}
                                                    />
                                                </div>
                                                <div className='col-7'>
                                                    <p className='mb-0'>{item.productName}</p>
                                                    <p className='fw-bold'>₱{item.productPrice}</p>


                                                    {item.addOns.length > 0 ?
                                                        <>
                                                            <p className='mb-1 border-bottom'><small><strong>Add Ons:</strong></small></p>
                                                            {
                                                                item.addOns.map((addOn) => {
                                                                    return (
                                                                        <div className='d-flex gap-1 justify-content-between pb-1' key={addOn._id}>
                                                                            <p className='mb-0 text-capitalize'><small>{addOn.name}</small></p>
                                                                            <p className='fw-bold mb-0'><small>₱{addOn.price}</small></p>

                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </> : null}

                                                </div>

                                            </div>



                                        </div>
                                        <div className='col-2 d-flex justify-content-end'>
                                            <DeleteInCart
                                                cartItem={item} />
                                        </div>


                                    </div>
                                    <div className='my-3 border-bottom row'>
                                        <div className='col-4'>
                                            <h4>Subtotal</h4>
                                        </div>
                                        <div className='col-8 d-flex justify-content-end'>
                                            <h4 className='fw-bold'>₱{item.subTotal}</h4>
                                        </div>

                                    </div>


                                </div>
                            )
                        })

                        : <p>No Products in Cart</p>
                    }

                    {(cart.length > 0) ?
                        <div className='row align-items-center'>
                            <div className='col-7'>
                                <h4 className='my-2'>Total Amount</h4>
                            </div>
                            <div className='col d-flex justify-content-end'>
                                <h4 className='my-2  fs-2 fw-bold'>₱{totalAmount}</h4>
                            </div>
                        </div>


                        : null}

                    <div className='d-flex justify-content-center py-3 gap-2'>
                        {(cart.length > 0) ?
                            <>
                                <Button onClick={() => { clearCart() }} variant='danger'>Clear Cart</Button>
                                <Link className="btn btn-success" to="/cart-checkout" state={{ cart, selectedAddOn }}>Checkout</Link>
                            </>

                            : null
                        }
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
