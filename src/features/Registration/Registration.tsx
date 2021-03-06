import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import {registrationTC} from "./regist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import { Navigate } from 'react-router-dom';
import {isError} from "../Login/login-reducer";
import Logo from "../../common/Logo";

function Registration() {

    const dispatch = useDispatch<TypeDispatch>()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const error = useSelector<AppRootState, string>(state => state.login.error)


    const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangeHandlerPass = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onChangeHandlerPass1 = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword1(e.currentTarget.value)
    }

const onClickHandler = () => {
        if (password != password1){
            dispatch(isError('Password is not correct'))
        } else {
            dispatch(registrationTC(email,password))
        }

}

    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
              <Logo/>
                <h4>Registration</h4>
            </div>
            <div className={style.formBlockInput}>

 <input className={style.defaultInput} value={email} placeholder={'Email'} onChange={onChangeHandlerEmail}  />


    <input className={style.defaultInput} value={password} placeholder={'Password'} onChange={onChangeHandlerPass}   />


                <input className={style.defaultInput} placeholder={'Confirm password'} value={password1} onChange={onChangeHandlerPass1}   />

    <div className={style.error}>{error ? error : ''}</div>

    <button className={style.defaultButton} onClick={onClickHandler}>Register</button>
            </div>
            <div className={style.footerFormBlock}>

            </div>
            {isLoggedIn && <Navigate to={'/login'}/>}
        </div>
    );
}

export default Registration;

