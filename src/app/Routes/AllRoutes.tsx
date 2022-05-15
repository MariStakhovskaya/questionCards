import {Navigate, Route, Routes} from "react-router-dom";
import Profile from "../../features/Profile/Profile";
import Login from "../../features/Login/Login";
import Registration from "../../features/Registration/Registration";
import Reset from "../../features/ResetPassword/Reset";
import Error404 from "../../common/Page404";
import React from "react";

export const AllRoutes = () => {
    return (
    <Routes>
        <Route path="/" element={<Profile />}/>
        <Route path="login" element={<Login/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="registration" element={<Registration/>}/>
        <Route path="reset" element={<Reset/>}/>
        <Route path="/404" element={<Error404/>}/>
        <Route path="*" element={<Navigate to="/404"/>}/>
    </Routes>)
}

