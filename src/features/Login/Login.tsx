import React, {ChangeEvent, useState} from 'react';
import '../../App.css';
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/login-reducer";
import {AppRootState} from "../../redux/store";
import { Navigate } from 'react-router-dom';



function Login() {
    const [email, setEmail] = useState('nya-admin@nya.nya')
    const [password, setPassword] = useState('1qazxcvBG')
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const isError = useSelector<AppRootState, string>(state => state.login.error)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }
    const onChangeInputPassHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }
    const onChangeInputCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(event.currentTarget.checked)
    }

const onClickButtonHandler = () => {
    dispatch<any>(loginTC({email,password,rememberMe}))
}


    return (
        <div className="Login">

            Логинизация
            <input value={email} onChange={onChangeInputHandler}  />
            <input value={password} onChange={onChangeInputPassHandler}   />
            <input type={"checkbox"} onChange={onChangeInputCheckbox}/>
            <button onClick={onClickButtonHandler}>Login</button>
           <div>{isError}</div>
            {isLoggedIn && (<Navigate to={'/profile'} />)}
        </div>
    );
}

export default Login;
