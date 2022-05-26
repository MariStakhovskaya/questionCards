import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './PacksList.module.css'
import styleModal from '../../features/Profile/Profile.module.css'
import {
    addNewPackTC,
    deleteUserPackTC,
    getPacksListsTC,
    setUserIdAC,
    updatePackTC
} from "./packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import style from "../../App.module.css";
import {CardPacksType, PacksParamsType} from "../../api/cards-api";
import ModalProfile from "../Profile/ModalProfile";
import Pagination from "../../common/Paginator/Pagination";





const PacksList= React.memo(() =>{

    const dispatch = useDispatch<TypeDispatch>()
    const isError = useSelector<AppRootState, string>(state => state.app.error)
    const packs = useSelector<AppRootState, Array<CardPacksType>>(state => state.packs.cardPacks)
    const packsName = useSelector<AppRootState, string>(state => state.packs.params.packName)
    const userId = useSelector<AppRootState, string>(state => state.profile.userData._id)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.login.isLoggedIn)
    const cardPacksTotalCount = useSelector<AppRootState, number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppRootState, number>(state => state.packs.params.pageCount)
    const page = useSelector<AppRootState, number>(state => state.packs.params.page)
    const params = useSelector<AppRootState, PacksParamsType>(state => state.packs.params)




    const [activeButton, setActiveButton] = useState(true)
    const [nameNewPack, setNameNewPack] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [updatePackName, setUpdatePackName] = useState('')

    useEffect(() => {
            setTimeout(() => {
                dispatch(getPacksListsTC())
            }, 2000)

    }, [params])


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

    const onClickSave = () => {
        dispatch(addNewPackTC(nameNewPack))
        setNameNewPack('')
    }
   const onChangeNameNewPack = (e: ChangeEvent<HTMLInputElement>) => {
        setNameNewPack(e.currentTarget.value)
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
                    <input value={nameNewPack} onChange={onChangeNameNewPack}/>
                    <button onClick={onClickSave} className={styles.defaultButton1}>Add new pack</button>


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
                        <div key={el._id} className={styles.tableRowPacksList}>
                            <div>{el.name}</div>
                            <div>{el.cardsCount}</div>
                            <div>{el.updated}</div>
                            <div>{el.user_name}</div>
                            <div>
                                {el.user_id === userId?
                                    <>
                                        <button onClick={()=>{dispatch(deleteUserPackTC(el._id))}}>Del</button>
                                        {modalActive?

                                        <ModalProfile active={modalActive} setActive={setModalActive}>

                                            <br/>
                                            PackName: <input value={updatePackName} onChange={(e)=>{setUpdatePackName(e.currentTarget.value)}}/>
                                            <br/>
                                            <button onClick={()=>{
                                                dispatch(updatePackTC(el._id, updatePackName))
                                                setModalActive(false)    }}>save</button>
                                        </ModalProfile>
                                            :
                                        <button onClick={()=>setModalActive(true)}>Edit</button>}

                                        <button>Learn</button>
                                    </>
                                    : <button>Learn</button>
                                    }
                            </div>

                        </div>
                    ))}
                </div>}
                <div>
                    <Pagination cardPacksTotalCount={cardPacksTotalCount} pageCount={pageCount} page={page}/>
                </div>
            </div>




</div>
)
})

export default PacksList;

