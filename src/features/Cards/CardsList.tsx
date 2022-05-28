import React, {useEffect} from 'react';
import styles from './CardsList.module.css'

import {useDispatch, useSelector} from "react-redux";
import {AppRootState, TypeDispatch} from "../../redux/store";

import {CardsParamsType} from "../../api/cards-api";

import {CardType, getCardsListsTC} from "./cards-reducer";
import {useParams} from "react-router-dom";


const CardsList = React.memo(() => {

    const dispatch = useDispatch<TypeDispatch>()

    const isError = useSelector<AppRootState, string>(state => state.app.error)

    const cards = useSelector<AppRootState, Array<CardType>>(state => state.cards.cards)
    const params = useSelector<AppRootState, CardsParamsType>(state => state.cards.params)
    const {id} = useParams<{ id: string  }>()

    useEffect(() => {
            if(id){
                dispatch(getCardsListsTC(id))
            }
    },[id])


    /* if (!isLoggedIn) {
         return <Navigate to={'/login'}/>
     }*/

    return (
        <div className={styles.cardsListBlock}>
            <h2>Cards List</h2>

            <div className={styles.tableCardsList}>
                <div className={styles.tableRowCardsList}>
                    <div>Question</div>
                    <div>Answer</div>
                    <div>Grade</div>
                    <div>Active</div>
                </div>
                {cards.map(el => (
                    <div key={el._id} className={styles.tableRowCardsList}>
                        <div>{el.question}</div>
                        <div>{el.answer}</div>
                        <div>{el.grade}</div>
                        <div>edit</div>

                    </div>
                ))}

            </div>
        </div>


    )
})

export default CardsList;

