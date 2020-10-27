import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { isDevlopement, cookie } from '../../App'
import { Context } from '../../context'
import './styles/login-page.css'

export const LoginPage:React.FC = () => {
    const [toSigninPage, setToSigninPage] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errMSg, setErrMsg] = useState("")
    const [toMainPage, setToMainPage] = useState(false)
    const context = useContext(Context)

    useEffect(() => { setErrMsg("") }, [email, password])

    const validate = () => {
        if (email === "" || password === "") {
            setErrMsg("all fields required.")
        } else if (email.length < 6) {
            setErrMsg("enter an valid email id.")
        } else if (password.length < 3) {
            setErrMsg("ur password is too short.")
        } else {
            return true 
        }
    }
 
    const login = () => {
        let isValid = validate()

        if (isValid) {
            setLoading(true)
    
            let url = isDevlopement ?
                      "http://localhost:5000/api/auth/login" :
                      "https://passman-v4-backend.herokuapp.com/api/auth/login"

            axios.post(url, { email: email, password : password })
                .then(response => {
                    setLoading(false)

                    if (response.data.err) setErrMsg(response.data.err)
                    
                    if (response.data.token) {
                        
                        let days7 = (60*60*24*7) * 1000

                        cookie.set('token', response.data.token, {
                            path : "/",
                            expires : new Date(Date.now() + days7)
                        })
                        context.dispatch({ type : "authendicate" })
                        setToMainPage(true)
                    }
                })
                .catch((_) => {
                    setLoading(false)
                    setErrMsg("something went wrong.")
                })
        }
    }

    if (toMainPage) { return (<Redirect to="/dashboard"/> )}

    if (toSigninPage) { return ( <Redirect to="/signin"/> )}
    
    return (
        <main id="login-page">
            <section className="auth-section">
                <h1> login page </h1>

                <div className="auth-form">
            
                    { errMSg !== "" ? 
                        <p className="err"> {errMSg} </p> 
                    : null}
                    
                    { loading ? 
                        <p className="loading"> loading... </p> 
                    : null}
    
                    <input 
                        type="email" 
                        placeholder="ur email id" 
                        value={email}    
                        onChange={(e) => setEmail(e.target.value)}
                    /><br/>

                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br/>
                    
                    <button onClick={() => login()}> login </button>

                </div>

                <div className="auth-option-section">
                    <p> don't have an account </p>  
                    <button onClick={() => setToSigninPage(true) }> 
                        sign in 
                    </button>
                </div>
            </section>
        </main>
    )
}