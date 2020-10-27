import React, { useState, useEffect, useContext } from 'react'; 
import { ViewPassWord } from './view-password-comp';
import { cookie, isDevlopement } from '../../App';
import Axios from 'axios';
import { Context } from '../../context';
import './styles/all-password.css'


export const AllPassWords: React.FC = () => {
    const context = useContext(Context)
    const [viewPassword, setViewPassword] = useState(false)
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [passwordObj, setPasswordObj] = useState<any>({})
    const [currScreenWidth, setCurrScreenWidth] = useState(0)

    useEffect(() => { getAllPasswords() }, [])

    const getAllPasswords = async () => {
        let token = cookie.get('token')
        let passObjs = context.state.orignalPasswords.length 

        if (passObjs !== 0) {
            console.log("no request made")
            let existingObjs = context.state.orignalPasswords

            context.dispatch({
                type: "updateShow",
                payload: existingObjs
            })
        }

        if (token && passObjs === 0) {
            setLoading(true)

            let url = isDevlopement ? 
                      "http://localhost:5000/api/get-all-passwords" : 
                      "https://passman-v4-backend.herokuapp.com/api/get-all-passwords"

            Axios.get(url, { headers : { token : token }})
                .then(response => {

                    if (response.data.err) setMsg(response.data.err)

                    if (response.data) {
                        context.dispatch({ 
                            type: "setOrignalPasswordObj",
                            payload: response.data
                        })

                        context.dispatch({
                            type: "updateShow",
                            payload: response.data
                        })
                    }
                })
                .catch((_) => setMsg("something went wrong."))
                .finally(() => setLoading(false))
        }
    }

    const showPassword = (obj: {}) => {
        setPasswordObj(obj)
        setViewPassword(true)
    }

    if (viewPassword) {
        return ( 
            <ViewPassWord 
                name={passwordObj.name}
                domin={passwordObj.domin}
                password={passwordObj.password}
                open={true}
                closePopup={() => setViewPassword(false)}
            />
        )
    }

    return (
        <section id="all-passwords">
            
            { loading ? 
                <p className="loading"> loading... </p> 
            : null }

            { msg !== "" ? 
                <p className="err"> {msg} </p>
            :null}

            { window.innerWidth < 500 ? 
                <div id="pass-objs-cards">
                    { context.state.show.map((obj, idx) => {
                        return (
                            <div key={idx} className="obj-card"> 
                                <p> Domin : 
                                    <b> { obj.domin } </b>
                                </p>
                                <p> Name : 
                                    <b> { obj.name } </b>
                                </p>
                                <p> password: 
                                    <button 
                                        onClick={()=>showPassword(obj)}
                                    >
                                        open
                                    </button>
                                </p>
                            </div>
                        )
                    })}

                </div> 
            : null }

            { window.innerWidth > 500 ? 
                <table>
                    <thead>
                        <tr>
                            <th> Domin </th> 
                            <th> name </th>
                            <th> open </th>
                        </tr>
                    </thead>

                    <tbody>
                        { context.state.show.map((obj, idx) => {
                            return (
                                <tr key={idx} id="pass-obj">

                                    <td>
                                        <p> {obj.domin} </p>
                                    </td>
                                    
                                    <td>
                                        <p> {obj.name}</p>
                                    </td>
                                    
                                    <td>
                                        <button 
                                            onClick={() => showPassword(obj)}
                                            className="open-btn"
                                        > 
                                            open 
                                        </button>
                                    </td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </table> 
            :null}
        </section>    
    )
}   