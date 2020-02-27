import React from 'react'
import Auth from '../../lib/auth'
import axios from 'axios'
import { Link } from 'react-router-dom'

class GroupCard extends React.Component {

  state = {
    group: {
      group_name: '',
      users: [],
      id: ''
    },
    errors: {}
  }

  isOwner = () => Auth.getPayload().sub === this.state.group.id // check if correct

  async componentDidMount() {
    const groupId = this.props.id
    const eventId = this.props.match.params.id // not functional
    try {
      const response = await axios.get(`/api/${eventId}/event_groups/${groupId}`)
      this.setState({ group: response.data })
    } catch (error) {
      this.setState({ errors: error.res.data.errors })
    }
  }

  handleClick = async e => {
    e.preventDefault()
    const userId = Auth.getPayload().sub
    const usersArray = this.state.group.users
    try {
      const response = await axios.get(`/api/user/${userId}/`)
      const currentUser = usersArray.filter(user => user.id === userId)[0]
      const index = usersArray.indexOf(currentUser)
      usersArray.some(user => user.id === userId) ?
        usersArray.splice(index, 1) :
        usersArray.push(response.data)
      this.setState({ users: usersArray })
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
          {/* <h3>Leader: {group.users[0]}</h3> */}
          {/* {group.users !== null ?
            <h3>Attendees: {group.users.map((user, i) => {
              return <li key={i}><Link to={`/user/${user.id}`}>{user.username}</Link></li>
            })}</h3>
            : null} */}

          {Auth.isAuthenticated() ?
            <div className="buttons">
              {group.users.some(user => user.id === userId) ?
                <button type="button" className="button" onClick={this.handleClick}>Leave</button> :
                <button type="button" className="button" onClick={this.handleClick}>Join</button>}
              {this.isOwner() && <button type="button" className="button">Change Group Info</button>}
            </div>
            : null}
        </div>

      </>
    )
  }

}

export default GroupCard