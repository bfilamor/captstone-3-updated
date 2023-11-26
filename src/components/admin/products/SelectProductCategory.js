import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';

export const SelectProductCategory = ({ searchProduct, setCategoryFilter, categoryFilter, fetchData, searchParams, setPage, setSearchPageNumber }) => {

    const handleChange = (e) => {
        if (e.target.value === "default") {
            setCategoryFilter("&category=")

        } else if (e.target.value == "prescription") {
            setCategoryFilter("&category=prescription")

        } else if (e.target.value == "sunglasses") {
            setCategoryFilter("&category=sunglasses")

        } else if (e.target.value == "reading") {
            setCategoryFilter("&category=reading")

        } else {
            setCategoryFilter("&category=")
        }

        setPage(1);
        setSearchPageNumber(1);
    }

    useMemo(() => {
        if (categoryFilter && !searchParams.get("searchTerm") ) {
            fetchData();
            //searchProduct();         
        }
        if (categoryFilter && searchParams.get("searchTerm") ) {
            searchProduct();
        } 
    }, [categoryFilter])


    return (

        <Form.Select className='border-3 fw-bold' onChange={(e) => handleChange(e)}>
            <option value="default">Select Category</option>
            <option value="default">All Categories</option>
            <option value="prescription">Prescription</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="reading">Reading</option>
        </Form.Select>

    )
}
