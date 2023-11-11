import React from 'react'

export const SubTotal = ({subTotal}) => {
    return (
        <div className='d-flex gap-2 mt-3 justify-content-between'>
            <h4 className='mb-0 fw-normal fs-3'>Subtotal</h4>
            <h4 className='mb-0 fw-bold fs-3'> ₱{subTotal}</h4>
        </div>
    )
}
