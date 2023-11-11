import React from 'react'

export const TotalAmount = ({totalAmount}) => {
    return (

        <div className='d-flex justify-content-between gap-2 mt-3 align-items-center'>
            <h4 className='mb-0 fs-2 fw-normal'>Total Amount</h4>
            <h4 className='fs-1 mb-0 fw-bold'>₱{totalAmount}</h4>

        </div>
    )
}
