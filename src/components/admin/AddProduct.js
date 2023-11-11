import { useEffect, useMemo, useState } from "react"
import { Button, Modal, Form, FloatingLabel, CloseButton } from "react-bootstrap"
import Swal from "sweetalert2";
import { useValue } from "../../UserContext";
import axios from 'axios';

export const AddProduct = ({ fetchData }) => {
    //got fetchData by props drilling. this function came from the Products component then was passed into its child components

    /* const [productId, setProductId] = useState('');

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [stocks, setStocks] = useState(1); */
    const [categoriesArray, setCategoriesArray] = useState([]);
    //const [productPhoto, setProductPhoto] = useState('');

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        productPhoto: '',
        brand: '',
        stocks: 1,
        category: '',
        isPrescription: false,
    })
    const [showModal, setShowModal] = useState(false);
    const [changedProductPhoto, setChangedProductPhoto] = useState(false);
    const [uploadPreview, setUploadPreview] = useState();

    const { productsData } = useValue();



    const openModal = () => {
        //fetchData();
        setShowModal(true)
    }

    const fetchCategories = () => {
        const categoryMap = productsData?.map((product) => {
            return product.category;
        })

        const filteredCategories = [...new Set(categoryMap)];
        setCategoriesArray(filteredCategories);
        setProductData({ ...productData, category: filteredCategories[0] });
    }

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
        setProductData({
            name: '',
            description: '',
            price: '',
            productPhoto: '',
            brand: '',
            stocks: 1,
            category: categoriesArray[0],
            isPrescription: false,
            productPhoto: ""
        })
        setChangedProductPhoto(false);
        setUploadPreview("");
        /*  setName('');
         setDescription('');
         setPrice(0);
         setCategory("");
         setBrand("")
         setStocks(1)
         setProductPhoto(""); */
    }

    /* const addProduct = (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        fetch(`${process.env.REACT_APP_API_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                category: category,
                isPrescription: category === "prescription" ? true : false,
                stocks: stocks,
                brand: brand,

            }),
            productPhoto: productPhoto
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    Swal.fire({
                        title: 'Success!',
                        icon: "success",
                        text: "Product Sucessfully Added"
                    })

                    closeModal(e);
                    //reload products data every after product update
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error!',
                        icon: "error",
                        text: "Please try again"
                    })

                    closeModal(e);
                }


            }).catch(error => { console.log(error.message) })

    } */

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleImageUpload = (e) => {
        setProductData({ ...productData, productPhoto: e.target.files[0] });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('productPhoto', productData.productPhoto);
        formData.append('category', productData.category);
        formData.append('brand', productData.brand);
        formData.append('stocks', productData.stocks);
        if (productData.category === "prescription") {
            formData.append('isPrescription', true);
        } else {
            formData.append('isPrescription', false);
        }


        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/products`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            Swal.fire({
                title: 'Success!',
                icon: "success",
                text: "Product Sucessfully Added"
            })

            closeModal(e);
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
    };

    useMemo(() => {
        fetchCategories();
    }, [showModal])


    return (
        <>

            <div className="p-4">
                <Button variant="success" size="lg" onClick={() => openModal()}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg> Add Product</Button>

            </div>

            <Modal show={showModal}>
                <Form onSubmit={e => handleAddProduct(e)}>
                    <div className='fw-bold fs-4 pt-3 pe-3 d-flex justify-content-end'><CloseButton onClick={(e) => closeModal(e)} /></div>
                    <Modal.Header>
                        <Modal.Title>Add Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="card image-upload-card">
                            {(productData.productPhoto) ?
                                <>
                                    <img src={uploadPreview} className="img-fluid" />
                                </>
                                : null}
                            <div className="card-img-overlay d-flex align-items-center justify-content-center">
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <h3 className="text-center text-white">Upload Product Photo</h3>
                                </div>
                                {/* <FileBase style={{ opacity: 0 }}
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) => { setProductPhoto(base64) }} /> */}

                                <input type="file" name="productPhoto" onChange={(e) => {
                                    handleImageUpload(e);
                                    setChangedProductPhoto(true)
                                    setUploadPreview(URL.createObjectURL(e.target.files[0]))
                                }}
                                    accept="image/png, image/jpeg"
                                />


                            </div>
                        </div>


                        <FloatingLabel controlId="productName" label="Name" className="my-3">

                            <Form.Control type="text" name="name" value={productData.name} onChange={(e) => handleInputChange(e)} required />
                        </FloatingLabel>


                        <FloatingLabel controlId="productDescription" label="Description" className="my-3">
                            <Form.Control as="textarea"
                                style={{ height: '100px' }} name="description" value={productData.description} onChange={(e) => handleInputChange(e)} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="productCategory" label="Category" className="my-3">

                            <Form.Select name="category" onClick={(e) => { handleInputChange(e) }} onChange={(e) => { handleInputChange(e) }}>
                                {(categoriesArray.length < 3 || !categoriesArray) ?
                                    <>
                                        <option value="prescription">Prescription</option>
                                        <option value="sunglasses">Sunglasses</option>
                                        <option value="reading">Reading</option>
                                    </> :

                                    categoriesArray.map((item) => {
                                        return (
                                            <option value={item} key={item}>{item}</option>
                                        )
                                    })
                                }

                            </Form.Select>
                        </FloatingLabel>

                        <FloatingLabel controlId="productBrand" label="Brand" className="my-3">

                            <Form.Control type="text" name="brand" value={productData.brand} onChange={(e) => handleInputChange(e)} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="productStocks" label="Stocks" className="my-3">

                            <Form.Control type="number" name="stocks" value={productData.stocks} onChange={(e) => handleInputChange(e)} required />
                        </FloatingLabel>

                        <FloatingLabel controlId="productPrice" label="Price" className="my-3">
                            <Form.Control type="number" name="price" value={productData.price} onChange={(e) => handleInputChange(e)} required />
                        </FloatingLabel>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => closeModal(e)}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>

    )
}
