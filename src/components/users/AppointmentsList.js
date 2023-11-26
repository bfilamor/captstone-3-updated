import React, { useEffect, useState } from 'react'
import { AppointmentBox } from './AppointmentBox'
import { AdminLoader } from '../admin/loaders/AdminLoader';

const AppointmentsList = ({ status }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAppointments = async () => {
        setLoading(true);
        try {
            let token = localStorage.getItem("token");
            const res = await fetch(`${process.env.REACT_APP_API_URL}/appointments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const appointmentsData = await res.json();
            if (appointmentsData) {
                setLoading(false);
                setAppointments(appointmentsData);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getAppointments();
    }, [])

    return (
        (loading) ? <AdminLoader /> :
            (appointments?.length > 0) ?
                (appointments?.filter((appointment) => appointment.status === status.name).length === 0) ? <p className='text-center'>No Appointments Found</p> :
                    appointments?.map((appointment) => (
                        (status.name === appointment.status) &&
                        <AppointmentBox key={appointment._id} appointment={appointment} />
                    ))
                : <p className='py-3 text-center'>No Appointments Found.</p>

    )
}

export default AppointmentsList