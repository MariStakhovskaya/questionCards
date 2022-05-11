import React, { ChangeEvent, useState } from 'react';
import {updateUserDateTC} from "../redux/profile-reducer";
import {useDispatch} from "react-redux";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(title);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);

    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onClick={activateEditMode}>{title}<button>Update</button></span>

});