import React from 'react'

export const ProductImage = ({productPhoto, quantity}) => {
    return (
        <div className='d-inline-block text-white text-center position-relative'>
            <span className='d-flex justify-content-center align-items-center bg-dark rounded-circle p-1 fw-bold' style={{ position: "absolute", top: "-7px", left: "-10px", zIndex: 2, minWidth: "30px", aspectRatio: "1 / 1" }}>{quantity}</span>
            <div className='d-flex align-items-center justify-content-center bg-dark' style={{ objectFit: "cover", width: "120px", height: "120px" }}>
                {
                    (productPhoto && productPhoto !== "false") ?
                        <img src={`${process.env.REACT_APP_API_URL}/images/${productPhoto}`} className='img-fluid w-100 h-100' style={{ objectFit: "cover" }} /> :

                        <p>Product Image</p>
                }

            </div>

        </div>
    )
}
