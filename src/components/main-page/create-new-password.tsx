import React, { useState, useEffect, useContext } from 'react'; 
import { isDevlopement, cookie } from '../../App';
import axios from 'axios'
import { Context } from '../../context';
import { ViewPassWord } from './view-password-comp';
import { Redirect } from 'react-router-dom';
import './styles/create-new-password.css'
import closeIcon from '../../resource/close.png'

interface IpassObj {
    name: string,
    domin: string,
    password: string
}

export const CreateNewPassword: React.FC = () => {
    const [domin, setDomin] = useState("")
    const [name, setName] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [newPasswordObj, setNewPasswordObj] = useState<any>({})
    const context = useContext(Context)
    const [showPassword, setShowPassword] = useState(false)
    const [toHome, setToHome] = useState(false)

    useEffect(() => setMsg(""), [domin, name])

    const validateInput = () => {
        if (domin === "" || name === "") {
            setMsg("all fields are required.")
        } else if (domin.length < 2) {
            setMsg("enter an valid domin name.")
        } else if (name.length < 2) {
            setMsg("ur name is too short")
        } else {
            return true 
        }
    }


    const createPassword = async (): Promise<void> => {
        let token = cookie.get("token")

        if (validateInput() && token) {
            setLoading(true)

            let url = isDevlopement ? 
                        "http://localhost:5000/api/create-new-password" : 
                        "https://passman-v4-backend.herokuapp.com/api/create-new-password"

            axios.post(url, 
                    { name: name, domin: domin },
                    { headers : { token : token }
                })
                .then(response => {

                    if (response.data.err) setMsg(response.data.err)

                    if (response.data) {
                        setLoading(false)

                        context.dispatch({ 
                            type : "newPassword", 
                            payload : response.data
                        })

                        setNewPasswordObj(response.data)
                        setShowPassword(true)
                    }
                })
                .catch((_) => {
                    setLoading(false)
                    setMsg("something went wrong.")
                })
        }
    }

    if (toHome) { return ( <Redirect to="/dashboard"/> )}

    if (showPassword) { 
        return (
            <ViewPassWord 
                name={newPasswordObj.name}
                domin={newPasswordObj.domin}
                password={newPasswordObj.password}
                open={true}
                closePopup={() => setShowPassword(false)}
            />
        )
    }
 
    return (
        <main id="create-new-password">
            <div id="create-new-password-comp">

                <h2> create new password </h2>

                <button 
                    onClick={() => setToHome(true)}
                    id="close-btn"
                > 
                    <img src={closeIcon} alt="close"/>
                </button>

                <div id="new-password-form">

                    { msg !== "" ?
                        <p className="err"> {msg} </p>
                    :null}

                    { loading ? 
                        <p> loading... </p> 
                    :null}

                    <input 
                        type="text" 
                        value={domin}
                        onChange={(e) => setDomin(e.target.value)}
                        placeholder="domin"
                    />

                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="name"
                    /> 

                    <button 
                        onClick={() => createPassword()}
                    > 
                        create password 
                    </button>
                </div>
            </div>
        </main>
    )
}