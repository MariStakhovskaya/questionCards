import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import {AppRootState} from "./redux/store";

function Profile() {

    const userName = useSelector<AppRootState, string>(state => state.login.name)
    const userAvatar = useSelector<AppRootState, string>(state => state.login.avatar)


    return (
        <div className="Profile">
Здесь будет профайл

    <div> name:  {userName}</div>
    <div>  <img src={userAvatar} alt='some avatar'/></div>
        </div>
    );
}

export default Profile;
