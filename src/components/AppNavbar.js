import { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { NavLink, useLocation } from 'react-router-dom';
import { useValue } from '../UserContext';
import { CartToggler } from './cart/CartToggler';
import logo from '../images/logo.png'
import { ProfileDropdown } from './ProfileDropdown';
import NavBarToggler from './NavBarToggler';

export default function AppNavbar() {

    const location = useLocation();

    const { user } = useValue();
    //const location = useLocation();

    // const navigate = useNavigate();


    return (
        (location.pathname !== "/dashboard") ?
            <>
                <Navbar className='border-bottom' id="navBar" bg="light" sticky="top" expand="lg" >
                    <Container fluid>

                        <Navbar.Brand className='d-block d-lg-none' as={NavLink} to="/" exact="true">
                            <img src={logo} className='img-fluid' style={{ width: "150px" }} />
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" id="customNavbarToggler" children={<NavBarToggler/>}/>
                        <Navbar.Collapse className='position-relative' id="basic-navbar-nav">
                            <Nav className="mx-auto align-items-lg-center">
                                <Nav.Link as={NavLink} to="/products" exact="true">All Products</Nav.Link>
                                <Nav.Link as={NavLink} to="/products/prescription" exact="true">Prescription</Nav.Link>
                                <Navbar.Brand className='mx-4 d-none d-lg-block' as={NavLink} to="/" exact="true">
                                    <img src={logo} className='img-fluid' style={{ width: "150px" }} />
                                </Navbar.Brand>
                                <Nav.Link as={NavLink} to="/products/sunglasses" exact="true">Sunglasses</Nav.Link>
                                <Nav.Link as={NavLink} to="/products/reading" exact="true">Reading</Nav.Link>


                            </Nav>

                            <Nav className="ms-auto right-side-nav-controllers">
                                {(user.isAdmin === true) ?
                                    <>
                                        <Nav.Link as={NavLink} to="/dashboard" exact="true">Dashboard</Nav.Link>

                                    </>

                                    :
                                    null
                                }

                                {(user.id != null) ?
                                    <>
                                        {(user.isAdmin !== true) ? <>
                                            <ProfileDropdown/>
                                            <div className='d-none d-lg-block'>
                                                <CartToggler />
                                            </div>
                                        </> : null}

                                        <Nav.Link className='d-block d-lg-none' as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                                        <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                                    </>

                                }

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                {(user.id != null) ?
                <div className='d-block d-lg-none bg-light rounded-4 border p-1 bg-opacity-50' id="mobileCartBtn">
                    <CartToggler />
                </div> : null }
            </>
            : null
    )
}
