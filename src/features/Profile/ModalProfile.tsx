import React from 'react';
import  styles from './Modal.module.css';


type ModalProfilePropsType = {
    active: boolean
    setActive: (active:boolean) => void
    children: any
}

const ModalProfile = React.memo((props:ModalProfilePropsType) => {

    return (
        <div className={props.active ?  `${styles.modal} ${styles.active}` : styles.modal} onClick={()=> props.setActive(false)}>
            <div className={props.active ?  `${styles.modalContent} ${styles.active}` : styles.modalContent} onClick={(e)=>e.stopPropagation()}>
                {props.children}
            </div>

        </div>
    );
})


export default ModalProfile
