import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class EventDisplay extends React.Component {

  state = {
    event: null,
    groups: null
  }

  async componentDidMount() {
    try {

      const eventId = this.props.match.params.id
      await axios.all([
        axios.get(`/api/events/${eventId}`),
        // axios.get(`/api/events/${eventId}/groups`)
      ])
        .then(axios.spread((eventRequest) => {
          this.setState({
            event: eventRequest.data,
            // groups: groupsRequest.data
          })
        }))
    } catch (error) {
      console.log(error)
    }
  }

  isOwner = () => {
    return Auth.getPayload().sub === this.state.event.owner.id
  }

  render() {
    if (!this.state.event) return null
    const eventId = this.props.match.params.id
    return (
      <>
        <div className="event-show">
          <h1>{this.state.event.title}</h1>
        </div>

        {Auth.isAuthenticated() ?
          <>
            <Link to={`/events/${eventId}/groups/create`}>
              <button type="button" className="button">Create Croup</button>
            </Link>

            {this.isOwner() &&
              <div>
                <Link to={`/events/${eventId}/amend`}>
                  <button
                    className="button"
                    type="button">Amend</button>
                </Link>
                <button className="button" onClick={this.handleDelete}>Delete</button>
              </div>}

          </>
          : null}

      </>
    )
  }
}

export default EventDisplay