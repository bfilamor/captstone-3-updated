import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Col, Container, Row, Button, Form, InputGroup } from 'react-bootstrap';

export const ProductsSearch = ({ searchProduct, setSearchParams, setError, fetchData, setPage, setSearchPageNumber }) => {

    const handleSearch = (e) => {
        e.preventDefault();   
        searchProduct();
    }

    useEffect(() => {
        setSearchParams();
    }, [])


    return (

        <Form onSubmit={(e) => { handleSearch(e) }}>
            <InputGroup>
                <Form.Control className='border-3'
                    placeholder='Enter Name of Product'
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

    )
}
