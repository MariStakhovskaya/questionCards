import React from 'react';
import { NavLink } from 'react-router-dom';
import image404 from '../assets/404.png'
import style from './Error404.module.css'


function Error404() {
    return (
        <div className={style.wrapper}>
            <div className={style.image}><img src={image404}
                                          alt="cat"/></div>
            <div className={style.errorText}>Oops, This page does not exist</div>
            <button>  <NavLink to={'/profile'} className={style.back}>go to homepage</NavLink></button>
        </div>
    );
}

export default Error404;