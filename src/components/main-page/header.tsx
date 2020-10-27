import React, { useState } from 'react'; 
import './styles/header.css'

import logo from '../../resource/header/logo.png'
import logoutIcon from '../../resource/header/logout.png'
import { cookie } from '../../App';
import { Redirect } from 'react-router-dom';

export const Header: React.FC = () => {
    const [toMainPage, setToMainPage] = useState(false)

    const logout = () => {
        cookie.remove("token")
        setToMainPage(true)
    }

    if (toMainPage) return <Redirect to="/"/> 
     
    return (
        <header>

            <img src={logo} alt="logo"/>

            <div>
                <button onClick={() => logout()}> 
                    <img 
                        src={logoutIcon} 
                        alt="logout"
                    /> 
                </button>
            </div>
        </header>
    )
}