import React, { useState } from 'react'; 


export const SearchComp: React.FC = () => {
    const [search, setSearch] = useState("")


    return (
        <section>
            <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search password by domin-name"
            />

            <button> search </button>
        </section>
    )
}