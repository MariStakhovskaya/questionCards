import React, {useEffect, useState} from 'react';
import styles from './PacksList.module.css'
import {getPacksListsTC, setUserIdAC} from "./packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import style from "../../App.module.css";
import {CardPacksType} from "../../api/cards-api";
import {initializeAppTC} from "../../app/app-reducer";


const PacksList= React.memo(() =>{

    const dispatch = useDispatch<TypeDispatch>()
    const isError = useSelector<AppRootState, string>(state => state.app.error)
    const packs = useSelector<AppRootState, Array<CardPacksType>>(state => state.packs.cardPacks)
    const userId = useSelector<AppRootState, string>(state => state.profile.userData._id)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)


    useEffect(() => {
        debugger
        if(!isLoggedIn){
            dispatch(initializeAppTC())
        }
        else {
            dispatch(getPacksListsTC())
        }


    }, [])

    const [activeButton, setActiveButton] = useState(true)

    const OnClickMyPacks = () => {
        dispatch(setUserIdAC(userId))
        setActiveButton(false)
        dispatch(getPacksListsTC())
    }

    const OnClickAllPacks = () => {
        setActiveButton(true)
        dispatch(setUserIdAC(''))
        dispatch(getPacksListsTC())
    }

   /* if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }*/

    return (
        <div className={styles.packsListBlock}>
            <div className={styles.packsListLeft}>
                <p>Show packs cards</p>
                <div className={styles.btnPacksList}>
                    <button onClick={OnClickMyPacks} className={!activeButton ? styles.active : ''}>My</button>
                    <button onClick={OnClickAllPacks} className={activeButton ? styles.active : ''}>All</button>
                </div>
            </div>

            <div className={styles.packsListRight}>

                <h2>Packs List</h2>

                <div>
                    <button className={styles.defaultButton1}>Add new pack</button>
                </div>
                {!isLoggedIn? <div className={style.error}>{isError}</div> :
                <div className={styles.tablePacksList}>
                    <div className={styles.tableRowPacksList}>
                        <div>Name</div>
                        <div>Cards</div>
                        <div>Update</div>
                        <div>Created by</div>
                        <div>Active</div>
                    </div>
                    {packs.map(el => (
                        <div className={styles.tableRowPacksList}>
                            <div>{el.name}</div>
                            <div>{el.cardsCount}</div>
                            <div>{el.updated}</div>
                            <div>{el.user_name}</div>
                            <div>
                                {activeButton ?
                                    <button>Learn</button> :
                                    <>
                                    <button>Del</button>
                                <button>Edit</button>
                                <button>Learn</button>
                                    </>}
                            </div>

                        </div>
                    ))}
                </div>}

            </div>



</div>
)
})

export default PacksList;
