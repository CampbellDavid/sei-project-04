import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { notify } from 'react-notify-toast'
import Auth from '../../lib/auth'


class NavBar extends React.Component {
  state = { loggedIn: false }



  toggleNavbar = () => {
    this.setState({ loggedIn: !this.state.loggedIn })
  }

  handleLogout = () => {
    Auth.logout()
    // notify.show('You\'ve logged out!', 'custom', 3000, { background: 'FFFFF0' })
    this.props.history.push('/')
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ loggedIn: false })
    }
  }



  render() {
    const userId = Auth.getPayload().sub
    console.log(this.props)
    console.log(Auth.getToken())
    return (

      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">

            <a
              className={`navbar-burger ${this.state.navOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

            <Link className="nav-item" to="/">Home</Link>
            <Link className="nav-item" to="/sports">Sports</Link>
            <Link className="nav-item" to="/events">Events</Link>
            {!Auth.isAuthenticated() && <Link className="nav-item" to="/login">Login</Link>}
            {!Auth.isAuthenticated() && <Link className="nav-item" to="/register">Register</Link>}
            {Auth.isAuthenticated() && <Link className="nav-item" to={`/user/${userId}`}>My Account</Link>}
            {Auth.isAuthenticated() && <Link className="nav-item" to={`/user/${userId}/cart`}>My Shopping Cart</Link>}
            {Auth.isAuthenticated() && <span onClick={this.handleLogout}><Link className="nav-item" to="/">Logout</Link></span>}
          </div>
        </div>
      </nav>
    )

  }

}



export default withRouter(NavBar)