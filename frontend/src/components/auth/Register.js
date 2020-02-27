import React from 'react'
import axios from 'axios'

export default class Register extends React.Component {
  state = {
    data: null,
    emailValid: false,
    formValid: false,
    passwordValid: false,
    formErrors: { email: '', password: '' }
  }

  handleChange = e => {
    const name = e.target.name
    const value = e.target.value
    const data = { ...this.state.data, [name]: value }
    this.setState({ data },
      () => {
        this.validateField(name, value)
      })
  }


  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors
    let emailValid = this.state.emailValid
    let passwordValid = this.state.passwordValid

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        fieldValidationErrors.email = emailValid ? '' : ' is invalid'
        break
      case 'password':
        passwordValid = value.length >= 1
        fieldValidationErrors.password = passwordValid ? '' : ' is too short'
        break
      default:
        break
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm)
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid })
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error')
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post('/api/register', this.state.data)
      this.props.history.push('/login')
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    return (
      <section>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>

          <div>
            <input
              onChange={this.handleChange}
              placeholder="username"
              name="username"
              required />
          </div>

          <div>
            <input
              onChange={this.handleChange}
              type="email"
              placeholder="email"
              name="email"
              required />
          </div>

          <div>
            <input
              onChange={this.handleChange}
              type="password"
              placeholder="password"
              name="password"
              required />
          </div>

          <div>
            <input
              onChange={this.handleChange}
              type="password"
              placeholder="confirm password"
              name="password_confirmation"
              required />
          </div>

          <div>
            <button type="submit" disabled={!this.state.formValid}>Register</button>
          </div>

        </form>
      </section>
    )
  }
}

//TODO: Import form errors