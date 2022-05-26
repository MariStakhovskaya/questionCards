import React, {useState} from 'react';

import style from './Pagination.module.css'
import {useDispatch} from "react-redux";
import {setCurrentPageAC} from "../../features/Packs/packs-reducer";

type PaginatorPropsType = {
    cardPacksTotalCount: number,
    pageCount: number,
    page: number,
    portionSize?: number
}

function Pagination({portionSize = 15,...props}:PaginatorPropsType) {
debugger
    const dispatch = useDispatch()
    let pagesCount = Math.ceil(props.cardPacksTotalCount/ props.pageCount) // Сколько всего страниц

    let pages: Array<number> = []

    for (let i = 1; i <= pagesCount; i++)
    {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount/portionSize)  // сколько всего получится порций страниц
    let [portionNumber, setPortionNumber] = useState(1)  // Номер порции
    let leftPortionPageNumber = (portionNumber-1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    const OnChangeCurrentPage =(numberPage: number) => {
        dispatch(setCurrentPageAC(numberPage))
    }
    return (
        <div className={style.paginatorBlock}>
            {portionNumber >1 && <button onClick={()=>setPortionNumber(portionNumber-1)}>PREV</button>}

            {pages.filter(page => page >=leftPortionPageNumber && page<=rightPortionPageNumber)
                .map(page => (
                <span onClick={()=>{OnChangeCurrentPage(page)}} className={props.page === page ? style.selectedPage : ''}>{page}</span>
                ))}

            {portionCount > portionNumber && <button onClick={()=>{setPortionNumber(portionNumber+1)}}>NEXT</button>}
        </div>
    );
}

export default Pagination;

