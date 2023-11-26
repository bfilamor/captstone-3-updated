import { useEffect, useMemo, useState } from 'react';
import { Button, Container, Modal, CloseButton, Card, Table, Form } from 'react-bootstrap'
import moment from 'moment';
import Swal from 'sweetalert2';

export const AppointmentDetailsAdmin = ({ appointment, fetchAppointments }) => {
    const { _id, patientName, patientEmail, patientMobileNumber, appointmentDate, timeSlot, status, bookingDate } = appointment;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appointmentStatus, setAppointmentStatus] = useState("");


    const openModal = () => {
        setIsModalOpen(true);
        setAppointmentStatus(status);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setAppointmentStatus("");
    }

    const handleAppoval = async (status) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/appointments/updateStatus/${appointment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    status: status
                })
            })

            const data = await res.json();

            if (data) {
                //fetchAppointmentData();
                Swal.fire({
                    title: "Status Succesfully Changed",
                    icon: "success",
                    text: "This will reflect to the customer immediately"
                })
                //setAppointmentStatus('');
                fetchAppointments();
                pushNotifcation(appointment._id, status);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const pushNotifcation = async (appointmentId, status) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/appointments/addNotification/${appointmentId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    status: status
                })
            })

        } catch (error) {
            console.log(error.message)
        }
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
                        <Card className='p-lg-5 p-3'>
                            <Card.Body>
                                <div className='row'>
                                    <div className='col-lg-6'>

                                        <p className='mb-0 fs-4 fw-bold'>Appointment ID</p>
                                        <h2>{_id}</h2>

                                        <p className='mb-0 fs-4 fw-bold'>Booking Date</p>
                                        <p className='fs-4'>{bookingDate ? moment(bookingDate).format("MMM D, YYYY") : null} </p>


                                        <p className='mb-0 fs-4 fw-bold'>Patient Name</p>
                                        <p className='fs-4'>{patientName}</p>

                                        <p className='mb-0 fs-4 fw-bold'>Patient Mobile Number</p>
                                        <p className='fs-4'>{patientMobileNumber ? patientMobileNumber : "Not Indicated"}</p>


                                        <p className='mb-0 fs-4 fw-bold'>Patient Email</p>
                                        <p className='fs-4'>{patientEmail}</p>


                                    </div>
                                    <div className='col-lg-6'>

                                        <p className='mb-0 fs-4 fw-bold'>Appointment Date</p>
                                        <p className='fs-4'>{moment(appointmentDate).format("MMM D, YYYY")} </p>

                                        <p className='mb-0 fs-4 fw-bold'>Time Slot</p>
                                        <p className='fs-4'>{timeSlot}</p>

                                        <p className='mb-0 fs-4 fw-bold'>Appointment Status</p>


                                        <p className={(status === "cancelled") ? "fs-4 mt-0 text-danger text-capitalize" : (status === "pending") ? "fs-4 mt-0 text-warning text-capitalize" : "fs-4 mt-0 text-success text-capitalize"}><strong>{status}</strong></p>

                                        {(status === "pending") &&
                                            <div className='row justify-content-center text-center'>
                                                <div className='col-auto'>
                                                    <Button size='lg' onClick={() => handleAppoval("cancelled")} variant='danger'>Decline</Button>
                                                </div>
                                                <div className='col-auto'>
                                                    <Button size='lg' onClick={() => handleAppoval("approved")} variant='success'>Approve</Button>
                                                </div>
                                            </div>
                                        }
                                        {(status  === "approved") ?
                                            <div className='text-center'>
                                                <Button variant='success' size='lg' onClick={() => handleAppoval("completed")} >Accomplish Appointment</Button>
                                            </div> : null
                                        }


                                    </div>
                                </div>

                            </Card.Body>

                        </Card>

                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}



