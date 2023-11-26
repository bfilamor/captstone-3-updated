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

export const ReadingGlasses = () => {

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
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/category/reading?page=${page}${filterQuery}`, {
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

    const searchProduct = async (category) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products/category/reading/search?page=${searchPageNumber}&searchTerm=${searchParams.get("searchTerm") ? searchParams.get("searchTerm") : ""}${filterQuery}`, {
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

    /* useEffect(() => {
        //invoke on every reload
        setError(false);
        fetchDataByCategory(category);
    }, [category]) */



    return (
        <>
            {
                loading ? <ProductLoader /> :
                    (user.isAdmin !== true) ?
                        <>
                            <section className='pt-5' style={{ backgroundColor: "#eee" }}>
                                <div className='container'>
                                    <h1 className='text-center fw-light'><span className='fw-bold'>Reading</span> Glasses</h1>
                                    <Row className='justify-content-center py-3 pb-lg-4'>
                                        <div className='col-lg-5'>
                                            <ProductsSearch searchProduct={searchProduct} setSearchParams={setSearchParams} fetchData={fetchDataByCategory} setError={setError} setPage={setPage} setSearchPageNumber={setSearchPageNumber} />

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
                                                        <Pagination className='custom-pagination' showLastButton={ paginationPages.length > 4 ? true : false} showFirstButton={paginationPages.length > 4 ? true : false} size='large' count={paginationPages.length} page={(!searchMode) ? page : searchPageNumber} onChange={handlePaginationChange} />

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
