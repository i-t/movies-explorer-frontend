import React from 'react'
import './Preloader.css'

const Preloader = ({ movies }) => {

    return (
        <div className={movies ? "preloader-movies" : "preloader"} >
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div >
    )
};

export default Preloader
