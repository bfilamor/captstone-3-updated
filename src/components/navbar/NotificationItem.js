import React from 'react';
import moment from 'moment';
import { Dropdown } from 'react-bootstrap';
import { useValue } from '../../UserContext';

export const NotificationItem = ({ notification }) => {
    const { readNotification } = useValue();
    return (
        <>
            <Dropdown.Item href={`/appointments/${notification.appointmentId}`}
                className={`${notification.isOld === false ? "bg-light" : "bg-white"} ${notification.isRead === false ? "fw-bold" : "fw-normal"} p-3 border-bottom text-dark`}
                onClick={() => readNotification(notification._id)}
            >
                <p className='mb-0 mt-0'>Your appointment on <strong>{moment(notification.appointmentDate).format("MMM DD, YYYY")}</strong> at <strong>{notification.timeSlot}</strong> was <span className={`${notification.status === "approved" ? "text-success" : "text-danger"} fw-bold`}>{notification.status === "approved" ? notification.status : "declined"}</span> by Dr. <span className='text-capitalize'>{notification.doctorName}</span></p>
                <p className='text-secondary mb-0'>{moment(notification.date).format("MMM DD, YYYY")}</p>
            </Dropdown.Item>
        </>
    )
}
