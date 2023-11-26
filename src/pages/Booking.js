import React, { useEffect, useState } from 'react';
import { Button, Container, Row , ProgressBar} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { BookingStep } from '../components/booking/BookingStep';
import { PatientProfile } from '../components/booking/PatientProfile';
import { ConfirmBooking } from '../components/booking/ConfirmBooking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

export const Booking = () => {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [step, setStep] = useState(1);
    const [doctorName, setDoctorName] = useState('');

    const initialPatientValues = {
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: ""
    }

    const [patientProfile, setPatientProfile] = useState(initialPatientValues);

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


    const nextThirtyDays = () => {
        const today = new Date();
        const next30Days = [];

        for (let i = 0; i < 30; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i);
            next30Days.push(nextDay);
        }

        return next30Days;
    }

    const addBooking = async () => {
        try {

            const res = await fetch(`${process.env.REACT_APP_API_URL}/doctors/addBooking/6553b0e3b7bbf058fa7ca50b`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    patientName: `${patientProfile.firstName} ${patientProfile.lastName}`,
                    patientEmail: patientProfile.email,
                    patientMobileNumber: patientProfile.mobileNo,
                    date: selectedDate,
                    timeSlot: selectedTimeSlot
                })
            })

            const data = await res.json();

            if (data) {
                Swal.fire({
                    title: "Booking Successful",
                    icon: "success",
                    text: "Please wait for the doctor to approve your booking"
                })
                navigate("/appointments");
            }

        } catch (error) {
            console.log(error.message)
        }

    }


    useEffect(() => {
        checkIfLoggedin();
    }, [])

    const bookingProps = { setSelectedDate, selectedDate, selectedTimeSlot, setSelectedTimeSlot, setDoctorName }

    return (
        <>
            <section>
           
                <Container fluid>  
                    <Row className='min-vh-100' id="bookingPageRow">
                        <div className='col-lg-7'>
                            <div className='row py-5 pe-lg-5 justify-content-lg-end'>
                                <div className='col-lg-10'>
                                    <h3 className='fw-bold mb-3'>You are booking an appointment with<span className='d-lg-block'> Dr. {doctorName}</span></h3>
                                    <p className='fs-5'>Please select your prefered date and time, and make sure you entered the correct details.</p>
                                    <p className='fs-5'>Minimum appointment fee is <strong>₱500/session</strong>. You can pay in cash or thru your prefered payment method after the appointment.</p>
                                    <p className='fs-5'>Please arrive at least <strong>30 minutes</strong> before the booked timeslot.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-5 bg-light'>
                            <div className='p-lg-5 p-3 py-5'>
                                {(step === 1) &&
                                    <BookingStep bookingProps={bookingProps} />
                                }

                                {(step === 2) &&
                                    <PatientProfile patientProfile={patientProfile} setPatientProfile={setPatientProfile} />
                                }

                                {(step === 3) &&
                                    <ConfirmBooking bookingProps={bookingProps} setStep={setStep} patientProfile={patientProfile} />
                                }

                                <div className='text-center py-3'>
                                    <div className='d-flex gap-1 justify-content-center'>
                                        {(step > 1 && step < 3) &&
                                            <div>
                                                <Button size='lg' onClick={() => setStep((prev) => prev - 1)}>Back</Button>
                                            </div>
                                        }
                                        {(step < 3) &&
                                            <div>
                                                <Button disabled={selectedTimeSlot ? false : true} size='lg' onClick={() => selectedTimeSlot && setStep((prev) => prev + 1)}>Proceed</Button>
                                            </div>
                                        }
                                    </div>
                                    {(step === 3) &&
                                        <div className='d-xxl-flex gap-2'>
                                            <Button className='d-block w-100 mb-3' size='lg' variant='success' disabled={selectedTimeSlot ? false : true} onClick={() => addBooking()}><FontAwesomeIcon icon={faCalendarCheck} className='me-2' />Confirm Booking</Button>
                                            <Link className="btn btn-danger btn-lg d-block w-100 mb-3" to="/">
                                                <FontAwesomeIcon icon={faCalendarXmark} className='me-2' />Cancel Booking
                                            </Link>
                                        </div>
                                    }

                                </div>
                            </div>

                        </div>
                    </Row>
                </Container>
                <ProgressBar className='sticky-bottom' now={step === 1 && selectedTimeSlot ? 25 : step === 2 ? 50 : step === 3  ? 100 : 0} style={{ height: "8px", borderRadius: 0 }} />
            </section>

        </>
    )
}
