import React, { useState } from 'react'; 


export const ViewPassWord: React.FC = () => {
    const [domin, setDomin ] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <section>

            <div>
               <p> Domin : {domin}</p>
            </div>

            <div>
                <p> name : {name} </p>
            </div>

            <div>
                <p>password</p>
                <button> copy </button>
            </div>


        </section>
    )
}   