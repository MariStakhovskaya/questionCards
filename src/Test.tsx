import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function Test() {

    return (
        <div className="Test">
        <Link to={"/Login"}>Login</Link>
        <Link to={"/profile"}>Profile</Link>

        </div>
    );
}

export default Test;
