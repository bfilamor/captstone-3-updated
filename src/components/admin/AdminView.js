import { useContext, useEffect, useState, useMemo } from 'react';
import { Button, Table, Form, InputGroup, Row, Container } from 'react-bootstrap'
import { Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { EditProduct } from './EditProduct'
import { ArchiveProduct } from './ArchiveProduct'
import { ActivateProduct } from './ActivateProduct';
import { useValue } from '../../UserContext';
import { FeatureProduct } from './FeatureProduct';
import { UnfeatureProduct } from './UnfeatureProduct';
import { AddProduct } from './AddProduct';
import { AdminLoader } from './AdminLoader';
import { motion } from 'framer-motion';
import { ProductsSort } from '../products/ProductsSort';
import { SelectProductCategory } from './SelectProductCategory';
import { ProductStatusFilter } from './ProductStatusFilter';

export const AdminView = () => {

    const { user } = useValue();

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filterQuery, setFilterQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("&category=");
    const [productStatusFilter, setProductStatusFilter] = useState("&availability=");
    const [page, setPage] = useState(1);
    const [searchPageNumber, setSearchPageNumber] = useState(1);
    const [paginationPages, setPaginationPages] = useState([]);
    const [searchMode, setSearchMode] = useState(false);


    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/admin/all?page=${page}&searchTerm=${searchParams.get("searchTerm") ? searchParams.get("searchTerm") : ""}${filterQuery}${categoryFilter}${productStatusFilter}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const prodData = await res.json();
            //console.log(prodData.data)

            if (prodData) {
                setSearchMode(false);
                let active = prodData.currentPage;
                let items = [];
                if (prodData.numberOfPages > 1) {
                    for (let number = 1; number <= prodData.numberOfPages; number++) {
                        items.push(
                            number
                        );
                    }

                    setPaginationPages(items);
                } else {
                    setPaginationPages([]);
                }

                setLoading(false)
                setProductsData(prodData.data);
                setError(false);
            } else {
                setError(true)
            }


        } catch (error) {
            console.log(error.message);
        }
    }


    const searchProduct = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/admin/search/all?page=${searchPageNumber}&searchTerm=${searchParams.get("searchTerm") ? searchParams.get("searchTerm") : ""}${filterQuery}${categoryFilter}${productStatusFilter}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })

            const prodData = await res.json();

            if (prodData) {
                setSearchMode(true);
                let active = prodData.currentPage;
                let items = [];
                if (prodData.numberOfPages > 1) {
                    for (let number = 1; number <= prodData.numberOfPages; number++) {
                        items.push(
                            number
                        );
                    }

                    setPaginationPages(items);
                } else {
                    setPaginationPages([]);
                }
                setProductsData(prodData.data);
                setError(false);
                setLoading(false);
            } else {
                setError(true);
            }


        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        searchProduct();
    }

    const handlePaginationChange = (event, value) => {
        if (!searchMode) {
            setPage(value);
        } else {
            setSearchPageNumber(value);
        }

    };


    useEffect(() => {
        //invoke on every reload
        fetchData();
    }, [])

    useMemo(() => {
        fetchData();
    }, [page])

    useMemo(() => {
        searchProduct();
    }, [searchPageNumber])

    return (
        (loading) ? <AdminLoader /> :
            <>
                <AddProduct fetchData={fetchData} />

                <div className='bg-white sticky-top'>
                    <section className='mb-3' style={{ backgroundColor: "#eee" }}>
                        <div className='container'>
                            <div className='row justify-content-center'>
                                <div className='col-lg-6'>
                                    <Form className='py-3' onSubmit={(e) => { handleSearch(e) }}>
                                        <InputGroup>
                                            <Form.Control className='border-3'
                                                onChange={(e) => {
                                                    //setSearchTerm(e.target.value)
                                                    setSearchParams({ searchTerm: e.target.value });
                                                    if (e.target.value.trim().length === 0) {
                                                        setPage(1)
                                                        setSearchPageNumber(1)
                                                        setError(false);
                                                        fetchData();
                                                    }
                                                }} />
                                            <Button variant="outline-secondary" type='submit'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                </svg>
                                            </Button>
                                        </InputGroup>

                                    </Form>

                                </div>
                            </div>

                        </div>


                    </section>
                    <section>
                        <Container fluid className="pb-3 border-bottom mb-3">
                            <Row>
                                <div className='col-lg-4 mb-lg-0 mb-3'>
                                    <ProductsSort searchProduct={searchProduct} setFilterQuery={setFilterQuery} filterQuery={filterQuery} fetchData={fetchData} searchParams={searchParams} />

                                </div>
                                <div className='col-lg-4 mb-lg-0 mb-3'>
                                    <SelectProductCategory searchProduct={searchProduct} setCategoryFilter={setCategoryFilter} categoryFilter={categoryFilter} fetchData={fetchData} searchParams={searchParams} setPage={setPage} setSearchPageNumber={setSearchPageNumber} />

                                </div>
                                <div className='col-lg-4'>
                                    <ProductStatusFilter searchProduct={searchProduct} productStatusFilter={productStatusFilter} setProductStatusFilter={setProductStatusFilter} fetchData={fetchData} searchParams={searchParams} setPage={setPage} setSearchPageNumber={setSearchPageNumber} />

                                </div>
                            </Row>

                        </Container>

                    </section>


                </div>


                {error ? <p className='fs-4 text-center py-5'>No Product Found</p> :
                    <>
                        {(paginationPages?.length > 0) ?
                            <>
                                <div className='pb-4 pt-3 d-flex justify-content-center'>
                                    <Pagination className='custom-pagination' variant='outlined' shape='rounded' showLastButton={paginationPages.length > 4 ? true : false} showFirstButton={paginationPages.length > 4 ? true : false} count={paginationPages.length} page={(!searchMode) ? page : searchPageNumber} onChange={handlePaginationChange} />

                                </div>

                            </>
                            : null
                        }
                        <Table className='text-center' responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Stocks</th>
                                    <th>Items Sold</th>
                                    <th>Availability</th>
                                    <th colSpan={3}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productsData.map((product) => {
                                        return (
                                            <motion.tr initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={product._id}>
                                                <td>{product._id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{product.category}</td>
                                                <td>{product.stocks}</td>
                                                <td>{product.itemsSold ? product.itemsSold : 0}</td>
                                                <td>{
                                                    (product.isActive) ? <p className='text-success'>Available</p> :
                                                        <p className="text-danger">Unavailable</p>
                                                }</td>
                                                <td><EditProduct productIdProp={product._id} fetchData={fetchData} /></td>
                                                <td>
                                                    {
                                                        (product.isActive) ?
                                                            <ArchiveProduct
                                                                productIdProp={product._id}
                                                                fetchData={fetchData} />
                                                            :
                                                            <ActivateProduct
                                                                productIdProp={product._id}
                                                                fetchData={fetchData} />
                                                    }

                                                </td>
                                                <td>
                                                    {
                                                        (product.isFeatured) ?
                                                            <UnfeatureProduct isFeatured={product.isFeatured} fetchData={fetchData} productIdProp={product._id} /> :

                                                            <FeatureProduct isFeatured={product.isFeatured} fetchData={fetchData} productIdProp={product._id} />

                                                    }

                                                </td>
                                            </motion.tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>

                        {(paginationPages?.length > 0) ?
                            <>
                                <div className='pt-3 pb-5 d-flex justify-content-center'>
                                    <Pagination className='custom-pagination' variant='outlined' shape='rounded' showLastButton={paginationPages.length > 4 ? true : false} showFirstButton={paginationPages.length > 4 ? true : false} size='large' count={paginationPages.length} page={(!searchMode) ? page : searchPageNumber} onChange={handlePaginationChange} />

                                </div>

                            </>
                            : null
                        }
                    </>

                }





            </>
    )
}
