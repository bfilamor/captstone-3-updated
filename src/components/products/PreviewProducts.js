import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import { Tilt } from 'react-tilt';
import { ProductCardImage } from './ProductCardImage';

export const PreviewProducts = ({ data, breakPoint }) => {
    const { name, description, price, _id, productPhoto } = data;


    return (
        <motion.div className='col-lg-3 col-sm-6 my-3'
            initial={{ opacity: 0, y: "-100px" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            
            <Tilt className="bg-light cardHighlight h-100 card" options={{ max: 20, scale: 1, speed: 250 }} >

                <div className='img-box overflow-hidden'>
                    <Link style={{ textDecoration: "none" }} className='fs-5 text-dark text-capitalize' to={`/products/single/${_id}`}>
                        {(productPhoto && productPhoto !== "false") ?
                            <ProductCardImage productPhoto={productPhoto} />
                            : <Card.Img variant="top" src="https://placehold.co/200" />}
                    </Link>
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

                    <Link to={`/products/single/${_id}`} className='btn btn-dark d-block'>Details</Link>
                </Card.Footer>
            </Tilt>

        </motion.div>


    )
}
