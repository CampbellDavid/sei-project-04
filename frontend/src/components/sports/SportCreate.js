import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import SportForm from './SportForm'

class SportCreate extends React.Component {

  state = {
    data: {
      name: '',
      image: '',
      events: ''
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.prsportDefault()
    try {
      const response = await axios.post('/api/sports/', this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push(`/sports/${response.data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <section className="form">
        <SportForm
          data={this.state.data}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
      </section>
    )
  }
}

export default SportCreate