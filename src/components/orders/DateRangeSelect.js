import React from 'react';
import { Form } from 'react-bootstrap';
import moment from 'moment';

export const DateRangeSelect = ({ setEndDate, setStartDate, getUserOrders, size }) => {
    const handleDateRange = (e) => {
        const now = new Date();
        let dateRange = e.target.value;
        let days = 0
        setEndDate(moment(now))
        if (dateRange == "today") {
            days = 0
        } else if (dateRange == "yesterday") {
            days = 1
        } else if (dateRange == "threeDaysAgo") {
            days = 3
        } else if (dateRange == "lastWeek") {
            days = 7
        } else if (dateRange == "twoWeeksAgo") {
            days = 14
        } else if (dateRange == "oneMonthAgo") {
            days = 30
        }
        setStartDate(moment(new Date(now.getFullYear(),
            now.getMonth(),
            now.getDate() - days)))

        if (dateRange == "default") {
            setStartDate(null);
            setEndDate(null);
            getUserOrders();
        }
    }

    return (
        <Form.Select size={size} className='fw-bold' onClick={(e) => { handleDateRange(e) }} onChange={(e) => { handleDateRange(e) }}>
            <option value="default">Select Date Range</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="threeDaysAgo">Last 3 Days</option>
            <option value="lastWeek">Last Week</option>
            <option value="twoWeeksAgo">Last Two Weeks</option>
            <option value="oneMonthAgo">Last Month</option>
        </Form.Select>
    )
}
