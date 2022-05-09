import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function Test() {

    return (
        <div className="Test">
        <Link to={"/login"}>Login</Link>
        <Link to={"/profile"}>Profile</Link>
        <Link to={"/registration"}>Registration</Link>

        </div>
    );
}

export default Test;
