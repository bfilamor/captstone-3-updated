import { useState, useEffect, useContext, useMemo } from 'react';
import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import { useValue } from '../UserContext';
import { UserView } from '../components/users/UserView';
import { Navigate } from 'react-router-dom';
import { ProductLoader } from '../components/products/ProductLoader';
import { useSearchParams } from 'react-router-dom';
import { ProductsSearch } from '../components/products/ProductsSearch';
import { ProductsSort } from '../components/products/ProductsSort';
//import CourseSearch from '../components/CourseSearch';
//import CourseSearchByPrice from '../components/CourseSearchByPrice';

export const Products = () => {
    const { user, getCart, setSelectedAddOn } = useValue();

    //const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const [filterQuery, setFilterQuery] = useState("");
    const [page, setPage] = useState(1);
    const [searchPageNumber, setSearchPageNumber] = useState(1);
    const [paginationPages, setPaginationPages] = useState([]);
    const [searchMode, setSearchMode] = useState(false);

    const fetchData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products?page=${page}${filterQuery}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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
            }


        } catch (error) {
            console.log(error.message);
        }
    }


    const searchProduct = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/search/all?page=${searchPageNumber}&searchTerm=${searchParams.get("searchTerm") ? searchParams.get("searchTerm") : ""}${filterQuery}`, {
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
                } else {
                    setPaginationPages([]);
                }
                setProductsData(prodData.data);
                setError(false);
                setLoading(false);
            } else {
                setSearchMode(false);
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
        fetchData();
        getCart();
        setSelectedAddOn([]);
    }, [])

    useMemo(() => {
        fetchData();
    }, [page])

    useMemo(() => {
        searchProduct();
    }, [searchPageNumber])

    useMemo(() => {
        getCart();
    },[productsData])

    return (
        <>
            {
                loading ? <ProductLoader /> :
                    (user.isAdmin !== true) ?
                        <>
                            <section className='pt-5' style={{ backgroundColor: "#eee" }}>
                                <div className='container'>
                                    <h1 className='text-center fw-light'><span className='fw-bold'>All</span> Products</h1>
                                    <Row className='justify-content-center py-3 pb-lg-4'>
                                        <div className='col-lg-5'>
                                            <ProductsSearch searchProduct={searchProduct} setSearchParams={setSearchParams} fetchData={fetchData} setError={setError} setPage={setPage} setSearchPageNumber={setSearchPageNumber} />
                                        </div>

                                    </Row>

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
                                                            <ProductsSort searchProduct={searchProduct} setFilterQuery={setFilterQuery} filterQuery={filterQuery} fetchData={fetchData} searchParams={searchParams} />

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
                                                        <Pagination className='custom-pagination' showLastButton={ paginationPages.length > 4 ? true : false} showFirstButton={paginationPages.length > 4 ? true : false} size='large' count={paginationPages.length} page={(!searchMode) ? page : searchPageNumber} onChange={handlePaginationChange} />

                                                    </div>

                                                </>
                                                : null
                                            }
                                        </>

                                    }
                                </Container>

                            </section>

                        </> :
                        <Navigate to="/dashboard" />
            }


        </>
    )
}
