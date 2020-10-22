import React, { useState } from 'react'; 
import { ViewPassWord } from './view-password-comp';


export const AllPassWord: React.FC = () => {
    const [viewPassword, setViewPassword] = useState(false)

    if (viewPassword) {
        // return ( <Redirect to="/view/:pid" /> )
    }

    return (
        <section>
            all password component

            {/* loop all password and render in table view */}


        </section>    
    )
}   