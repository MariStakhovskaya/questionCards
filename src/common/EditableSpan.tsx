import React, { ChangeEvent, useState } from 'react';
import style from '../features/Profile/Modal.module.css'
type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string ) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
   let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        props.onChange(title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        setTitle(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    return editMode
        ? <input className={style.inputValue} value={props.value} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span className={style.inputValue} onDoubleClick={activateEditMode}>{props.value}</span>

})
