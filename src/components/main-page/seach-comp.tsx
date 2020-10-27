import React, { useState, useContext, useEffect } from 'react'; 
import './styles/search-password.css'
import { Context } from '../../context';

export const SearchComp: React.FC = () => {
    const [domin, setDomin] = useState("")
    const context = useContext(Context)

    useEffect(() => {

        if (domin === "") {
            let org = context.state.orignalPasswords

            context.dispatch({
                type: "updateShow",
                payload: org
            })
        } else {
            let result = context.state.orignalPasswords.filter(obj => {

                let regx = new RegExp(domin)

                if (obj.domin.match(regx) !== null) {
                    return obj
                }
            })

            context.dispatch({ 
                type: "updateShow", 
                payload: result
            })  
        }
    }, [domin])

    return (
        <section id="search-password">
            <input 
                type="text" 
                value={domin}
                onChange={(e) => setDomin(e.target.value)}
                placeholder="search password by domin-name"
            />
    
        </section>
    )
}