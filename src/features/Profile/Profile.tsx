import React from 'react';
import '../../App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../redux/store";
import {logoutTC} from "../../redux/login-reducer";
import { Navigate } from 'react-router-dom';

function Profile() {

    const userName = useSelector<AppRootState, string>(state => state.login.name)
    const userAvatar = useSelector<AppRootState, string>(state => state.login.avatar)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    const onClickLogoutHandler = () => {
        dispatch<any>(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className="Profile">
            <h3>Profile {userName}</h3>

            <div><img src={userAvatar} alt='some avatar'/></div>
            <button onClick={onClickLogoutHandler}>Logout</button>
        </div>
    );
}

export default Profile;
