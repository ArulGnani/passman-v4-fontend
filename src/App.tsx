import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import { AuthMainPage } from './components/authendication/auth-main-page'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/">
          <AuthMainPage />
        </Route>

        <Route path="/login">
          {/* login component */}
        </Route>

        <Route path="/signin">
          {/* signin component */}
        </Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
