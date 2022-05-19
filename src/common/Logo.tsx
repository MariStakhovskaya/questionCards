import React from 'react';
import logo from './assets/cpLogo.png'
import style from '../App.module.css'



function Logo() {

    return (
        <div className="logo">
            <img className={style.logo} src={logo} alt="logo pet project"/>
        </div>
    );
}

export default Logo;

