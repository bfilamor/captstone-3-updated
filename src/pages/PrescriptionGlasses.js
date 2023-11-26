import { useState, useEffect, useContext, useMemo } from 'react';
import { Button, Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import { AdminView } from '../components/admin/products/AdminView';
import { useValue } from '../UserContext';
import { UserView } from '../components/users/UserView';
import { Navigate } from 'react-router-dom';
import { ProductLoader } from '../components/products/ProductLoader';
import { useParams, useSearchParams } from 'react-router-dom';
import { ProductsSearch } from '../components/products/ProductsSearch';
import { ProductsSort } from '../components/products/ProductsSort';
//import CourseSearch from '../components/CourseSearch';
//import CourseSearchByPrice from '../components/CourseSearchByPrice';

export const PrescriptionGlasses = () => {

    const { category } = useParams();

    const { user, fetchData, getCart, setSelectedAddOn } = useValue();

    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [filterQuery, setFilterQuery] = useState("");
    const [page, setPage] = useState(1);
    const [searchPageNumber, setSearchPageNumber] = useState(1);
    const [paginationPages, setPaginationPages] = useState([]);
    const [searchMode, setSearchMode] = useState(false);



    const fetchDataByCategory = async (category) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/category/prescription?page=${page}${filterQuery}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const prodData = await res.json();

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
                }
               /*  if (prodData.numberOfPages > 1) {
                    for (let number = 1; number <= prodData.numberOfPages; number++) {
                        items.push(
                            <Pagination.Item key={number} active={number === active} onClick={() => { setPage(number) }}>
                                {number}
                            </Pagination.Item>,
                        );
                    }

                    let itemsWithArrows = [
                        <Pagination.Prev key={"prev"} disabled={page === 1 ? true : false} onClick={() => {
                            setPage((prev) => {
                                return prev - 1
                            })
                        }} />,
                        ...items,
                        <Pagination.Next key={"next"} disabled={page === prodData.numberOfPages ? true : false} onClick={() => {
                            setPage((prev) => {
                                return prev + 1
                            })
                        }} />
                    ];
                    setPaginationPages(itemsWithArrows);
                } */ else {
                    setPaginationPages([]);
                }
                setLoading(false)
                setProductsData(prodData.data);
            }


        } catch (error) {
            console.log(error.message);
        }



    }

    const searchProduct = async (category) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/category/prescription/search?page=${searchPageNumber}&searchTerm=${searchParams.get("searchTerm") ? searchParams.get("searchTerm") : ""}${filterQuery}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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
                }
                /* if (prodData.numberOfPages > 1) {
                    for (let number = 1; number <= prodData.numberOfPages; number++) {
                        items.push(
                            <Pagination.Item key={number} active={number === active} onClick={() => { setSearchPageNumber(number) }}>
                                {number}
                            </Pagination.Item>,
                        );
                    }

                    let itemsWithArrows = [
                        <Pagination.Prev key={"prev"} disabled={searchPageNumber === 1 ? true : false} onClick={() => {
                            setSearchPageNumber((prev) => {
                                return prev - 1
                            })
                        }} />,
                        ...items,
                        <Pagination.Next key={"next"} disabled={searchPageNumber === prodData.numberOfPages ? true : false} onClick={() => {
                            setSearchPageNumber((prev) => {
                                return prev + 1
                            })
                        }} />
                    ];
                    setPaginationPages(itemsWithArrows);
                } */ else {
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

    const handlePaginationChange = (event, value) => {
        if (!searchMode) {
            setPage(value);
        } else {
            setSearchPageNumber(value);
        }

    };


    useEffect(() => {
        //invoke on every reload
        getCart();
        setSelectedAddOn([]);
        //setError(false);
        fetchDataByCategory(category);
    }, [])

    useMemo(() => {
        fetchDataByCategory();
    }, [page])

    useMemo(() => {
        searchProduct();
    }, [searchPageNumber])

    useMemo(() => {
        getCart();
    },[productsData])

    /*  useEffect(() => {
         //invoke on every reload
        
     }, [category]) */



    return (
        <>
            {
                loading ? <ProductLoader /> :
                    (user.isAdmin !== true) ?
                        <>
                            <section className='pt-5' style={{ backgroundColor: "#eee" }}>
                                <div className='container'>
                                    <h1 className='text-center fw-light'><span className='fw-bold'>Prescription</span> Frames</h1>
                                    <Row className='justify-content-center py-3 pb-lg-4'>
                                        <div className='col-lg-5'>
                                            <ProductsSearch searchProduct={searchProduct} setSearchParams={setSearchParams} fetchData={fetchDataByCategory} setError={setError} setPage={setPage} setSearchPageNumber={setSearchPageNumber} />

                                        </div>

                                    </Row>
                                    {/* <Form className='py-3' onSubmit={(e) => { handleSearch(e) }}>
                                        <InputGroup>
                                            <Form.Control className='border-3'
                                                onChange={(e) => {
                                                    setSearchTerm(e.target.value)

                                                    if (e.target.value.trim().length === 0) {

                                                        setError(false);
                                                        fetchDataByCategory(category)
                                                    }
                                                }} />
                                            <Button variant="outline-secondary" type='submit'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                                </svg>
                                            </Button>
                                        </InputGroup>

                                    </Form> */}

                                </div>


                            </section>

                            <section className='products-section position-relative'>
                                <Container>
                                    {error ? <p className='fs-4 text-center py-5'>No Product Found</p> :
                                        <>
                                            <Row>
                                                <div className='col-lg-6 pb-3'>
                                                    <Row>
                                                        <div className='col-lg-5'>
                                                            <ProductsSort searchProduct={searchProduct} setFilterQuery={setFilterQuery} filterQuery={filterQuery} fetchData={fetchDataByCategory} searchParams={searchParams} />

                                                        </div>
                                                    </Row>
                                                </div>
                                                {(paginationPages?.length > 0) ?
                                                    <>
                                                        <div className='col-lg-6 top-pagination d-flex justify-content-lg-end justify-content-center py-3 py-lg-0'>
                                                            <Pagination className='custom-pagination' size='large' count={paginationPages.length} page={(!searchMode) ? page : searchPageNumber} onChange={handlePaginationChange} />

                                                        </div>


                                                    </>
                                                    : null
                                                }
                                            </Row>


                                            <UserView productsData={productsData} />
                                            {(paginationPages?.length > 0) ?
                                                <>
                                                    <div className='pb-5 d-flex justify-content-center'>
                                                        <Pagination className='custom-pagination' showLastButton={paginationPages.length > 4 ? true : false} showFirstButton={paginationPages.length > 4 ? true : false} size='large' count={paginationPages.length} page={(!searchMode) ? page : searchPageNumber} onChange={handlePaginationChange} />

                                                    </div>

                                                </>
                                                : null
                                            }
                                        </>

                                    }
                                </Container>

                            </section>
                        </>
                        :
                        <Navigate to="/dashboard" />


            }


        </>
    )
}
