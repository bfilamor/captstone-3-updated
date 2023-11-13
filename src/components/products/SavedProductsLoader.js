import React, { useEffect, useState } from 'react'
import { Placeholder } from 'react-bootstrap'

export const SavedProductsLoader = () => {


    return (
        <>
         <div className='p-3 border-bottom position-relative saved-products-list'>
            <div className='row'>
                <div className='col-lg-2 p-0 mb-3 mb-lg-0'>
                    <Placeholder as="div" animation="glow" >
                        <Placeholder xs={12} style={{ height: "100px" }} />
                    </Placeholder>
                </div>
                <div className='col-lg-10 ps-4'>
                    <div className='row'>
                        <div className='col-8'>
                            <Placeholder as="h5" animation="glow" >
                                <Placeholder xs={12} />
                            </Placeholder>
                        </div>
                        <div className='col-4'>
                            <Placeholder as="p" animation="glow" >
                                <Placeholder xs={12} />
                            </Placeholder>
                        </div>
                    </div>

                    <Placeholder as="p" animation="glow" >
                        <Placeholder xs={12} />
                    </Placeholder>
                    <Placeholder as="p" animation="glow" >
                        <Placeholder xs={8} />
                    </Placeholder>
                </div>
            </div>
        </div>

        </>
       
        
    )
}
