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
      <section>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              placeholder="email"
              name="email"
              onChange={this.handleChange} />
          </div>
          <div>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.handleChange} />
          </div>
          <div>
            <button className="button" type="submit">Login</button>
          </div>
        </form>
      </section>
    )
  }
}

export default Login