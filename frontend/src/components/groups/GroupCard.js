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

  isOwner = () => Auth.getPayload().sub === this.state.owner.id

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
    const userId = Auth.getPayload().sub
    const attendeesArray = this.state.group.attendees
    try {
      const response = await axios.get(`/api/user/${userId}`)
      const currentUser = attendeesArray.filter(attendee => attendee.id === userId)[0]
      const index = attendeesArray.indexOf(currentUser)
      attendeesArray.some(attendee => attendee.id === userId) ?
        attendeesArray.splice(index, 1) :
        attendeesArray.push(response.data)
      this.setState({ attendees: attendeesArray })
    } catch (err) {
      console.log(err)
    }
  }


  render() {
    const userId = Auth.getPayload().sub
    const { group } = this.state

    return (
      <>
        <div className="card">
          <div className="card-info">
            <h2>{group.group_name}</h2>
          </div>
          <h3>Leader: {group.attendees[0]}</h3>
          {group.attendees !== null ?
            <h3>Attendees: {group.attendees.map((attendee, i) => {
              return <li key={i}><Link to={`/user/${attendee.id}`}>{attendee.username}</Link></li>
            })}</h3>
            : null}

          <button onClick={this.handleClick} type="button" className="button">Change Group Info</button>

          {/* {Auth.isAuthenticated() ?
            <div className="buttons">
              {group.attendees.some(attendee => attendee.id === userId) ?
                <button type="button" className="button" onClick={this.handleClick}>Leave</button> :
                <button type="button" className="button" onClick={this.handleClick}>Join</button>}
              {this.isOwner() && <button type="button" className="button">Change Group Info</button>}
            </div>
            : null} */}

        </div>

      </>
    )
  }

}

export default GroupCard