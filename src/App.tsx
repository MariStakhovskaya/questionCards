import React from 'react';
import style from './App.module.css';

import {Navigate, Route, Routes} from 'react-router-dom';
import Profile from "./features/Profile/Profile";
import Login from "./features/Login/Login";
import Registration from "./features/Registration/Registration";
import Header from "./common/Header";
import Reset from "./features/ResetPassword/Reset";
import Test from "./features/Test";
import Error404 from "./common/Page404";

function App() {


    return (
        <div className={style.mainBlock}>

            <Header/>

            <Routes>
                <Route path="/" element={<Test />}/>
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
