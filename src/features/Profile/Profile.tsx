import React, { useEffect, useState} from 'react';
import '../../App.module.css';
import styles from './Profile.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import {logoutTC} from "../Login/login-reducer";
import { Navigate } from 'react-router-dom';
import { updateUserDateTC} from "./profile-reducer";
import {EditableSpan} from "../../common/EditableSpan";
import Preloader from "../../common/Preloader/Preloader";
import ModalProfile from "./ModalProfile";



 const Profile = React.memo(() => {


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
     const [modalActive, setModalActive] = useState(false)


     const dispatch = useDispatch<TypeDispatch>()

     const onClickLogoutHandler = () => {
         dispatch(logoutTC())
     }


     const onClickUpdateData = () => {
         dispatch(updateUserDateTC(name,avatar))
         setModalActive(false)
     }


     if (!isLoggedIn) {
         return <Navigate to={'/login'}/>
     }

     return (
         <div className={styles.profile}>
             {status === 'loading' && <Preloader/>}
             <img src={userAvatar} alt={''}/>
             <br/>
            {/*avatar URL: {userAvatar}*/}
             <br/>
             name: {userName}
            {/* avatar url:  <EditableSpan value={avatar}  onChange={setAvatar} />
             <br/>
             name: <EditableSpan value={name} onChange={setName}/>*/}
             <br/>
             <button onClick={()=> setModalActive(true)}>Update Profile</button>

             <br/>
             <button onClick={onClickLogoutHandler}>Logout</button>
             <ModalProfile active={modalActive} setActive={setModalActive}>
                 avatar url:  <EditableSpan value={avatar}  onChange={setAvatar} />
                 <br/>
                 <br/>
                 name: <EditableSpan value={name} onChange={setName}/>
                 <br/>
                 <button onClick={onClickUpdateData}>save</button>
             </ModalProfile>

         </div>
     );
 })


export default Profile;
