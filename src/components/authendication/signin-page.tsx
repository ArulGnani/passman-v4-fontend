import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { isDevlopement, cookie } from '../../App'
import { Context } from '../../context'

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
                      ""

            axios.post(url, { email: email, password : password })
                .then(response => {
                    
                    if (response.data.err) setErrMsg(response.data.err)

                    if (response.data.token) {
                        cookie.set('token', response.data.token)
                        context.dispatch({ type : "authendicate" })
                        setToMainPage(true)
                    }

                })
                .catch((_) => setErrMsg("something went wrong."))
                .finally(() => setLoading(false))
        }
    }

    if (toMainPage) { return ( <Redirect to="/dashboard"/> )}

    if (toLoginInPage) { return ( <Redirect to="/login"/> )}

    return (
        <main>
            <h3> signin page</h3>
            <div> 

               { errMSg !== "" ? <p> {errMSg} </p> : null}
                { loading ? <p> loading... </p> : null}
 

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

            <div>
                <p> already have a account </p>  
                <button onClick={() => setToLogininPage(true) }> 
                    login
                </button>
            </div>
        </main>
    )
}