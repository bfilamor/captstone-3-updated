import { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export const BillingInformation = ({ billingDetailsProps }) => {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    //const [profile, setProfile] = useState(profileProp);
    const { firstName, setFirstName, lastName, setLastName, mobileNo, setMobileNo, address, setAddress, email, setEmail } = billingDetailsProps;

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
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setMobileNo(data.mobileNo);
                    setAddress(data.homeAddress);
                    setEmail(data.email);
                }
            }).catch(error => console.log(error.message))
    }

    useEffect(() => {
        //every page load retrieve profile details
        getProfile();
    }, [])

    return (
        <Form className='px-lg-4 pb-3 pb-lg-0'>
            <h3 className='fw-bold py-3'>Contact Information</h3>

            <div className='row'>
                <div className='col-lg-6'>
                    <FloatingLabel
                        controlId='email'
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control  type="email" placeholder="Email" value={email ?? ''} onChange={e => setEmail(e.target.value)} required />
                    </FloatingLabel>

                </div>
                <div className='col-lg-6'>
                    <FloatingLabel
                        controlId='mobileNumber'
                        label="Mobile Number"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Mobile Number" value={mobileNo ?? ''} onChange={e => setMobileNo(e.target.value)} required />
                    </FloatingLabel>

                </div>
            </div>

            <h3 className='fw-bold py-3'>Billing Information</h3>

            <div className='row'>
                <div className='col-lg-6'>
                    <FloatingLabel
                        controlId='firstName'
                        label="First Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="First Name" value={firstName ?? ''} onChange={e => setFirstName(e.target.value)} required />
                    </FloatingLabel>

                </div>
                <div className='col-lg-6'>
                    <FloatingLabel
                        controlId='lastName'
                        label="Last Name"
                        className="mb-3"
                    >
                        <Form.Control type="text" placeholder="Last Name" value={lastName ?? ''} onChange={e => setLastName(e.target.value)} required />
                    </FloatingLabel>

                </div>
            </div>


            <FloatingLabel
                controlId='address'
                label="Billing Address"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="Last Name" value={address ?? ''} onChange={e => setAddress(e.target.value)} required />
            </FloatingLabel>




            {
                message && error === true ? <div className="alert alert-danger">{message}</div> : message && error === false ? <div className="alert alert-success">{message} </div> : null

            }
        </Form>
    )
}
