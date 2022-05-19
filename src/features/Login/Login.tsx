import React, {ChangeEvent, useState} from 'react';
import style from '../../App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {AppRootState} from "../../redux/store";
import {Link, Navigate} from 'react-router-dom';
import Preloader from "../../common/Preloader/Preloader";
import Logo from "../../common/Logo";


function Login() {

    const [email, setEmail] = useState('maria.stachovski.de@gmail.com')
    const [password, setPassword] = useState('123456780')
    const [rememberMe, setRememberMe] = useState(false)

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const isError = useSelector<AppRootState, string>(state => state.login.error)
    const status = useSelector<AppRootState, string>(state => state.app.status)

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
                    <Logo/>
                <h3>Login</h3>
            </div>
            {status === 'loading' && <Preloader/>}
            <div className={style.formBlockInput}>
                <input className={style.defaultInput} value={email} onChange={onChangeInputHandler}/>
                <input className={style.defaultInput} type={"password"} value={password}
                       onChange={onChangeInputPassHandler}/>
                <div className={style.error}>{isError}</div>
                <label>
                    <input type={"checkbox"} name="RememberMe" onChange={onChangeInputCheckbox}/>RememberMe
                </label>
                <button className={style.defaultButton} onClick={onClickButtonHandler}>Login</button>

            </div>
            <div className={style.footerFormBlock}>
                <div><Link to={"/forgot"}>ForgotPassword</Link></div>
                <div>Don't have an account?</div>
                <div>Sign up</div>
            </div>
            {isLoggedIn && (<Navigate to={'/profile'}/>)}

        </div>
    );
}

export default Login;
