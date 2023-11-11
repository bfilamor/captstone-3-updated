import React from 'react'
import { SelectedAddOns } from './SelectedAddOns'

export const ProductDetails = ({ name, price, selectedAddOn, quantity }) => {
    return (
        <div className='ps-lg-3 w-100 text-start'>
            <div className='row justify-content-between'>
                <div className='col-7'>
                    <h4 className='mb-0 fs-4 text-capitalize fw-normal'>{name}</h4>

                </div>
                <div className='col-5 d-flex justify-content-end'>
                    <h4 className='mb-0 fs-4 fw-bold text-capitalize'>₱{price * quantity}</h4>
                </div>

            </div>

            {(selectedAddOn?.length > 0) ?
                <SelectedAddOns selectedAddOn={selectedAddOn} />
                : null}

        </div>
    )
}
