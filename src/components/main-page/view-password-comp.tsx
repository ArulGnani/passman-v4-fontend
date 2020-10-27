import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom'
import './styles/view-password.css'
import closeIcon from '../../resource/close.png'

interface Iprops {
    domin : string,
    name : string,
    password : string,
    open: boolean,
    closePopup : () => any
}

export const ViewPassWord = ({domin,name,password,closePopup,open}: Iprops) => {
    const [copied, setCopied] = useState(false)
    const [close, setClose] = useState(false)

    const copyPassword = () => {
        console.log("clik")
        if (copied === false) {
            navigator.clipboard.writeText(password)
                .then(() => setCopied(true))
        }
    }

    if (!open) return null 

    return ReactDOM.createPortal(
        <div id="view-password">
            <div id="view-password-comp">
            
                <button onClick={() => closePopup()} 
                    id="view-pass-cls-btn"
                > 
                    <img src={closeIcon} alt="close"/> 
                </button>

                <div id="view-pass">

                    { copied ? 
                        <p id="copied"> copied. </p>
                    :null}

                    <p> Domin : 
                        <b> {domin} </b> 
                    </p>

                    <p> name : 
                        <b> {name} </b>
                    </p>

                    <div>
                        <p>password</p>:
                        
                        <button onClick={() => copyPassword()}> 
                            copy 
                        </button>
                    </div>
                </div>               
            </div>
        </div>
    ,document.getElementById("pop-up") as HTMLElement)
}   