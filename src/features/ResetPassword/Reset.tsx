import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import { useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createNewPasswordTC} from "../../redux/reset-reducer";



function Reset() {

    const [password, setPassword] = useState('')
        const dispatch = useDispatch()

    const onChangeHandlerPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const { token } = useParams<{token: string}>()

    const onClickHandler = () =>{
        debugger
        if (token){
            dispatch<any>(createNewPasswordTC(password,token))
        }
    }

    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
                <h5>Cards Project</h5>
                <h5>Create new password</h5>
            </div>
            <div> New password:<input className={style.defaultInput} value={password} onChange={onChangeHandlerPassword}  />

                <div>Create new password and we will send you further instructions to email </div>

                <button className={style.defaultButton} onClick={onClickHandler}>Create new password</button></div>

            <div className={style.footerFormBlock}>

            </div>
        </div>
    );
}

export default Reset;

