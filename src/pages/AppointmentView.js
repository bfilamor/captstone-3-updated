import React, { useEffect, useState } from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AdminLoader } from '../components/admin/loaders/AdminLoader';
import moment from 'moment';

export const AppointmentView = () => {
    const navigate = useNavigate();
    const { appointmentId } = useParams();
    const [appointmentData, setAppointmentData] = useState({});
    const [loading, setLoading] = useState(false);

    const { patientName, patientAddress, patientMobileNumber, patientEmail, appointmentDate, status, doctorName, bookingDate, timeSlot } = appointmentData;

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

    const fetchAppointmentData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/appointments/${appointmentId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await res.json();

            if (data) {
                setLoading(false);
                setAppointmentData(data);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        checkIfLoggedin();
    }, [])

    useEffect(() => {
        fetchAppointmentData();
    },[appointmentId])

    return (
        <>
            <Container className='py-5'>
                <Row className='justify-content-center'>
                    <div className='col-lg-10'>
                        <Card>
                            <Card.Body>
                                {(loading) ? <AdminLoader /> :
                                    <>
                                        <div className='row'>
                                            <div className='col-xxl-4 col-sm-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Appointment ID</p>
                                                <p className='fs-4'>{appointmentId}</p>
                                            </div>
                                            <div className='col-xxl-4 col-sm-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Appointment Status</p>
                                                <p className={`${(status === "cancelled") ? "text-danger" : (status === "pending") ? "text-warning" : "text-success"} fs-4 mt-0 text-capitalize fw-bold `}>{status}</p>
                                            </div>
                                            <div className='col-xxl-4 col-sm-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Booking Date</p>
                                                <p className='fs-4'>{moment(bookingDate).format("MMM D, YYYY")} </p>
                                            </div>
                                        </div>


                                        <div className='row'>
                                            <div className='col-xxl-4 col-sm-6 d-flex justify-content-end flex-column'>
                                                <p className='mb-0 fs-4 fw-bold'>Appointment Date</p>
                                                <p className='fs-4'>{moment(appointmentDate).format("MMM D, YYYY")} </p>
                                            </div>
                                            <div className='col-xxl-4 col-sm-6 d-flex justify-content-end flex-column'>
                                                <p className='mb-0 fs-4 fw-bold'>Time Slot</p>
                                                <p className='fs-4'>{timeSlot} </p>
                                            </div>
                                            <div className='col-xxl-4 col-sm-6 d-flex justify-content-end flex-column'>
                                                <p className='mb-0 fs-4 fw-bold'>Doctor Name</p>
                                                <p className='fs-4'>Dr. {doctorName} </p>
                                            </div>

                                        </div>

                                        <div className='row'>
                                            <div className='col-xxl-4 col-sm-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Patient Email</p>
                                                <p className='fs-4'>{patientEmail ? patientEmail : "Not Indicated"} </p>

                                            </div>
                                            <div className='col-xxl-4 col-sm-6 d-flex justify-content-end flex-column'>
                                                <p className='mb-0 fs-4 fw-bold'>Patient Mobile Number</p>
                                                <p className='fs-4'>{patientMobileNumber ? patientMobileNumber : "Not Indicated"} </p>
                                            </div>
                                        </div>

                                        <div className='row'>
                                            <div className='col-xxl-4 col-sm-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Patient Name</p>
                                                <p className='fs-4'>{patientName ? patientName : "Not Indicated"} </p>
                                            </div>
                                            <div className='col-xxl-4 col-sm-6'>
                                                <p className='mb-0 fs-4 fw-bold'>Patient Address</p>
                                                <p className='fs-4'>{patientAddress ? patientAddress : "Not Indicated"} </p>
                                            </div>
                                        </div>

                                    </>

                                }

                            </Card.Body>
                        </Card>

                        <div className='text-center py-3'>
                            <Link className='btn btn-primary btn-lg' to="/appointments">Go Back</Link>
                        </div>

                    </div>
                </Row>

            </Container>
        </>
    )
}
