import React from 'react';
import preloader from './Ellipsis.gif'
import style from '../../App.module.css'



function Preloader() {

    return (
        <div className="preloader">
           <img className={style.loader} src={preloader} alt="preloader"/>
        </div>
    );
}

export default Preloader;

