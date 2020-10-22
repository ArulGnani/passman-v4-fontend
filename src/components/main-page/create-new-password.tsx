import React, { useState } from 'react'; 


export const CreateNewPassword: React.FC = () => {
    const [domin, setDomin] = useState("")
    const [name, setName] = useState("")

    return (
        <section>

            <p> domin : {domin}</p>

            <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button> create password </button>

        </section>
    )
}