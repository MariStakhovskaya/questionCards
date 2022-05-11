import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import {registrationTC} from "../../redux/regist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../redux/store";
import { Navigate } from 'react-router-dom';

function Registration() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const error = useSelector<AppRootState, string>(state => state.login.error)


    const onChangeHandlerEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangeHandlerPass = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

const onClickHandler = () => {
    dispatch<any>(registrationTC(email,password))
}

    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
                <h5>Cards Project</h5>
                <h5>Registration</h5>
            </div>
<div> <input value={email} onChange={onChangeHandlerEmail}  />
    <input value={password} onChange={onChangeHandlerPass}   />
    {error ? error : ''}
    {/*<input type={"password"} value={password} onChange={()=>{}}/>*/}
    <button className={style.defaultButton} onClick={onClickHandler}>Register</button></div>

            <div className={style.footerFormBlock}>

            </div>
            {isLoggedIn && <Navigate to={'/login'}/>}
        </div>
    );
}

export default Registration;

