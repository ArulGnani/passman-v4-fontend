import React from 'react'
import { Header } from './header'
import { SearchComp } from './seach-comp'
import { AllPassWords } from './all-password-comp'
import { AddNewPassWord } from './add-new-password-btn'
import './styles/dashboard.css'

export const DashBorad: React.FC = () => {
    return (
        <main id="dashboard">
            
            <Header/> 

            <section id="dashboard-comp">
    
                <AddNewPassWord />

                <SearchComp/>

                <AllPassWords/>

            </section>
        </main>
    )
}
 