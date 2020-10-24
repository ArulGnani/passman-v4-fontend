import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { cookie, isDevlopement } from '../../App'
import { Context } from '../../context'
import axios from 'axios'
import { METHODS } from 'http'

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

        if (token !== undefined) {
            setLoading(true)

            let url = isDevlopement ?
                      "http://localhost:5000/api/auth/validate-token/" : 
                      ""
            axios.get(url, { headers : { token : token }})
                .then(response => {
                    setLoading(false)

                    if (response.data.err) setMsg(response.data.err)

                    if (response.data.valid) {
                        context.dispatch({ type : "authendicate" })
                        console.log(context.state.auth)
                        setToMainPage(true)
                    } else {
                        cookie.remove("token")
                    }
                })
                .catch(err => setMsg("something went wrong."))
        }
    }

    if (toMainPage) { return ( <Redirect to="/dashboard"/> )}

    if (toLoginPage) { return ( <Redirect to="/login"/> )}

    if (toSignInPage) { return ( <Redirect to="/signin"/> )}
    
    return (
        <React.Fragment>
            { loading ?
                <div>
                    <p> laoding... </p>
                </div> :
                <main>
                    { msg !== "" ? <p> {msg} </p> : null}
                    <div>
                        <button onClick={() => setToLoginPage(true)}> 
                            login 
                        </button>
                    </div>
                    <div>
                        <button onClick={() => setToSignInPage(true)}>
                            sign in 
                        </button>
                    </div>
                </main>
            }
        </React.Fragment>
    )
}

 