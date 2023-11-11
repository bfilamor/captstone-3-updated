import { useState } from 'react';
import { motion } from 'framer-motion'

export const ProductCardImage = ({ productPhoto }) => {
    const [imageLoading, setImageLoading] = useState(true);

    const imageLoaded = () => {
        setImageLoading(false);
    };
    return (
        <motion.img animate={{
            opacity: imageLoading ? 0 : 1
        }} onLoad={imageLoaded} src={`${process.env.REACT_APP_API_URL}/images/${productPhoto}`} className='img-fluid' />
    )
}
