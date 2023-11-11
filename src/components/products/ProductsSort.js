import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';

export const ProductsSort = ({ searchProduct, setFilterQuery, filterQuery, fetchData, searchParams }) => {

    const handleChange = (e) => {
        if (e.target.value === "default") {
            setFilterQuery("&sortBy=latest")

        } else if (e.target.value === "latestProduct") {
            setFilterQuery("&sortBy=latest")

        } else if (e.target.value === "oldestProduct") {
            setFilterQuery("&sortBy=oldest")

        } else if (e.target.value === "bestSelling") {
            setFilterQuery("&sortBy=bestSelling")

        } 
        
        /* else if (e.target.value === "aToZ") {
            setFilterQuery("&sortBy=aToZ")

        } 
        
        else if (e.target.value === "zToA") {
            setFilterQuery("&sortBy=zToA")

        }  */
        else if (e.target.value === "highestPrice") {
            setFilterQuery("&price=highest")

        } else if (e.target.value === "lowestPrice") {
            setFilterQuery("&price=lowest")

        } else if (e.target.value === "highestRated") {
            setFilterQuery("&rating=highest")

        } else if (e.target.value === "lowestRated") {
            setFilterQuery("&rating=lowest")
        } else {
            setFilterQuery("&sortBy=latest")
        }
    }

    useMemo(() => {
        if (filterQuery && !searchParams.get("searchTerm")) {
            fetchData();
            //searchProduct();         
        }
        if (filterQuery && searchParams.get("searchTerm")) {
            searchProduct();
        }
    }, [filterQuery])


    return (

        <Form.Select className='border-3 fw-bold' onChange={(e) => handleChange(e)}>
            <option value="default">Sort By</option>
            <option value="bestSelling">Best Seller</option>
            <option value="latestProduct">Latest Product</option>
            <option value="oldestProduct">Oldest Product</option>
            {/* <option value="aToZ">Alphabetical (A to Z)</option>
            <option value="zToA">Alphabetical (Z to A)</option> */}
            <option value="highestPrice">Highest Price</option>
            <option value="lowestPrice">Lowest Price</option>
            <option value="highestRated">Top Rated</option>
            <option value="lowestRated">Lowest Rated</option>
        </Form.Select>

    )
}
