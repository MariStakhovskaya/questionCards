import React, {ChangeEvent, useEffect, useState} from 'react';
import '../../App.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../redux/store";
import {logoutTC} from "../../redux/login-reducer";
import { Navigate } from 'react-router-dom';
import { updateUserDateTC} from "../../redux/profile-reducer";
import {EditableSpan} from "../../common/EditableSpan";



 const Profile = React.memo(() => {

     useEffect( () => {
         if (!isLoggedIn){
             return
         }

     },[])


     const userName = useSelector<AppRootState, string>(state => state.profile.userData.name)
     const userAvatar = useSelector<AppRootState, string>(state => state.profile.userData.avatar)
     const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)

     let [name, setName] = useState(userName);
     let [avatar, setAvatar] = useState(userAvatar);
     let [edit, setEdit] = useState(false);
     let [editName, setEditName] = useState(false);


     const dispatch = useDispatch()

     const onClickLogoutHandler = () => {
         dispatch<any>(logoutTC())
     }

    /* const onChangeEditableSpan = (name: string) => {
         debugger
         dispatch<any>(updateUserDateTC(name))
     }

     const onChangeEditableSpanAva = (avatar: string) => {
         debugger
         dispatch<any>(updateUserAvatarTC(avatar))
     }*/

     const onChangeUpdateData = () => {
         dispatch<any>(updateUserDateTC(name,avatar))
         console.log(name,avatar)
     }

   /*  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
     }
     const onChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
         setAvatar(e.currentTarget.value)
     }
     const activateViewMode = () => {
         setEdit(false);
         setEditName(false)
         onChangeUpdateData(name, avatar)
     }

     const activateEditMode = () => {
         setEdit(true);
     }
     const activateEditNameMode = () => {
         setEditName(true);
     }*/

     if (!isLoggedIn) {
         return <Navigate to={'/login'}/>
     }

     return (
         <div className="Profile">

             <img src={avatar} alt={''}/>
             <br/>
             avatar url:  <EditableSpan value={avatar}  onChange={setAvatar} />
             <br/>
             name: <EditableSpan value={name} onChange={setName}/>
             <button onClick={onChangeUpdateData}>save</button>
            {/* <img src={avatar} alt={''}/>
             <br/>
             {edit
                 ? <input value={avatar} onChange={onChangeAvatar} autoFocus onBlur={activateViewMode}/>
                 : <span onDoubleClick={activateEditMode}>Avatar Url: {avatar}</span>}


             <br/>
             {editName
             ? <input value={name} onChange={onChangeName} autoFocus onBlur={activateViewMode}/>
             : <span onDoubleClick={activateEditNameMode}>name: {name}</span>}

*/}
             <br/>
             <button onClick={onClickLogoutHandler}>Logout</button>
         </div>
     );
 })


export default Profile;
