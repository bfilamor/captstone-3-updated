import { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export const PatientProfile = ({ patientProfile, setPatientProfile }) => {

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    //const [profile, setProfile] = useState(profileProp);
    const { firstName, lastName, mobileNo, email, setEmail } = patientProfile;

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
                    setPatientProfile({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        mobileNo: data.mobileNo,
                        email: data.email
                    })
                }
            }).catch(error => console.log(error.message))
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setPatientProfile({ ...patientProfile, [name]: value })
    }

    useEffect(() => {
        //every page load retrieve profile details
        getProfile();
    }, [])

    return (
        <Form className='px-lg-4 pb-3 pb-lg-0'>
            <h3 className='fw-bold pb-3'>Contact Information</h3>

            <FloatingLabel
                controlId='email'
                label="Email"
                className="mb-3"
            >
                <Form.Control type="email" name='email' placeholder="Email" value={email} onChange={e => handleInputChange(e)} required />
            </FloatingLabel>

            <FloatingLabel
                controlId='mobileNumber'
                label="Mobile Number"
                className="mb-3"
            >
                <Form.Control type="text" name='mobileNo' placeholder="Mobile Number" value={mobileNo} onChange={e => handleInputChange(e)} required />
            </FloatingLabel>

            <h3 className='fw-bold py-3'>Patient Information</h3>

            <FloatingLabel
                controlId='firstName'
                label="First Name"
                className="mb-3"
            >
                <Form.Control type="text" name='firstName' placeholder="First Name" value={firstName} onChange={e => handleInputChange(e)} required />
            </FloatingLabel>

            <FloatingLabel
                controlId='lastName'
                label="Last Name"
                className="mb-3"
            >
                <Form.Control type="text" name='lastName' placeholder="Last Name" value={lastName} onChange={e => handleInputChange(e)} required />
            </FloatingLabel>


            {
                message && error === true ? <div className="alert alert-danger">{message}</div> : message && error === false ? <div className="alert alert-success">{message} </div> : null

            }
        </Form>
    )
}
