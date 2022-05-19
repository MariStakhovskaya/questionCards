import React from 'react';
import style from '../../App.module.css';
import logoEmail from '../../common/assets/4698238.png'
import Logo from "../../common/Logo";


type CheckEmailPropsType = {
    email: string
}

function CheckEmail(props: CheckEmailPropsType) {


    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
                <Logo/>
                <h4>Check Email</h4>
               <div><img className={style.checkEmail} src={logoEmail} alt={'email'}/></div>

            </div>

            <div className={style.footerFormBlock}>
                <div>We’ve sent an Email with instructions to {props.email}</div>


            </div>

        </div>
    );
}

export default CheckEmail;

