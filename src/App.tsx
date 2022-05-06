import React from 'react';
import './App.css';
import Test from "./Test";

import {Navigate, Route, Routes } from 'react-router-dom';
import Profile from "./Profile";
import Login from "./features/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Test />}/>
        <Route path="login" element={<Login />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="/404" element={<h1>404 Page not found</h1>}/>
        <Route path="*" element={<Navigate to="/404"/>}/>

      </Routes>
    </div>
  );
}

export default App;
