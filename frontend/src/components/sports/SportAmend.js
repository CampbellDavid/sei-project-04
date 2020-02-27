import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import SportForm from './SportForm'

class SportAmend extends React.Component {

  state = {
    data: {
      name: '',
      image: '',
      events: ''
    }
  }

  async componentDidMount() {
    const sportId = this.props.match.params.id
    try {
      const response = await axios.get(`/api/sports/${sportId}/`)
      this.setState({ data: response.data })
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const data = { ...this.state.data, [name]: value }
    console.log(data)
    this.setState({ data })
  }

  handleSubmit = async e => {
    e.prsportDefault()
    const sportId = this.props.match.params.id
    console.log(sportId)
    try {
      const { data } = await axios.put(`/api/sports/${sportId}/`, this.state.data, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log({ data })
      this.props.history.push(`/sports/${data.id}`)
    } catch (error) {
      console.log(error.response.data)
    }
  }


  render() {
    console.log(this.state.data)
    return (
      <SportForm
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} />
    )
  }
}

export default SportAmend