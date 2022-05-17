import React from 'react';
import style from '../../App.module.css';
import logoEmail from '../../common/4698238.png'


type CheckEmailPropsType = {
    email: string
}

function CheckEmail(props: CheckEmailPropsType) {


    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
                <h4>Cards Project</h4>
                <h4>Check Email</h4>
               <div><img className={style.checkEmail} src={logoEmail}/></div>

            </div>

            <div className={style.footerFormBlock}>
                <div>We’ve sent an Email with instructions to {props.email}</div>


            </div>

        </div>
    );
}

export default CheckEmail;

