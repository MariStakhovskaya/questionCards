import React from 'react';
import preloader from 'preloader.gif'



function Preloader() {

    return (
        <div className="preloader">
           <img src={preloader} alt="preloader"/>
        </div>
    );
}

export default Preloader;

