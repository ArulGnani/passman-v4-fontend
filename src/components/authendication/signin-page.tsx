import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const SignInPage: React.FC = () => {
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

    const signin = () => {
        let isValid = validate()

        if (isValid) {

            let apiEndpoint = ""

            axios.post(apiEndpoint, {
                    email: email,
                    password : password
                })
                .then(res => {
                
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const backToLogin = () => {
        return ( <Redirect to="/login"/> )
    }

    return (
        <main>

            <div> 
                <input 
                    type="email"
                    value={email}
                    placeholder="ur email id"
                />

                <input 
                    type="password"
                    value={password}
                    placeholder="password"
                />

                <button onClick={() => signin()}> 
                    sign in 
                </button>
            </div>

            <div>
                <p> already have a account </p>  
                <button onClick={() => backToLogin() }> 
                    login
                </button>
            </div>
        </main>
    )
}