import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Nav, Row, Tab } from 'react-bootstrap';
import AppointmentsList from '../components/users/AppointmentsList';

export const Appointments = () => {
    const navigate = useNavigate();

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



    useEffect(() => {
        checkIfLoggedin();
    }, [])
    return (
        <>
            <Container className='py-5'>
                <h2 className='text-center mb-3'>My Appointments</h2>
                <Row className='justify-content-center'>
                    <div className='col-lg-10'>
                        <Tab.Container defaultActiveKey="approved">
                            <Nav variant="underline" className=' mb-3 border-bottom justify-content-center d-flex'>
                                {
                                    statusList.map((status, index) => (
                                        <Nav.Item key={index}>
                                            <Nav.Link className='fs-5 flex-1' eventKey={status.name}>{status.label}</Nav.Link>
                                        </Nav.Item>
                                    ))
                                }
                            </Nav>
                            <Tab.Content>
                                {
                                    statusList.map((status, index) => (
                                        <Tab.Pane eventKey={status.name} key={index} >
                                            <AppointmentsList status={status} />
                                        </Tab.Pane>
                                    ))
                                }
                            </Tab.Content>
                        </Tab.Container>

                    </div>
                </Row>

            </Container>

        </>
    )
}
