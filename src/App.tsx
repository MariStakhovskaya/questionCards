import React, {useEffect} from 'react';
import style from './App.module.css';
import Header from "./common/Header/Header";
import {initializeAppTC} from "./app/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./redux/store";
import Preloader from "./common/Preloader/Preloader";
import {AllRoutes} from "./app/Routes/AllRoutes";

function App() {

    const dispatch = useDispatch()
    const isInitialized = useSelector<AppRootState, boolean>( state => state.app.isInitialized)


    useEffect(()=>{
        dispatch<any>(initializeAppTC())
    },[])

   /* if (!isInitialized){
        return <Preloader/>
    }*/

    return (
        <div className={style.mainBlock}>

            <Header/>
            {!isInitialized && <Preloader/>}
           <AllRoutes />

            <footer className={style.footerBlock}>
                @2022 cards training project
            </footer>
        </div>
    );
}

export default App;
