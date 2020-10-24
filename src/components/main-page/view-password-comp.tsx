import React, { useState } from 'react'; 
import ReactDOM from 'react-dom'

interface Iprops {
    domin : string,
    name : string,
    password : string,
    open : boolean
}

export const ViewPassWord = ({ domin, name, password }: Iprops) => {
    const [copied, setCopied] = useState(false)
    const [close, setClose] = useState(false)
    const [open, setOpen] = useState(true)

    const copyPassword = () => {
        if (!copied) {
            navigator.clipboard.writeText(password)
                .then(() => {
                    setCopied(!copied)
                })
        }
    }

    if (!open) return null

    return ReactDOM.createPortal(
        <section>
            
            <button onClick={() => setOpen(false)}> 
                close 
            </button>

            { close === false ?
                <div>
                    { copied ? 
                        <div>
                            <p> copied... </p>

                            <button onClick={() => setClose(!close)}> 
                                X 
                            </button>    
                        </div>
                    : null}
                </div>
            :null }
           
           
            <div>
            <p> Domin : {domin}</p>
            </div>

            <div>
                <p> name : {name} </p>
            </div>

            <div>
                <p>password</p>
                
                <button onClick={() => copyPassword}> 
                    copy 
                </button>
            </div>
        </section>
    ,document.getElementById("pop-up") as HTMLElement)
}   