import { useState, useContext, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Placeholder } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import { Cart } from '../cart/Cart';
import { motion } from "framer-motion"
import { Tilt } from 'react-tilt';
import { SaveProduct } from './SaveProduct';
import { ProductCardImage } from './ProductCardImage';
//import Proptypes from 'prop-types'

//compoments receives an object called "props", then we destructure the props object
export const ProductCard = ({ productProp }) => {
    const { isLoggedin, fetchCardData, productInCartStatus } = useValue();
    const { _id, name, description, price, isPrescription, productPhoto, stocks, savedBy } = productProp;
    const [inCart, setInCart] = useState(false);
    const [savedStatus, setSavedStatus] = useState(true);

    const [quantity, setQuantity] = useState(0);
    const [productLoading, setProductLoading] = useState(true);

    /* useMemo(() => {
        //fetchData();
        productInCartStatus(_id, setInCart)
        //fetchCardData(_id, productData, setProductData, setProductLoading);
    }, []) */

    return (
        <motion.div className='col-lg-3 col-sm-6 my-3'
            initial={{ opacity: 0, y: "-100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <Tilt className="h-100 border product-card bg-light card overflow-hidden shadow-sm" options={{ max: 20, scale: 1, speed: 250 }} >
                <div className='img-box position-relative'>
                    <Link to={`/products/single/${_id}`}>
                        {(productPhoto && productPhoto !== "false") ?
                            <ProductCardImage productPhoto={productPhoto} />
                            : <Card.Img variant="top" src="https://placehold.co/100" />}

                    </Link>
                    <SaveProduct productId={_id} savedBy={savedBy} />
                </div>

                <Card.Body>
                    <div className='row'>
                        <div className='col-8'>
                            <p className='mb-0 fs-5 text-capitalize'>
                                <Link style={{ textDecoration: "none" }} className='fs-5 text-dark text-capitalize' to={`/products/single/${_id}`}>{name}</Link>
                            </p>


                        </div>
                        <div className='col-4 d-flex justify-content-end'>
                            <p className='fs-5 fw-bold'>₱{price}</p>
                        </div>

                    </div>

                </Card.Body>
                <Card.Footer className='border-0 bg-light'>
                    {isPrescription ?
                        <Link className='btn btn-dark d-block w-100' to={`/products/single/${_id}`}>View Lenses</Link> :
                        <>
                            {(isLoggedin) ?
                                <>
                                    {
                                        (stocks > 0) ?
                                            <Cart productId={_id} quantity={quantity} inCart={inCart} setQuantity={setQuantity} /> : <Button variant='secondary' disabled>Out of Stock</Button>

                                    }

                                </>
                                :
                                <>
                                    {(stocks > 0) ?
                                        <Link className='btn btn-dark d-block' to={`/products/single/${_id}`}>View Details</Link> :
                                        <Button variant='secondary' disabled>Out of Stock</Button>
                                    }

                                </>

                            }
                        </>
                    }
                </Card.Footer>

            </Tilt>



        </motion.div>

    )
}

//check if the ProductCard component is getting the correct prop types
/* ProductCard.propTypes = {
    //the "shape" method is used to check if a prop object conforms to a specific shape
    productProp: Proptypes.shape({
        //Define the properties and their expected types
        name: Proptypes.string.isRequired,
        description: Proptypes.string.isRequired,
        price: Proptypes.number.isRequired
    })
}
 */