import React from 'react'
import { Banner } from '../components/Banner';
import { Highlights } from '../components/Highlights';
import { FeaturedProducts } from '../components/products/FeaturedProducts';

export const Home = () => {
    const data = {
        title: "We secure your eyes with quality glasses",
        content: "Explore Our Spectacular Collection of Stylish Eyeglasses and Sunglasses at Unbeatable Prices!",
        destination: "/products",
        label: "Enter Shop",
        bannerClass: "bg-dark text-white home-banner",
        isError: false,
    }
    return (
        <>

            <Banner data={data} />
            <FeaturedProducts />
            <Highlights />


        </>
    )
}
