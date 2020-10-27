import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { isDevlopement, cookie } from '../../App'
import { Context } from '../../context'
import './styles/signin-page.css'

export const SignInPage: React.FC = () => {
    const [toLoginInPage, setToLogininPage] = useState(false)
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

    const signin = () => {
        let isValid = validate()

        if (isValid) {
            setLoading(true)

            let url = isDevlopement ?
                      "http://localhost:5000/api/auth/signin" : 
                      "https://passman-v4-backend.herokuapp.com/api/auth/signin"

            axios.post(url, { email: email, password : password })
                .then(response => {
                    setLoading(false)

                    if (response.data.err) setErrMsg(response.data.err)

                    if (response.data.token) {

                        let days7 = (60*60*24*7) * 1000

                        cookie.set('token', response.data.token ,{
                            path: "/",
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

    if (toMainPage) { return ( <Redirect to="/dashboard"/> )}

    if (toLoginInPage) { return ( <Redirect to="/login"/> )}

    return (
        <main id="signin-page">
            <section className="auth-section">
 
                <h1> signin page </h1>
                
                <div className="auth-form"> 

                    { errMSg !== "" ? 
                        <p className="err"> {errMSg} </p> 
                    : null}

                    { loading ? 
                        <p className="loading"> loading... </p> 
                    : null}
    

                    <input 
                        type="email"
                        value={email}
                        placeholder="ur email id"
                        onChange={(e) => setEmail(e.target.value)}
                    /><br/>

                    <input 
                        type="password"
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    /><br/>

                    <button onClick={() => signin()}> 
                        sign in 
                    </button>
                </div>

                <div className="auth-option-section">
                    <p> already have a account </p>  
                    <button onClick={() => setToLogininPage(true) }> 
                        login
                    </button>
                </div>
            </section>
        </main>
    )
}