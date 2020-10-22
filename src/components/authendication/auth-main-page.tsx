import React from 'react'
import { Redirect } from 'react-router-dom'

export const AuthMainPage: React.FC = () => {
 
    const toLoginPage = () => {
        return (
            <Redirect to="/login"/>
        )
    }

    const toSignInPage = () => {
        return ( <Redirect to="/sign in"/> )
    }

    return (
        <main>
            <div>
                <button onClick={() => toLoginPage()}> 
                    login 
                </button>
            </div>
            <div>
                <button onClick={() => toSignInPage()}>
                    sign in 
                </button>
            </div>
        </main>
    )
}

 