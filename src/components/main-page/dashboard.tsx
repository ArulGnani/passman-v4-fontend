import React from 'react'
import { Header } from './header'
import { SearchComp } from './seach-comp'
import { AllPassWord } from './all-password-comp'
import { AddNewPassWord } from './add-new-password-btn'

export const DashBorad: React.FC = () => {


    return (
        <main>
            
            <Header/> 

            <section>

                <SearchComp/>

                <AddNewPassWord />

                <AllPassWord/>

            </section>
        </main>
    )
}
