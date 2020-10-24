import React, { useState, useEffect, useContext } from 'react'; 
import { isDevlopement, cookie } from '../../App';
import axios from 'axios'
import { Context } from '../../context';
import { ViewPassWord } from './view-password-comp';

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
    const [back, setBack] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => setMsg(""), [domin, name])

    const validateInput = () => {
        if (domin === "" || name === "") {
            setMsg("all fields are required.")
        } else if (domin.length > 2) {
            setMsg("enter an valid domin name.")
        } else if (name.length > 2) {
            setMsg("ur name is too short")
        } else {
            return true 
        }
    }


    const createPassword = async (): Promise<void> => {
        let token = cookie.get("token")

        if (validateInput() && token) {

            let url = isDevlopement ? 
                      "http://localhost:5000/api/create-new-password" : 
                      ""

            axios.post(url, 
                    { name: name, domin: domin },
                    { headers : { token : token }
                })
                .then(response => {

                    if (response.data.err) setMsg(response.data.err)

                    if (response.data) {

                        context.dispatch({ 
                            type : "newPassword", 
                            payload : response.data
                        })

                        setNewPasswordObj(response.data)
                        setShowPassword(true)

                    }
                })
                .catch((_) => setMsg("something went wrong."))
                .finally(() => setLoading(false))
        }
    }

    if (showPassword) { 
        return <ViewPassWord 
                    name={newPasswordObj.name}
                    domin={newPasswordObj.domin}
                    password={newPasswordObj.password}
                    open={true}
                />
    }

    return (
        <section>

            <input 
                type="text" 
                value={domin}
                onChange={(e) => setDomin(e.target.value)}
                placeholder="domin"
            /><br/>

            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
            /> <br/>

            <button onClick={() => createPassword()}> 
                create password 
            </button>

        </section>
    )
}