import React from 'react'
import Auth from '../../lib/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'

class GroupCard extends React.Component {

  state = {
    group: {
      group_name: '',
      attendees: [],
      event: {},
      owner: {},
      id: ''
    },
    errors: {}
  }

  isOwner = () => Auth.getPayload().sub === this.state.group.owner.id

  async componentDidMount() {
    const groupId = this.props.id
    const eventId = this.props.event.id
    console.log(groupId)
    console.log(eventId)
    try {
      const response = await axios.get(`/api/events/${eventId}/event_groups/${groupId}/`)
      console.log(response)
      this.setState({ group: response.data })
    } catch (error) {
      this.setState({ errors: error.response.data.errors })
    }
  }

  handleClick = async e => {
    e.preventDefault()
    const groupId = this.props.id
    const eventId = this.props.event.id
    const userId = Auth.getPayload().sub

    const attendeesArray = this.state.group.attendees
    try {
      const user = await axios.get(`/api/user/${userId}`)
      console.log(user)
      const currentUser = attendeesArray.filter(attendee => attendee.id === userId)[0]
      const index = attendeesArray.indexOf(currentUser)
      attendeesArray.some(attendee => attendee.id === userId) ?
        attendeesArray.splice(index, 1) :
        console.log('dataaaa', user.data.id)
      attendeesArray.push(user.data.id)
      this.setState({ attendees: attendeesArray })
      console.log(this.state)

    } catch (err) {
      console.log(err.response.data)
    }
  }

  handleSubmit = async e => {
    e.preventDefault()
    const groupId = this.props.id
    const eventId = this.props.event.id
    // const userId = Auth.getPayload().sub
    console.log(this.state)
    try {

      await axios.put(`/api/events/${eventId}/event_groups/${groupId}/`, this.state.group, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }


  render() {
    const userId = Auth.getPayload().sub
    const { group } = this.state
    const lead = group.attendees[0]
    if (lead) { console.log('leader:', lead.id) }

    return (
      <>
        <div className="card">
          <div className="card-info">
            <h2>{group.group_name}</h2>
          </div>
          {lead && <h3>Leader: {lead.username}</h3>}
          {group.attendees !== null ?
            <h3>Attendees: {group.attendees.map((attendee, i) => {
              return <li key={i}><Link to={`/user/${attendee.id}`}>{attendee.username}</Link></li>
            })}</h3>
            : null}

          <button onClick={this.handleClick} type="button" className="button">Join</button>
          <button onClick={this.handleSubmit} type="button" className="button">Confirm</button>


          {group.attendees !== null ?
            (Auth.isAuthenticated() ?
              <div className="buttons">
                {group.attendees.some(attendee => attendee.id === userId) ?
                  <button type="button" className="button" onClick={this.handleClick}>Leave</button> :
                  <button type="button" className="button" onClick={this.handleClick}>Join</button>}
                {this.isOwner() && <button type="button" className="button">Change Group Info</button>}
              </div>
              : null)
            : null}



        </div>

      </>
    )
  }

}

export default GroupCard