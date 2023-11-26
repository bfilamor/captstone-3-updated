import React, { useEffect } from 'react'
import { NotificationItem } from './NotificationItem'
import { useValue } from '../../UserContext';
import { useLocation } from 'react-router-dom';

export const NotificationsList = () => {
    const location = useLocation();
    const { notifications, getNotifications } = useValue();

    useEffect(() => {
        if (location.pathname !== "/notifications") {
            getNotifications();
        }       
    }, [])
    return (
        (notifications?.length > 0) ?
            notifications?.map((notification) => (
                <NotificationItem key={notification._id} notification={notification} />
            )) : <p className='text-center py-3'>No Notifications to Show</p>

    )
}
