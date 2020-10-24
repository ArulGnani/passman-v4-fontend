import React, { useState, useEffect, useContext } from 'react'; 
import { ViewPassWord } from './view-password-comp';
import { cookie, isDevlopement } from '../../App';
import Axios from 'axios';
import { Context } from '../../context';


export const AllPassWord: React.FC = () => {
    const context = useContext(Context)
    const [viewPassword, setViewPassword] = useState(false)
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => { getAllPasswords() }, [])

    const getAllPasswords = async () => {
        let token = cookie.get('token')

        if (token) {

            let url = isDevlopement ? 
                      "http://localhost:5000/api/get-all-passwords" : 
                      ""

            Axios.get(url, { headers : { token : token }})
                .then(response => {

                    if (response.data.err) setMsg(response.data.err)

                    if (response.data) {
                        context.dispatch({ 
                            type: "passwords",
                            payload: response.data
                        })
                    }
                })
                .catch((_) => setMsg("something went wrong."))
                .finally(() => setLoading(false))
        }
    }


    if (viewPassword) {
        // return ( <Redirect to="/view/:pid" /> )
    }

    return (
        <section>
            { loading ? <p> loading. </p> : null }
            {
                context.state.passwords.map((obj, idx) => {

                    return (
                        <div key={idx}>

                            <p> domin : {obj.domin} </p>
                            <p> name : {obj.name}</p>

                            <button onClick={() => setViewPassword(true)}> 
                                open 
                            </button>
                        </div>
                    )
                })
            }
        </section>    
    )
}   