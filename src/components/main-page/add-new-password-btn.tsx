import React, { useState } from 'react'; 
import { Redirect } from 'react-router-dom';


export const AddNewPassWord: React.FC = () => {
    const [redirect, setRedirect] = useState(false)

    if (redirect) { return <Redirect to="/create-new-password"/> }

    return (
        <button onClick={() => setRedirect(true)}>
            add new password
        </button>
    )
}