import React, {useEffect} from 'react';
import style from './App.module.css';

import {Navigate, Route, Routes} from 'react-router-dom';
import Profile from "./features/Profile/Profile";
import Login from "./features/Login/Login";
import Registration from "./features/Registration/Registration";
import Header from "./common/Header";
import Reset from "./features/ResetPassword/Reset";
import Error404 from "./common/Page404";
import {initializeAppTC} from "./redux/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/store";
import Preloader from "./common/Preloader";

function App() {

    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootState, boolean>( state => state.app.isInitialized)

    useEffect(()=>{
        dispatch<any>(initializeAppTC())
    },[])

    if (!isInitialized){
        return <Preloader/>
    }
    return (
        <div className={style.mainBlock}>

            <Header/>

            <Routes>
                <Route path="/" element={<Profile />}/>
                <Route path="login" element={<Login/>}/>
                <Route path="profile" element={<Profile/>}/>
                <Route path="registration" element={<Registration/>}/>
                <Route path="reset" element={<Reset/>}/>
                <Route path="/404" element={<Error404/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>

            <footer className={style.footerBlock}>
                @2022 cards training project
            </footer>
        </div>
    );
}

export default App;
