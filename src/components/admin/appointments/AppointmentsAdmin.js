import { useContext, useEffect, useMemo, useState } from 'react';
import { Button, Table, Form, InputGroup, Row, Nav, Tab } from 'react-bootstrap';
import { useValue } from '../../../UserContext';
import { AdminLoader } from '../loaders/AdminLoader';
import { useNavigate } from 'react-router-dom';
import { AppointmentsDataGrid } from './AppointmentsDataGrid';

export const AppointmentsAdmin = () => {

    const navigate = useNavigate();
    const { user } = useValue();

    const [appointmentsData, setAppointmentsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filteredStartDate, setFilteredStartDate] = useState('');
    const [filteredEndDate, setFilteredEndDate] = useState('');

    const statusList = [
        {
            name: "approved",
            label: "Upcoming"
        },
        {
            name: "pending",
            label: "Pending"
        },
        {
            name: "cancelled",
            label: "Cancelled"
        },
        {
            name: "completed",
            label: "Completed"
        }
    ];


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
                        //console.log(data.isAdmin)
                        navigate("/products")
                    }

                } else {
                    navigate("/products")
                }
            }).catch(error => console.log(error.message))
    }

    const fetchAppointments = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/appointments/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`

                }
            })
            const data = await res.json();

            if (data) {
                setLoading(false)
                setAppointmentsData(data);
                setError(false);
            } else {
                setError(true)
            }

        } catch (error) {
            console.log(error.message);
        }

    }

    useEffect(() => {
        fetchAppointments();
        getProfile();

    }, [])



    return (
        (loading) ? <AdminLoader /> :
            <>

                {error ? <p className='fs-4 text-center py-5'>No Appointments Found</p> :
                    <>
                        <Tab.Container defaultActiveKey="approved">
                            <Nav variant="underline" className='mt-5 mb-3 border-bottom d-flex'>
                                {
                                    statusList.map((status, index) => (
                                        <Nav.Item key={index}>
                                            <Nav.Link className='fs-5' eventKey={status.name}>{status.label}</Nav.Link>
                                        </Nav.Item>
                                    ))
                                }
                            </Nav>
                            <Tab.Content>
                                {statusList.map((status, index) => (
                                    <Tab.Pane eventKey={status.name} key={index} >
                                        <div style={{ overflowX: "auto", width: "100%" }}>
                                            <div className='admin-data-grid-cont' style={{ minWidth: "1000px", height: 400, width: "100%" }}>
                                                <AppointmentsDataGrid fetchAppointments={fetchAppointments} appointmentsData={appointmentsData} filteredStatus={status.name} />
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                ))}

                            </Tab.Content>
                        </Tab.Container>

                        <h3 className='mt-3 mb-3 fw-bold text-center'>All Appointments</h3>
                        <div style={{ overflowX: "auto", width: "100%" }}>
                            <div className='admin-data-grid-cont' style={{ minWidth: "1000px", height: 400, width: "100%" }}>
                                <AppointmentsDataGrid fetchAppointments={fetchAppointments} appointmentsData={appointmentsData} filteredStatus="none" />
                            </div>

                        </div>
                    </>
                }

            </>
    )
}
