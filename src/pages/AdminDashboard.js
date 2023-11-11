import { useEffect } from 'react';
import { useValue } from '../UserContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AdminView } from '../components/admin/AdminView';
import { Container, Nav, Tab } from 'react-bootstrap';
import { AdminTools } from '../components/admin/AdminTools';
import { ManageOrders } from '../components/admin/ManageOrders';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, fetchData, isLoggedIn } = useValue();

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
                        navigate("/products")
                    } 
                   
                } else {
                    navigate("/products")
                }
            }).catch(error => console.log(error.message))
    }

    useEffect(() => {
        //invoke on every reload
        getProfile();
        fetchData();
    }, [])

    return (
        <>
            <Tab.Container defaultActiveKey="first">
                <div className='row m-0'>
                    <div className='col-lg-3 min-vh-100  bg-dark text-white' id="dashBoardSideBar">
                        <div className='py-4 p-3 position-sticky top-0'>
                            <h2 className='mb-5 fw-bold'>Admin Dashboard</h2>
                            <Nav variant="pills" className="flex-column mb-3 pb-3 border-bottom">
                                <Nav.Item>
                                    <Link className='text-white fs-5 nav-link' to="/">
                                        View Home Page
                                    </Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className='text-white fs-5' eventKey="first">Products</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link className='text-white fs-5' eventKey="second">Manage Orders</Nav.Link>
                                </Nav.Item>

                                <Nav.Item>
                                    <Nav.Link className='text-white fs-5' eventKey="third">Admin Tools</Nav.Link>
                                </Nav.Item>

                            </Nav>
                            <Link to="/logout" className='text-white  mt-3 ' style={{ textDecoration: "none" }}>Logout</Link>

                        </div>


                    </div>
                    <div className='col-lg-9'>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AdminView />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ManageOrders />
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <AdminTools />
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>


        </>


    )
}
