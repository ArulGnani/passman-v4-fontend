import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

export const LoginPage:React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const validate = () => {
        if (email === "" || password === "") {
            // set msg    
        } else if (email.length < 6) {
            // msg
        } else if (password.length < 3) {
            // msg
        } else {
            return true 
        }
    }
 
    const login = () => {
        let isValid = validate()

        if (isValid) {

            let apiEndpoint = ""

            axios.post(apiEndpoint, {
                email: email,
                password : password
            }).then(res => {
                
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const toMainPage = () => {
        return (<Redirect to="/main"/>)
    }

    const backToSigin = () => {
        return ( <Redirect to="/signin"/> )
    }
    
    return (
        <main>
            <div>
                <input 
                    type="email" 
                    placeholder="ur email id" 
                    value={email}    
                />
                <input 
                    type="password" 
                    placeholder="password" 
                    value={password}
                />
                
                <button onClick={() => login()}> login </button>

            </div>
            <div>
                <p> don't have an account </p>  
                <button onClick={() => backToSigin() }> 
                    sign in 
                </button>
            </div>
        </main>
    )
}