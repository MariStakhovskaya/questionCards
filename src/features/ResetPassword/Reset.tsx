import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createNewPasswordTC} from "./reset-reducer";
import {AppRootState} from "../../redux/store";
import Logo from "../../common/Logo";



function Reset() {

    const [password, setPassword] = useState('')
    const isSendPassword = useSelector<AppRootState, boolean>(state => state.reset.isSendPassword)
        const dispatch = useDispatch()

    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const {resetPasswordToken} = useParams<{resetPasswordToken:string}>()

    const onClickHandler = () =>{
        debugger
        if (resetPasswordToken){
            dispatch<any>(createNewPasswordTC(password,resetPasswordToken))
        }
    }

    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
                <Logo />
                <h5>Create new password</h5>
            </div>
            <div> New password:<input className={style.defaultInput} value={password} onChange={onChangeHandlerPassword}  />

                <div>Create new password and we will send you further instructions to email </div>

                <button className={style.defaultButton} onClick={onClickHandler}>Create new password</button></div>
            {isSendPassword && (<Navigate to={'/login'}/>)}

            <div className={style.footerFormBlock}>

            </div>
        </div>
    );
}

export default Reset;

