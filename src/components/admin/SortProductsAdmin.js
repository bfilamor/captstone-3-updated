import React, { useEffect, useMemo, useState } from 'react';
import { Form } from 'react-bootstrap';

export const SortProductsAdmin = ({ setFilterQuery, filterQuery, fetchData, searchParams }) => {

    const handleChange = (e) => {
        if (e.target.value === "default") {
            setFilterQuery("&sortBy=latest")

        } else if (e.target.value === "latestProduct") {
            setFilterQuery("&sortBy=latest")

        } else if (e.target.value === "oldestProduct") {
            setFilterQuery("&sortBy=oldest")

        } else if (e.target.value === "highestPrice") {
            setFilterQuery("&price=highest")

        } else if (e.target.value === "lowestPrice") {
            setFilterQuery("&price=lowest")

        } else if (e.target.value === "highestRated") {
            setFilterQuery("&rating=highest")

        } else if (e.target.value === "lowestRated") {
            setFilterQuery("&rating=lowest")
        }

    }

    useMemo(() => {
       fetchData();
    }, [filterQuery])


    return (

        <Form.Select className='border-3 fw-bold' onChange={(e) => handleChange(e)}>
            <option value="default">Sort By</option>
            <option value="latestProduct">Latest Product</option>
            <option value="oldestProduct">Oldest Product</option>
            <option value="highestPrice">Highest Price</option>
            <option value="lowestPrice">Lowest Price</option>
            <option value="highestRated">Top Rated</option>
            <option value="lowestRated">Lowest Rated</option>
        </Form.Select>

    )
}
