import { useScroll } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { SaveProductToggle } from './SaveProductToggle'

export const SaveProduct = ({ productId, savedBy, inSavedProductsList }) => {
  

    return (
        <>
            <div className="save-toggle">
                <SaveProductToggle productId={productId} savedBy={savedBy} inSavedProductsList={inSavedProductsList} />
            </div>
        </>

    )
}
