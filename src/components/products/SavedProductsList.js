import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { SaveProduct } from './SaveProduct';
import { useValue } from '../../UserContext';

export const SavedProductsList = ({ productId }) => {
  const { getSavedProducts } = useValue();
  const [productData, setProductData] = useState({});

  const fetchProductData = async () => {
    try {
      const productDataRes = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const prodData = await productDataRes.json();

      if (prodData) {
        setProductData({
          productPhoto: prodData.productPhoto,
          name: prodData.name,
          price: prodData.price,
          description: prodData.description,
          savedBy: prodData.savedBy
        })

      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [productId])


  return (
    <div className='p-3 border-bottom position-relative saved-products-list'>
      <div className='row'>
        <div className='col-lg-2 p-0 mb-3 mb-lg-0 bg-dark d-flex justify-content-center align-items-center text-white position-relative img-box'>
          <SaveProduct productId={productId} savedBy={productData.savedBy} inSavedProductsList={true}/>
          <Link className='h-100 w-100' to={`/products/single/${productId}`} style={{ position: "absolute", zIndex: 2, opacity: 0 }}></Link>
          {(productData.productPhoto && productData.productPhoto !== "false") ? <img src={`${process.env.REACT_APP_API_URL}/images/${productData.productPhoto}`} className='img-fluid w-100 h-100' style={{ objectFit: "cover" }} /> : <div className='py-5'><p>Product Image</p></div>}
        </div>
        <div className='col-lg-10 ps-4'>
          <div className='row'>
            <div className='col-8'>
              <h5 className='fw-bold mb-0'><Link to={`/products/single/${productId}`} style={{ textDecoration: "none", color: "inherit" }}>{productData.name}</Link></h5>
            </div>
            <div className='col-4 d-flex justify-content-end'>
              <p className='fw-bold fs-5 mb-0'>₱{productData.price}</p>
            </div>
          </div>

          <p className='fw-light'>{productData.description}</p>
        </div>
      </div>
    </div>
  )
}
