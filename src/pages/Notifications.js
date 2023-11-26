import { useEffect } from 'react';
import { Container, Card, Row } from 'react-bootstrap'
import { useValue } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import { NotificationsList } from '../components/navbar/NotificationsList';

export const Notifications = () => {
    const navigate = useNavigate();
    const {  showNotifications } = useValue();

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
        showNotifications();
    }, [])

    return (
        <>
            <Container className='py-5'>
                <h2 className='mb-3 text-center'>Notifications</h2>
                <Row className='justify-content-center'>
                    <div className='col-lg-7'>
                        <Card>
                            <NotificationsList/>
                        </Card>
                    </div>
                </Row>

            </Container>
        </>

    )
}
