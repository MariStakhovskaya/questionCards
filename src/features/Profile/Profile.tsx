import React, {useEffect} from 'react';
import '../../App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../redux/store";
import {logoutTC} from "../../redux/login-reducer";
import { Navigate } from 'react-router-dom';
import {updateUserAvatarTC, updateUserDateTC} from "../../redux/profile-reducer";
import {EditableSpan} from "../../common/EditableSpan";


function Profile() {

    useEffect( () => {
        if (!isLoggedIn){
            return
        } else {

        }


    },[])


    const userName = useSelector<AppRootState, string>(state => state.profile.userData.name)
    const userAvatar = useSelector<AppRootState, string>(state => state.profile.userData.avatar)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    const onClickLogoutHandler = () => {
        dispatch<any>(logoutTC())
    }

    const onChangeEditableSpan = (name: string) => {
        dispatch<any>(updateUserDateTC(name))
    }

    const onChangeEditableSpanAva = (avatar: string) => {
        debugger
        dispatch<any>(updateUserAvatarTC(avatar))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className="Profile">


                <EditableSpan value={userName} onChange={onChangeEditableSpan}/>
            <div> <img src={userAvatar} alt='some avatar'/>
                <br/>
                <EditableSpan value={userAvatar} onChange={onChangeEditableSpanAva}/>
        </div>

            <button onClick={onClickLogoutHandler}>Logout</button>
        </div>
    );
}

export default Profile;
