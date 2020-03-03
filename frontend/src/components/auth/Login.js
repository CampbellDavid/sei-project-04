import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Login extends React.Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    error: ''
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data, error: '' })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/login', this.state.data)
      Auth.setToken(res.data.token)
      this.props.history.push('/')

    } catch (error) {
      this.setState({ error: 'Wrong Username/Password Combination' })
    }
  }

  render() {
    return (
      <section className="login-body">
        <h1>Login</h1>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="login-form-group">
              <input
                className="login-form-field"
                placeholder="email"
                name="email"
                onChange={this.handleChange}
                required />
              <label for="email" class="login-form-label">Email</label>
            </div>
            <div className="login-form-group">
              <input
                className="login-form-field"
                type="password"
                placeholder="password"
                name="password"
                onChange={this.handleChange}
                required />
              <label for="password" class="login-form-label">Password</label>
            </div>
            <hr className="divider" />
            <div>
              <button className="button" type="submit">Login</button>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Login