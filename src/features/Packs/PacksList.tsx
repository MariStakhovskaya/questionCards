import React, {useEffect, useState} from 'react';
import styles from './PacksList.module.css'
import {getPacksListsTC} from "./packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import style from "../../App.module.css";
import {CardPacksType} from "../../api/cards-api";


function PacksList() {

    const dispatch = useDispatch<TypeDispatch>()
    const isError = useSelector<AppRootState, string>(state => state.login.error)
    const packs = useSelector<AppRootState, Array<CardPacksType>>(state => state.packs.cardPacks)

    useEffect(() => {
        dispatch(getPacksListsTC())
    }, [])

    const [activeButton, setActiveButton] = useState(true)

    return (
        <div className={styles.packsListBlock}>
            <div className={styles.packsListLeft}>
                <p>Show packs cards</p>
                <div className={styles.btnPacksList}>
                    <button onClick={() => setActiveButton(true)}>My</button>
                    <button className={activeButton ? styles.active : ''}>All</button>
                </div>
            </div>
            <div className={styles.packsListRight}>
                <h2>Packs List</h2>
                <div className={style.error}>{isError}</div>
                <div>
                    <button className={styles.defaultButton1}>Add new pack</button>
                </div>
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
                                <button>Del</button>
                                <button>Edit</button>
                                <button>Learn</button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>



</div>
)
}

export default PacksList;

