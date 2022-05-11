import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/login-reducer";
import {AppRootState} from "../../redux/store";
import {Navigate} from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('maria.stachovski.de@gmail.com')
    const [password, setPassword] = useState('12341234M')
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
        dispatch<any>(loginTC({email, password, rememberMe}))
    }


    return (
        <div className={style.formBlock}>
            <div className={style.titleFormBlock}>
                <h5>Cards Project</h5>
                <h5>Login</h5>
            </div>
            <div className={style.formBlockInput}>
                <input className={style.defaultInput} value={email} onChange={onChangeInputHandler}/>
                <input className={style.defaultInput} type={"password"} value={password} onChange={onChangeInputPassHandler}/>
                <label>
                    <input type={"checkbox"} name="RememberMe" onChange={onChangeInputCheckbox}/>RememberMe
                </label>
                <button className={style.defaultButton} onClick={onClickButtonHandler}>Login</button>
                <div>{isError}</div>
            </div>
            <div className={style.footerFormBlock}>
                <div>Don't have an account?</div>
                <div>Sign up</div>
            </div>

            {isLoggedIn && (<Navigate to={'/profile'}/>)}
        </div>
    );
}

export default Login;
