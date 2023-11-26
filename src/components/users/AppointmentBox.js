import React from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AppointmentBox = ({ appointment }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                className='bg-light border overflow-hidden my-3 d-block p-3 shadow-sm'
                style={{ borderRadius: "15px" }} >
                <div className='row align-items-start'>
                    <div className='col-5'>
                        <p className='fw-bold mb-0'>Appointment ID</p>
                        <h4 className='fw-bold text-break'>{appointment._id}</h4>
                        <p className='mb-0 fw-bold'>Booking Date</p>
                        <p className='text-secondary'>{moment(appointment.bookingDate).format("MMM D, YYYY")}</p>
                    </div>
                    <div className='col-7 flex-column d-flex justify-content-end align-items-end'>
                        <p className='fw-bold mb-0'>Appointment Date</p>
                        <h4 className='fw-bold mb-0'>{moment(appointment.appointmentDate).format("MMM D, YYYY")}</h4>
                        <p className='fs-5 mb-0'>{appointment.timeSlot}</p>
                        <p className={appointment.status === "cancelled" ? "text-danger text-capitalize fw-bold" : appointment.status === "pending" ? "text-warning text-capitalize fw-bold" : "text-success text-capitalize fw-bold"}>{appointment.status}</p>
                        <Link className="btn btn-primary" to={`/appointments/${appointment._id}`}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg> View Appointment</Link>

                    </div>
                </div>
            </motion.div>
        </>
    )
}
