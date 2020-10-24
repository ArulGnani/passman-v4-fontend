import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import { AuthMainPage } from './components/authendication/auth-main-page'
import { LoginPage } from './components/authendication/login-page'
import { SignInPage } from './components/authendication/signin-page'
import { DashBorad } from './components/main-page/dashboard';
import { ViewPassWord } from './components/main-page/view-password-comp';
import { CreateNewPassword } from './components/main-page/create-new-password';

import { initState, reducer, Context } from './context'
import Cookie from 'universal-cookie'
import { PrivateRouter } from './privare-router';

export const cookie = new Cookie()
export const isDevlopement = process.env.NODE_ENV === "development"

function App() {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
      <BrowserRouter>
        <Context.Provider value={{ state, dispatch }}>

          <Route exact path="/">
            <AuthMainPage />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/signin">
            <SignInPage />
          </Route>

          <PrivateRouter 
            path="/dashboard"
            component={DashBorad}
            auth={state.auth}
          />

          <PrivateRouter 
            path="/password/:pid"
            component={ViewPassWord}
            auth={state.auth}
          />
        
          <PrivateRouter 
            path="/create-new-password"
            component={CreateNewPassword}
            auth={state.auth}
          />

        </Context.Provider>
      </BrowserRouter>
  );
}

export default App;
