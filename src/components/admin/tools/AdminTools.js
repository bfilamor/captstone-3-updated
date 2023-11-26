import { useContext, useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap'
import { EditProduct } from '../products/EditProduct'
import { ArchiveProduct } from '../products/ArchiveProduct'
import { ActivateProduct } from '../products/ActivateProduct';
import { useValue } from '../../../UserContext';
import { FeatureProduct } from '../products/FeatureProduct';
import { UnfeatureProduct } from '../products/UnfeatureProduct';
import { AddProduct } from '../products/AddProduct';
import { AddAdminUser } from './AddAdminUser';

export const AdminTools = () => {

    const { productsData, fetchData } = useValue();
    //got fetchData from props drilling from Producs Component 
    const [adminUsers, setAdminUsers] = useState([]);

    const fetchAllAdmin = () => {
        fetch(`${process.env.REACT_APP_API_URL}/users/admin/all`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data) {
                    setAdminUsers(data.reverse());
                }


            }).catch(error => console.log(error.message))

    }

    useEffect(() => {
        fetchAllAdmin();
    }, [])
    return (
        <>
            <AddAdminUser fetchAllAdmin={fetchAllAdmin}/>

            <Table className='text-center' responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>                     
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        adminUsers.map((admin) => {
                            return (
                                <tr key={admin._id}>
                                    <td>{admin._id}</td>
                                    <td>{admin.firstName}</td>
                                    <td>{admin.lastName}</td>
                                    <td>{admin.email}</td>
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>



        </>
    )
}
