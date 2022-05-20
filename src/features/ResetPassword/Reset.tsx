import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createNewPasswordTC} from "./reset-reducer";
import {AppRootState, TypeDispatch} from "../../redux/store";
import Logo from "../../common/Logo";



function Reset() {

    const [password, setPassword] = useState('')
    const isSendPassword = useSelector<AppRootState, boolean>(state => state.reset.isSendPassword)
        const dispatch = useDispatch<TypeDispatch>()

    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const {resetPasswordToken} = useParams<{resetPasswordToken:string}>()

    const onClickHandler = () =>{
        debugger
        if (resetPasswordToken){
            dispatch(createNewPasswordTC(password,resetPasswordToken))
        }
    }

    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
                <Logo />
                <h5>Create new password</h5>
            </div>
            <div className={style.formBlockInput}>
                <input className={style.defaultInput} placeholder={'New password'} value={password} onChange={onChangeHandlerPassword}  />

                <p>Create new password and we will send you further instructions to email </p>

                <button className={style.defaultButton} onClick={onClickHandler}>Create new password</button></div>
            {isSendPassword && (<Navigate to={'/login'}/>)}

            <div className={style.footerFormBlock}>

            </div>
        </div>
    );
}

export default Reset;

