import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NavBar from './components/common/NavBar'
import Home from './components/common/Home'
import Login from './components/auth/Login'
import SecureRoute from './components/common/SecureRoute'
import Register from './components/auth/Register'
import EventIndex from './components/events/EventIndex'
import EventCreate from './components/events/EventCreate'
import EventAmend from './components/events/EventAmend'
import EventDisplay from './components/events/EventDisplay'
import ErrorPage from './components/common/ErrorPage'

import './App.css'
function App() {
  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />
          <SecureRoute path='/events/:id/amend' component={EventAmend} />
          <SecureRoute path='/events/create' component={EventCreate} />
          <Route path='/events/:id' component={EventDisplay} />
          <Route path='/events' component={EventIndex} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default App
