import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Auth from '../../lib/auth'

class SportDisplay extends React.Component {

  state = {
    sport: null
  }

  async componentDidMount() {
    try {
      const sportId = this.props.match.params.id
      const response = await axios.get(`/api/sports/${sportId}`)
      this.setState({ sport: response.data })
    } catch (error) {
      console.log(error)
    }
  }

  isOwner = () => {
    return Auth.getPayload().sub === this.state.sport.owner.id
  }

  deleteSport = async () => {
    const sportId = this.props.match.params.id
    try {
      await axios.delete(`/api/sports/${sportId}/`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      this.props.history.push('/sports')
    } catch (err) {
      this.props.history.push('/unknown-path')
    }
  }

  render() {
    if (!this.state.sport) return null
    const sportId = this.props.match.params.id
    return (

      <div className="sport-show">
        <h1>{this.state.sport.name}</h1>
        <img src={this.state.sport.image} alt={this.state.sport.name} />

        <Link to={'/events'}>
          <button type="button" className="button">Add Event</button>
        </Link>


        {Auth.isAuthenticated() ?
          <>
            {this.isOwner() &&
              <div>
                <Link to={`/sports/${sportId}/amend`}>
                  <button
                    className="button"
                    type="button">Amend</button>
                </Link>
                <button className="button" onClick={this.deleteSport}>Delete</button>
              </div>}

          </>
          : null}

      </div>
    )
  }
}

export default SportDisplay