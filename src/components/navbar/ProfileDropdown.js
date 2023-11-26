import { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faHeart, faHistory, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'

export const ProfileDropdown = () => {
    const [profile, setProfile] = useState({});

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
                    //console.log(data);
                    setProfile({
                        firstName: data.firstName,
                    })

                }
            }).catch(error => console.log(error.message))
    }

    useEffect(() => {
        //every page load retrieve profile details
        getProfile();
    }, [])

    return (
        <>
            <div className='d-flex align-items-center' id="navDropdownCont">
                <div className='d-none d-xl-block'>
                    <div className='rounded-circle bg-dark text-white text-center d-flex justify-content-center align-items-center' style={{ width: "35px", height: "35px" }}>
                        <span className='fw-bold text-uppercase'>{profile?.firstName?.charAt(0)}</span>
                    </div>
                </div>
                <NavDropdown id="navDropdown"
                    title={profile?.firstName ? profile?.firstName : "Profile"}
                    align={"end"}
                    
                >
                    <NavDropdown.Item  className='d-flex gap-2 py-2 pe-lg-5' as={NavLink} to="/profile" exact="true"><span className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: "30px", height: "30px", background:"#ccc" }}><FontAwesomeIcon icon={faUser} /></span> <span>Profile</span></NavDropdown.Item>
                    <NavDropdown.Item className='d-flex gap-2 py-2 pe-lg-5' as={NavLink} to="/orders" exact="true"><span className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: "30px", height: "30px", background:"#ccc" }}><FontAwesomeIcon icon={faHistory} /></span> <span>Transaction History</span></NavDropdown.Item>
                    <NavDropdown.Item className='d-flex gap-2 py-2 pe-lg-5' as={NavLink} to="/saved-products" exact="true"><span className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: "30px", height: "30px", background:"#ccc" }}><FontAwesomeIcon icon={faHeart} /></span> <span>Saved Products</span></NavDropdown.Item>
                    <NavDropdown.Item className='d-flex gap-2 py-2 pe-lg-5' as={NavLink} to="/appointments" exact="true"><span className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: "30px", height: "30px", background:"#ccc" }}><FontAwesomeIcon icon={faCalendar} /></span> <span>Appointments</span></NavDropdown.Item>
                    <NavDropdown.Item  className='d-none d-lg-flex gap-2 py-2 pe-lg-5' as={NavLink} to="/logout" exact="true"><span className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: "30px", height: "30px", background:"#ccc" }}><FontAwesomeIcon icon={faSignOutAlt} /></span> <span>Logout</span></NavDropdown.Item>
                </NavDropdown>


            </div>


        </>

    )
}
