import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Table, Form, InputGroup, Row } from 'react-bootstrap';
import { useValue } from '../../UserContext';
import { AdminLoader } from './AdminLoader';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { OrderDetailsAdmin } from './OrderDetailsAdmin';
import { motion } from "framer-motion"
import { OrdersDataGrid } from './OrdersDataGrid';
import { DatePicker } from '@mui/x-date-pickers';
import { DateRangeSelect } from '../orders/DateRangeSelect';

export const ManageOrders = () => {

    const navigate = useNavigate();
    const { user } = useValue();

    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    //const [searchTerm, setSearchTerm] = useState('');
    //const [orderStatus, setOrderStatus] = useState('active')
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredStartDate, setFilteredStartDate] = useState('');
    const [filteredEndDate, setFilteredEndDate] = useState('');



    const getProfile = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (data.isAdmin !== true || data.isAdmin === null) {
                        console.log(data.isAdmin)
                        navigate("/products")
                    }

                } else {
                    navigate("/products")
                }
            }).catch(error => console.log(error.message))
    }

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/orders/admin/all?startDate=${filteredStartDate ? filteredStartDate : ""}&endDate=${filteredEndDate ? filteredEndDate : ""}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`

                }
            })
            const data = await res.json();

            if (data) {
                setLoading(false)
                setOrdersData(data);
                setError(false);
            } else {
                setError(true)
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    const handleDateFilter = () => {
        //setPage(1);
        fetchOrders();
    }


    /* const ordersRow = ordersData.map((order) => {
        return (
            <motion.tr initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={order._id} style={{ verticalAlign: "middle" }}>
                <td> {order._id}</td>
                <td> {moment(order.purchasedOn).format("MMM D, YYYY")}</td>
                <td> {order.customerEmail}</td>
                <td> {order.customerName}</td>
                <td className={order.status === "cancelled" ? "text-danger" : "text-success"}>{order.status}</td>
                <td>₱{order.totalAmount}</td>
                <td className='text-center'>
                    <OrderDetailsAdmin orderId={order._id} orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
                </td>
            </motion.tr>
        )
    }) */


    useEffect(() => {
        fetchOrders();
        getProfile();

    }, [])

    useMemo(() => {
        setFilteredStartDate(startDate);
    }, [startDate])

    useMemo(() => {
        setFilteredEndDate(endDate);
    }, [endDate])


    return (
        (loading) ? <AdminLoader /> :
            <>
                <div className='py-3 border-bottom bg-white sticky-top'>
                    <Row className='justify-content-center align-items-end'>
                        <div className='col-lg-3 mb-3 mb-lg-0'>
                            <DateRangeSelect setStartDate={setStartDate} setEndDate={setEndDate} getUserOrders={fetchOrders} size={"md"} />
                        </div>
                        <div className='col-lg-3 mb-3 mb-lg-0'>
                            <p className='mt-0 mb-2'><strong>Start Date</strong></p>
                            <DatePicker slotProps={{ textField: { size: 'small' } }} value={startDate} className='w-100' onChange={(newValue) => setStartDate(newValue)} />

                        </div>
                        <div className='col-lg-3 mb-3 mb-lg-0'>
                            <p className='mt-0 mb-2'><strong>End Date</strong></p>
                            <DatePicker slotProps={{ textField: { size: 'small' } }} value={endDate} className='w-100' onChange={(newValue) => setEndDate(newValue)} />

                        </div>
                        <div className='col-lg-3'>
                            <div className='text-lg-start text-center'>
                                <Button onClick={() => { handleDateFilter() }}>Filter Dates</Button>
                            </div>

                        </div>
                    </Row>



                </div>
                {error ? <p className='fs-4 text-center py-5'>No Orders Found</p> :
                    <div style={{ overflowX: "auto", width: "100%" }}>
                        <div className='admin-data-grid-cont' style={{ minWidth: "1000px", height: 600, width: "100%" }}>
                            <OrdersDataGrid fetchOrders={fetchOrders} ordersData={ordersData} />
                        </div>

                    </div>


                }

            </>
    )
}
