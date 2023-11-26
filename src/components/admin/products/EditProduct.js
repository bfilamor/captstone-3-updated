import { useEffect, useState } from "react"
import { Button, Modal, Form, FloatingLabel, CloseButton } from "react-bootstrap"
import Swal from "sweetalert2";
import { useValue } from "../../../UserContext";
import FileBase from 'react-file-base64';
import axios from 'axios';

export const EditProduct = ({ productIdProp, fetchData }) => {
    //got fetchData by props drilling. this function came from the Products component then was passed into its child components

    const [productId, setProductId] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [stocks, setStocks] = useState(1);
    const [categoriesArray, setCategoriesArray] = useState([]);
    const [productPhoto, setProductPhoto] = useState("");

    const [showEdit, setShowEdit] = useState(false);
    const [changedProductPhoto, setChangedProductPhoto] = useState(false);
    const [uploadPreview, setUploadPreview] = useState();

    const { productsData } = useValue();

    const openEdit = (productIdProp) => {
        const categoryMap = productsData.map((product) => {
            return product.category;
        })

        const filteredCategories = [...new Set(categoryMap)];
        setCategoriesArray(filteredCategories);

        fetch(`${process.env.REACT_APP_API_URL}/products/${productIdProp}`)
            .then(res => res.json())
            .then(data => {
                //set productidProp as productId state 
                //setProductId(productIdProp);
                setName(data.name);
                setDescription(data.description);
                setPrice(data.price);
                setBrand(data.brand);
                setStocks(data.stocks);
                setCategory(data.category);
                if (data.productPhoto) {
                    setProductPhoto(data.productPhoto);
                }

            })
        setShowEdit(true)

    }


    const closeEdit = (e) => {
        e.preventDefault()
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice(0);
        setCategory("");
        setBrand("")
        setStocks(1)
        setProductPhoto("");
        setChangedProductPhoto(false);
        setUploadPreview("");
    }

    const editProduct = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            if (changedProductPhoto) {
                formData.append('productPhoto', productPhoto);
            }
            formData.append('category', category);
            formData.append('brand', brand);
            formData.append('stocks', stocks);
            if (category === "prescription") {
                formData.append('isPrescription', true);
            } else {
                formData.append('isPrescription', false);
            }

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/products/${productIdProp}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });


            Swal.fire({
                title: 'Success!',
                icon: "success",
                text: "Product Sucessfully Updated"
            })

            closeEdit(e);
            setChangedProductPhoto(false);
            setUploadPreview("");
            //reload products data every after product update
            fetchData();

        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: 'Error!',
                icon: "error",
                text: "Please try again"
            })
        }

    }




    return (
        <>
            <Button variant="primary" sizes="sm" onClick={() => openEdit(productIdProp)}>Edit</Button>
            <Modal show={showEdit}>
                <Form onSubmit={e => editProduct(e)}>
                    <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeEdit(e)} /></div>
                    <Modal.Header>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="card image-upload-card bg-dark">
                            {(productPhoto && productPhoto !== "false") ?
                                <>
                                    {(!changedProductPhoto) ?
                                        <img src={`${process.env.REACT_APP_API_URL}/images/${productPhoto}`} className='img-fluid' /> :
                                        <img src={uploadPreview} className="img-fluid" />
                                    }
                                </>
                                : null}
                            <div className="card-img-overlay d-flex align-items-center justify-content-center">
                           
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <h3 className="text-center text-white">Update Product Photo</h3>
                                </div>

                                <input type="file" name="productPhoto" onChange={(e) => {
                                    setChangedProductPhoto(true); setProductPhoto(e.target.files[0]);
                                    setUploadPreview(URL.createObjectURL(e.target.files[0]))
                                }} accept="image/png, image/jpeg" />
                            </div>
                        </div>

                        <FloatingLabel controlId="productName" label="Name" className="my-3">

                            <Form.Control name="name" type="text" value={name} onChange={e => setName(e.target.value)} required />
                        </FloatingLabel>




                        <FloatingLabel controlId="productDescription" label="Description" className="my-3">

                            <Form.Control name="description" type="text" as="textarea" style={{ height: "100px" }} value={description} onChange={e => setDescription(e.target.value)} required />
                        </FloatingLabel>


                        <FloatingLabel controlId="productCategory" label="Category" className="my-3">

                            <Form.Select name="category" value={category} onChange={(e) => { setCategory(e.target.value); }}>
                                {categoriesArray.map((item) => {
                                    return (
                                        <option value={item} key={item}>{item}</option>
                                    )
                                })}

                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel controlId="productBrand" label="Brand" className="my-3">

                            <Form.Control name="brand" type="text" value={brand} onChange={e => setBrand(e.target.value)} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="productStocks" label="Stocks" className="my-3">

                            <Form.Control name="stocks" type="number" value={stocks} onChange={e => setStocks(e.target.value)} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="productPrice" label="Price" className="my-3">
                            <Form.Control name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
                        </FloatingLabel>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => closeEdit(e)}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>

    )
}
