import React from 'react'
import { useLocation } from 'react-router-dom'

export const Footer = () => {
    const location = useLocation();
  return (
    (location.pathname !== "/dashboard") ?
        <footer className='bg-secondary py-4 text-white text-center'>
            <div className='container'>
                <p>Developed By Bryan Filamor. For Demo Purposes Only.</p>
            </div>
        </footer> : null 
  )
}
