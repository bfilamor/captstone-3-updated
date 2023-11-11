import React, { useEffect } from 'react';
import "./introSection.css"
import { useLocation } from 'react-router-dom';
import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";
import frame from "../../images/frame.png"

export const IntroSection = () => {
    const location = useLocation();
    const { scrollY, scrollYProgress, scrollX } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 5])

    function ParallaxText({ children, baseVelocity = 100 }) {
        return (
            <div className="parallax" >
                <motion.div className="scroller" style={{ x: scrollY }}>
                    <motion.h1 initial={{ opacity: 0, x: "5%" }}
                        whileInView={{ opacity: 1, x:0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span>{children} </span>
                        <span className='d-none d-lg-block'>{children} </span>

                    </motion.h1>

                </motion.div>
            </div>
        );
    }

    function ParallaxText2({ children, baseVelocity = 100 }) {
        return (
            <div className="parallax" >
                <motion.div className="scroller position-relative text-primary" style={{ right: scrollY }}>
                    <motion.h1 initial={{ opacity: 0, x: "-5%" }}
                        whileInView={{ opacity: 1, x: "5%" }}
                         viewport={{ once: true }}
                         transition={{ delay: 0.6 }}
                    >
                        <span>{children} </span>
                        <span className='d-none d-lg-block'>{children} </span>
                    </motion.h1>

                </motion.div>
            </div>
        );
    }

    return (
        (location.pathname === "/") ?
            <>
                <section className='text-white overflow-hidden position-relative' id="introSection">
                    <motion.div
                        style={{ background: `url(${frame})`, scale: scale }}
                        initial={{ opacity: 0, scale:0.5 }}
                        whileInView={{ opacity: 1 , scale:1}}
                        viewport={{ once: true }}
                         transition={{ delay: 0.4 }}
                    
                        id="introImg">
                    </motion.div>
                    <div className='position-relative' style={{ zIndex: 2 }}>
                        <ParallaxText >Welcome to Zarate Verano Optical. <span className='d-none d-lg-inline'>Your Vision is Our Mission.</span></ParallaxText>


                        <ParallaxText2>Your Vision is Our Mission. <span className='d-none d-lg-inline'>Welcome to Zarate Verano Optical.</span></ParallaxText2>
                    </div>
                </section>
            </>

            : null
    )
}
