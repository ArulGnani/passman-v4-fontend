import React from 'react'
import { Route, Redirect } from 'react-router-dom'


export const PrivateRouter = ({ component, auth, ...rest }: any) => {
    if (auth) {

        return <Route
                    {...rest}
                    component={component}
                    render={component}
                />
    } else {

        let renderComp = () => <Redirect to="/"/>

        return <Route 
                    component={renderComp}
                    render={undefined}
               />
    }
}

