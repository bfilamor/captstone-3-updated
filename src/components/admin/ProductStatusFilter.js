import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';

export const ProductStatusFilter = ({ searchProduct, setProductStatusFilter, productStatusFilter, fetchData, searchParams, setPage, setSearchPageNumber }) => {

    const handleChange = (e) => {
        if (e.target.value === "default") {
            setProductStatusFilter("&availability=")

        } else if (e.target.value == "available") {
            setProductStatusFilter("&availability=active")

        } else if (e.target.value == "unavailable") {
            setProductStatusFilter("&availability=inactive")

        }  else {
            setProductStatusFilter("&availability=")
        }
        setPage(1);
        setSearchPageNumber(1);    
    }

    useMemo(() => {
        if (productStatusFilter && !searchParams.get("searchTerm") ) {
            fetchData();
            //searchProduct();         
        }
        if (productStatusFilter && searchParams.get("searchTerm") ) {
            searchProduct();
        }
             
    }, [productStatusFilter])


    return (

        <Form.Select className='border-3 fw-bold' onChange={(e) => handleChange(e)}>
            <option value="default">Filter Product Status</option>
            <option value="default">All Product Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
        </Form.Select>

    )
}
