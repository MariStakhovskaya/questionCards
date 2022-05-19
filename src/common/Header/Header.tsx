import React from 'react';
import {Link} from "react-router-dom";
import style from './Header.module.css'
import Logo from "../Logo";

function Header() {

    return (
        <div className={style.headerContainer}>
            <Logo/>
            <nav className={style.headerMenu}>

                <Link to={"/login"}>Login</Link>
                <Link to={"/profile"}>Profile</Link>
                <Link to={"/registration"}>Registration</Link>
                <Link to={"/forgot"}>ForgotPassword</Link>
                {/*<Link to={"/reset"}>Reset</Link>*/}
            </nav>
        </div>
    );
}

export default Header;

