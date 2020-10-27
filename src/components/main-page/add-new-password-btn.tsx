import React, { useState } from 'react'; 
import { Redirect } from 'react-router-dom';
import './styles/add-new-password.css'
import addIcon from '../../resource/add.png'
 

export const AddNewPassWord: React.FC = () => {
    const [redirect, setRedirect] = useState(false)

    if (redirect) { return <Redirect to="/create-new-password"/> }

    return (
        <div id="add-new-password">
            <button onClick={() => setRedirect(true)}>
 
                <img src={addIcon} alt="add-icon"/>
 
                <p> add new password </p>
            </button>
        </div>
    )
}