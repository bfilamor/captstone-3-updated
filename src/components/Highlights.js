import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import kids from "../images/kids.jpg";
import sunGlassModel from "../images/sunglass-model.jpg";
import readingGlass from "../images/reading-glass.jpg";
import eyeChart from "../images/eye-chart.jpeg";
import opticalShop from "../images/optical-shop.jpg";
import carouseSlide from '../images/carousel-slide-1.jpg';
import { motion } from "framer-motion"



export const Highlights = () => {
    return (
        <>
            <section className='bg-light overflow-hidden'>
                <div className='container-fluid'>
                    <div className='row'>
                        <motion.div initial={{ opacity: 0, x: "200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className='col-lg-6 px-0 position-relative overflow-hidden'>
                            <Carousel className='bg-carousel' fade controls={false} indicators={false}>
                                <Carousel.Item>
                                    <img src={kids} alt="slide1" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={carouseSlide} alt="slide2" />
                                </Carousel.Item>
                            </Carousel>

                        </motion.div>


                        <motion.div initial={{ opacity: 0, x: "-200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className='col-lg-6 d-flex align-items-center min-vh-100' id="prescriptionAbstract">
                            <div className='p-3'>
                                <h2 className='fw-bold fs-1'>Prescription Frames</h2>
                                <p className='fs-4 fw-light'>These glasses consist of lenses that are custom-made based on an individual's specific vision prescription.</p>
                                <Link className='btn btn-outline-secondary btn-lg' to="/products/prescription" style={{ borderRadius: "25px" }}>Browse Prescription Frames</Link>
                            </div>
                        </motion.div>
                    </div>
                    <div className='row'>

                        <motion.div initial={{ opacity: 0, x: "200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className='col-lg-6 d-flex align-items-center order-2 order-lg-1'>
                            <div className='p-3'>
                                <h2 className='fw-bold fs-1'>Sunglasses</h2>
                                <p className='fs-4 fw-light'>Sunglasses, more than just a fashion statement, are a quintessential accessory that blends style with function. </p>
                                <Link className='btn btn-outline-secondary btn-lg' to="/products/sunglasses" style={{ borderRadius: "25px" }}>Browse Sunglasses</Link>
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: "-200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className='col-lg-6 px-0 order-1 order-lg-2'>
                            <img src={sunGlassModel} className='w-100' />
                        </motion.div>
                    </div>
                    <div className='row'>
                        <motion.div initial={{ opacity: 0, x: "200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className='col-lg-6 px-0'>
                            <img src={readingGlass} className='w-100' />
                        </motion.div>
                        <motion.div initial={{ opacity: 0, x: "-200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className='col-lg-6 d-flex align-items-center'>
                            <div className='p-3'>
                                <h2 className='fw-bold fs-1'>Reading Glasses</h2>
                                <p className='fs-4 fw-light'>
                                    Reading glasses are a small yet indispensable tool that has a profound impact on the lives of countless individuals. </p>
                                <Link className='btn btn-outline-secondary btn-lg' to="/products/reading" style={{ borderRadius: "25px" }}>Browse Reading Glasses</Link>
                            </div>
                        </motion.div>
                    </div>

                </div>


            </section>

            <section className='white-bg overflow-hidden'>
                <div className='container-fluid'>
                    <div className='row'>
                        <motion.div initial={{ opacity: 0, x: "200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className="col-lg-6 p-0 position-relative " style={{ minHeight: "500px" }}>
                            <img src={eyeChart} className='img-fluid h-100 w-100 d-block position-absolute' style={{ objectFit: "cover" }} />
                            <div className='bg-dark bg-opacity-50 d-flex align-items-center justify-content-center h-100 position-relative ' style={{ zIndex: 2 }}>
                                <div className='text-center'>
                                    <h2 className='text-white text-center fw-bold'>Need An Eye Checkup?</h2>
                                    <Link className='btn btn-outline-light' to="https://www.facebook.com/ZarateVeranoOptical" style={{ borderRadius: "25px" }}>Book An Appointment</Link>
                                </div>

                            </div>

                        </motion.div>

                        <motion.div initial={{ opacity: 0, x: "-200px" }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} className="col-lg-6 p-0 position-relative" style={{ minHeight: "500px" }}>
                            <img src={opticalShop} className='img-fluid h-100 w-100 d-block position-absolute' style={{ objectFit: "cover", filter: "blur(2px)" }} />
                            <div className='bg-dark bg-opacity-25 d-flex align-items-center justify-content-center h-100 position-relative ' style={{ zIndex: 2 }}>
                                <div className='text-center'>
                                    <h2 className='text-white text-center fw-bold'>Browse All Of Our Products</h2>
                                    <Link className='btn btn-outline-light' to="/products" style={{ borderRadius: "25px" }}>Browse</Link>
                                </div>

                            </div>
                        </motion.div>

                    </div>

                </div>
            </section>



        </>
    )
}
