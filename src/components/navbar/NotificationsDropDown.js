import { useState, useEffect } from 'react';
import { Dropdown, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useValue } from '../../UserContext';
import { NotificationsList } from './NotificationsList';

export const NotificationsDropDown = () => {
    const {  showNotifications, notificationsCounter } = useValue();

    return (
        <>
            <Dropdown onToggle={() => showNotifications()} id="notificationsMenu">
                <Dropdown.Toggle variant="outline-dark" className='notification-btn py-0' id="notifications-dropdown">
                    <FontAwesomeIcon icon={faBell} />
                    {(notificationsCounter > 0) &&
                        <Badge bg='danger'>{notificationsCounter}</Badge>
                    }
                </Dropdown.Toggle>

                <Dropdown.Menu align={"end"}>
                    <div className='notification-cont'>
                        <NotificationsList />
                    </div>
                    <div className='text-center'>
                        <Dropdown.Item className='border-top border-2'>
                            <Link to="/notifications">Show All Notifications</Link>
                        </Dropdown.Item>
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </>

    )
}
