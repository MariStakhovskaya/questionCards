import React, {ChangeEvent, useEffect, useState} from 'react';
import styles from './CardsList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";
import {CardsParamsType} from "../../api/cards-api";
import {addCardTC, CardType, deleteCardTC, getCardsListsTC, updateCardTC} from "./cards-reducer";
import {useParams} from "react-router-dom";
import ModalProfile from "../Profile/ModalProfile";



const CardsList = React.memo(() => {

    const dispatch = useDispatch<TypeDispatch>()
    const isError = useSelector<AppRootState, string>(state => state.app.error)
    const cards = useSelector<AppRootState, Array<CardType>>(state => state.cards.cards)
    const params = useSelector<AppRootState, CardsParamsType>(state => state.cards.params)
    const userId = useSelector<AppRootState, string>(state => state.profile.userData._id)
    const {id} = useParams<{ id: string  }>()

    const [questionCard, setQuestionCard] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [updateQuestion, setUpdateQuestion] = useState('')
    const [IdCard, setIdCard] = useState('')

    useEffect(() => {
            if(id){
                dispatch(getCardsListsTC(id))
            }
    },[id,params,dispatch])

    const onChangeQuestionCard = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionCard(e.currentTarget.value)
    }
    const onClickSave = () => {
        if (id){
            dispatch(addCardTC(id,questionCard))
            setQuestionCard('')
        }

    }
    /* if (!isLoggedIn) {
         return <Navigate to={'/login'}/>
     }*/

    return (
        <div className={styles.cardsListBlock}>
            <h2>Cards List </h2>
            <div>

            <input value={questionCard} onChange={onChangeQuestionCard}/>
            <button onClick={onClickSave} className={styles.defaultButton1}>Add new card</button>
                {isError? isError : ''}
            </div>
            <div className={styles.tableCardsList}>
                <div className={styles.tableRowCardsList}>
                    <div>Question</div>
                    <div className={styles.answer}>Answer</div>
                    <div>Grade</div>
                    <div>Active</div>
                </div>
                {cards.map(el => (
                    <div key={el._id} className={styles.tableRowCardsList}>
                        <div>{el.question}</div>
                        <div className={styles.answer} >{el.answer}</div>
                        <div>{el.grade}</div>
                        {userId === el.user_id ?
                            <>
                                <button onClick={()=>{dispatch(deleteCardTC(el._id, el.cardsPack_id))}}>delete</button>
                                {modalActive?

                                    <ModalProfile active={modalActive} setActive={setModalActive}>

                                        <br/>
                                        Question: <input value={updateQuestion} onChange={(e)=>{setUpdateQuestion(e.currentTarget.value)}}/>
                                        <br/>
                                        <button onClick={()=>{
                                            dispatch(updateCardTC(IdCard, el.cardsPack_id,updateQuestion ))
                                            setModalActive(false)
                                            setUpdateQuestion('')}}>save</button>
                                    </ModalProfile>
                                    :
                                    <button onClick={
                                        ()=>{setModalActive(true)
                                            setUpdateQuestion(el.question)
                                            setIdCard(el._id)
                                        }}>Edit</button>}



                            </> : ''}

                    </div>
                ))}

            </div>
        </div>


    )
})

export default CardsList;

