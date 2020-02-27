import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './components/common/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import EventIndex from './components/events/EventIndex'

import './App.css'
function App() {
  return (


    <main>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/events' component={EventIndex} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default App
