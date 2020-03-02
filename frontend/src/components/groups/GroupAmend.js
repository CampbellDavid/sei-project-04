import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import GroupForm from './GroupForm'

class GroupAmend extends React.Component {

  state = {
    event_group: {
      group_name: ''
    }
  }

  async componentDidMount() {
    const groupId = this.props.location.pathname.charAt(23)
    const eventId = this.props.match.params.id
    console.log('groupId', groupId)
    console.log('eventId', eventId)

    try {
      const response = await axios.get(`/api/events/${eventId}/event_groups/${groupId}`)
      this.setState({ event_group: response.data })
      console.log(eventId)
    } catch (error) {
      console.log(error)
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const group_name = { ...this.state.event_group.group_name, [name]: value }
    console.log(this.state.event_group.group_name)
    this.setState({ event_group: group_name })
  }

  handleSubmit = async e => {
    e.preventDefault()
    const eventId = this.props.location.pathname.charAt(23)
    const groupId = this.props.match.params.id
    console.log(eventId)
    console.log(groupId)
    console.log(this.state.event_group.group_name)
    try {
      const { data } = await axios.put(`/api/events/${eventId}/event_groups/${groupId}/`, this.state.event_group, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      console.log({ data })
      this.props.history.push(`/events/${data.id}`)
    } catch (error) {
      console.log(error.response.data)
    }
  }


  render() {
    console.log(this.state.event_group.group_name)
    return (
      <GroupForm
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit} />
    )
  }
}

export default GroupAmend