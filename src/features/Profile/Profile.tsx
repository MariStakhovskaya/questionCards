import React, { useEffect, useState} from 'react';
import '../../App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import {logoutTC} from "../Login/login-reducer";
import { Navigate } from 'react-router-dom';
import { updateUserDateTC} from "./profile-reducer";
import {EditableSpan} from "../../common/EditableSpan";
import Preloader from "../../common/Preloader/Preloader";



 const Profile = React.memo(() => {
debugger

     useEffect( () => {
         if (!isLoggedIn){
             return
         }

     },[])

     const userName = useSelector<AppRootState, string>(state => state.profile.userData.name)
     const userAvatar = useSelector<AppRootState, string>(state => state.profile.userData.avatar)
     const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
     const status = useSelector<AppRootState, string>(state => state.app.status)

     let [name, setName] = useState(userName);
     let [avatar, setAvatar] = useState(userAvatar);


     const dispatch = useDispatch<TypeDispatch>()

     const onClickLogoutHandler = () => {
         dispatch(logoutTC())
     }


     const onChangeUpdateData = () => {
         dispatch(updateUserDateTC(name,avatar))
     }


     if (!isLoggedIn) {
         return <Navigate to={'/login'}/>
     }

     return (
         <div className="Profile">
             {status === 'loading' && <Preloader/>}
             <img src={avatar} alt={''}/>
             <br/>
             avatar url:  <EditableSpan value={avatar}  onChange={setAvatar} />
             <br/>
             name: <EditableSpan value={name} onChange={setName}/>
             <button onClick={onChangeUpdateData}>save</button>

             <br/>
             <button onClick={onClickLogoutHandler}>Logout</button>
         </div>
     );
 })


export default Profile;
