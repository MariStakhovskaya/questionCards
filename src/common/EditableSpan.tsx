
import React, { ChangeEvent, useState } from 'react';
import {updateUserDateTC} from "../redux/profile-reducer";
import {useDispatch} from "react-redux";


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
        setTitle(title)

       ;

    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.currentTarget.value)
    }

    return editMode
        ? <input value={props.value} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>

})
