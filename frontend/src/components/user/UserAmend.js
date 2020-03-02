import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import UserForm from './UserForm'

class UserAmend extends React.Component {

  state = {
    user: null,
    errors: null
  }

  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/user/${userId}`)
      this.setState({ user: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = e => {
    const user = { ...this.state.user, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ user, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const userId = this.props.match.params.id
    try {
      await axios.put(`/api/user/${userId}`, this.state.user, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`api/user/${userId}`)
    } catch (error) {
      console.log(error.response.data)
    }
  }

  render() {
    console.log('rendering')
    if (!this.state.user) return null
    const { user } = this.state
    return (
      <>
        {Auth.isAuthenticated() && <p>{user.username}</p>}
        {Auth.isAuthenticated() && <UserForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />}
      </>
    )
  }
}

export default UserAmend