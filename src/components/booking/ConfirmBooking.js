import React from 'react'
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

export const ConfirmBooking = ({ bookingProps, setStep, patientProfile }) => {

    const { selectedDate, selectedTimeSlot } = bookingProps;
    const { firstName, lastName, mobileNo, email } = patientProfile;

    return (
        <>
            <h3 className='fw-bold text-center mb-4'>Please confirm the details below</h3>

            <p className='text-center fs-5'>You booked an appointment for <strong>{moment(selectedDate).format('MMM DD, YYYY (dddd)')}</strong> </p>
            <p className='text-center fs-5'>Selected timeslot is at <strong>{selectedTimeSlot}</strong></p>

            <div className='text-center my-3'>
                <Button onClick={() => setStep(1)}><FontAwesomeIcon icon={faPenToSquare} /> Edit Booking Date</Button>
            </div>

            <hr/>

            <h4 className='fw-bold text-center mb-3'>Patient Information</h4>

            <p className='fs-5'><strong>Full Name:</strong> {`${firstName} ${lastName}`}</p>
            <p className='fs-5'><strong>Mobile Number:</strong> {mobileNo}</p>
            <p className='fs-5'><strong>Email Address:</strong> {email}</p>

            <div className='text-center my-3'>
                <Button onClick={() => setStep(2)}><FontAwesomeIcon icon={faPenToSquare} /> Edit Information</Button>
            </div>

            <hr/>
            
        </>
    )
}
