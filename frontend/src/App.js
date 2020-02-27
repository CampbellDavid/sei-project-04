import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NavBar from './components/common/NavBar'
import SecureRoute from './components/common/SecureRoute'

import Home from './components/common/Home'
import Login from './components/auth/Login'
import UserView from './components/user/UserView'
import UserAmend from './components/user/UserAmend'

import Register from './components/auth/Register'
import EventIndex from './components/events/EventIndex'
import EventCreate from './components/events/EventCreate'
import EventAmend from './components/events/EventAmend'
import EventDisplay from './components/events/EventDisplay'

import GroupMake from './components/groups/GroupMake'

import SportIndex from './components/sports/SportIndex'
import SportCreate from './components/sports/SportCreate'
import SportAmend from './components/sports/SportAmend'
import SportDisplay from './components/sports/SportDisplay'

import ErrorPage from './components/common/ErrorPage'

import './App.css'

function App() {
  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Home} />

          <SecureRoute path='/events/:id/groups/create' component={GroupMake} />
          <SecureRoute path='/events/:id/amend' component={EventAmend} />
          <SecureRoute path='/events/create' component={EventCreate} />
          <Route path='/events/:id' component={EventDisplay} />
          <Route path='/events' component={EventIndex} />

          <SecureRoute path='/sports/:id/amend' component={SportAmend} />
          <SecureRoute path='/sports/create' component={SportCreate} />
          <Route path='/sports/:id' component={SportDisplay} />
          <Route path='/sports' component={SportIndex} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <SecureRoute path='/user/:id/amend' component={UserAmend} />
          <Route path='/user/:id' component={UserView} />

          <Route path='/*' component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default App
