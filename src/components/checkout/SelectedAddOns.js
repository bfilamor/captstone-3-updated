import React from 'react'

export const SelectedAddOns = ({ selectedAddOn }) => {
    return (
        <div className='p-2 my-1 border-start border-3'>
            <p className='mb-0 fw-bold'>Add Ons:</p>
            {selectedAddOn?.map((addOn => {
                return (
                    <div className='d-flex gap-2 justify-content-between' key={addOn._id}>
                        <div> <p className='mb-0 text-capitalize'>{addOn.name}</p></div>
                        <div> <p className='mb-0 fw-bold text-capitalize'>₱{addOn.price}</p></div>
                    </div>
                )
            }))}
        </div>
    )
}
