import React from 'react';
import { Row, Col, Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import bannerImage from '../../images/banner-image.jpg';
import { motion } from "framer-motion"


export const Banner = ({ data }) => {
    const { title, content, destination, label, bannerClass, isError } = data;

    return (
        <section className={bannerClass}>
            {(!isError) ? <img src={bannerImage} /> : null}

            <Container className='py-5' style={{ position: "relative", zIndex: 2 }}>
                <Row className='justify-content-center'>
                    <Col className="py-3 col-lg-9 text-center">
                        <motion.h2 className="fs-1 fw-bold" initial={{ opacity: 0, y:"-10px" }}
                            whileInView={{ opacity: 1 , y:0 }}
                            viewport={{ once: true }}>{title}</motion.h2>
                        <motion.p initial={{ opacity: 0, y:"-10px" }}
                            whileInView={{ opacity: 1 , y:0 }}
                            viewport={{ once: true }} className='fs-4 py-3'>{content}</motion.p>

                        <Link className="btn btn-primary fs-4" to={destination} style={{ borderRadius: "25px" }} >{label}</Link>
                    </Col>
                </Row>

            </Container>
        </section>

    )
}



