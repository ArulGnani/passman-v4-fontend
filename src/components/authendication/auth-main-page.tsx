import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { cookie, isDevlopement } from '../../App'
import { Context } from '../../context'
import axios from 'axios'
import './styles/main-page.css'

export const AuthMainPage: React.FC = () => {
    const context = useContext(Context)
    const [toLoginPage, setToLoginPage] = useState(false)
    const [toSignInPage, setToSignInPage] = useState(false)
    const [loading, setLoading] = useState(false)
    const [toMainPage, setToMainPage] = useState(false)
    const [msg, setMsg] = useState("")
 
    useEffect(() => { validateToken() }, []) 

    const validateToken = async (): Promise<any> => {
        let token = cookie.get("token")
        // console.log(token)

        if (token !== undefined) {
            setLoading(true)

            let url = isDevlopement ?
                      "http://localhost:5000/api/auth/validate-token/" : 
                      "https://passman-v4-backend.herokuapp.com/api/auth/validate-token/"

            axios.get(url, { headers : { token : token }})
                .then(response => {
                    // console.log(response)
                    setLoading(false)

                    if (response.data.err) setMsg(response.data.err)

                    if (response.data.valid) {
                        context.dispatch({ type : "authendicate" })
                        // console.log(context.state.auth)
                        setToMainPage(true)
                    } else {
                        cookie.remove("token")
                    }
                })
                .catch((_) => {
                    setLoading(false)
                    setMsg("something went wrong.")
                })
        }
    }

    if (toMainPage) { return ( <Redirect to="/dashboard"/> )}

    if (toLoginPage) { return ( <Redirect to="/login"/> )}

    if (toSignInPage) { return ( <Redirect to="/signin"/> )}
    
    return (
        <main id="main-page">
            { loading ?
                <div id="main-page-loading">
                    <p className="loading"> 
                        laoding... 
                    </p>
                </div> :
                <div id="main-page-comp">
                    { msg !== "" ? <p> {msg} </p> : null}

                    <div id="login" className="auth-comp">
                        <button onClick={() => setToLoginPage(true)}
                            className="auth-btn"> 
                            login 
                        </button>
                    </div>
                
                    <div id="signin" className="auth-comp">
                        <button onClick={() => setToSignInPage(true)}
                            className="auth-btn">
                            sign in 
                        </button>
                    </div>
                </div>
            }
        </main>
    )
}

 