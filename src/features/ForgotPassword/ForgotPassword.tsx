import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import {Link, Navigate} from "react-router-dom";
import {forgotPasswordTC} from "./forgotPassword-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import logoEmail from "../../common/assets/4698238.png";
import Logo from "../../common/Logo";


function ForgotPassword() {

    const [email, setEmail] = useState('')

    const isSendInstructionAC = useSelector<AppRootState, boolean>(state => state.forgot.isSendInstruction)
    const isError = useSelector<AppRootState, string>(state => state.login.error)

    const dispatch = useDispatch<TypeDispatch>()

    const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onClickHandler = () => {
        dispatch(forgotPasswordTC(email))

    }

    /* if(isSendInstructionAC) {
         return <Navigate to={'/check'}/>
     }*/

    return (
        <div>
            {isSendInstructionAC ? <div className={style.formBlock}>
                    <div className={style.titleFormBlock}>
                        <Logo />
                        <h4>Check Email</h4>
                        <div><img className={style.checkEmail} src={logoEmail} alt={'email'}/></div>
                    </div>

                    <div className={style.footerFormBlock}>
                        <div>We’ve sent an Email with instructions to {email}</div>
                    </div>
                </div>
                : <div className={style.formBlock}>
                    <div className={style.titleFormBlock}>
                       <Logo />
                        <h4>Forgot your password?</h4>
                    </div>
                    <div className={style.formBlockInput}>
                        <input className={style.defaultInput} placeholder={'Email'} value={email} onChange={onChangeHandlerEmail}/>

                        <p>Enter your email address and we will send you further instructions</p>
                        <div className={style.error}>{isError}</div>
                        <button className={style.defaultButton} onClick={onClickHandler}>Send instruction</button>
                    </div>
                    {isSendInstructionAC && (<Navigate to={'/check'}/>)}

                    <div className={style.footerFormBlock}>
                        <p>Did you remember your password?</p>
                        <p><Link to={"/login"}> Try logging in</Link></p>
                    </div>
                </div>}
        </div>
    );
}

export default ForgotPassword;

