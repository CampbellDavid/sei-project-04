import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import SportCard from './SportCard'
import { Link } from 'react-router-dom'


class SportIndex extends React.Component {
  state = {
    sports: null
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/sports')
      this.setState({ sports: response.data })
    }
    catch (error) {
      console.log(error)
    }
  }

  render() {
    if (!this.state.sports) return null
    const sports = this.state.sports
    console.log('sports:', sports)
    return (
      <section>
        <h1>Sport index</h1>
        {sports.map(sport => {
          return (
            <SportCard key={sport.id} {...sport} />
          )
        })}

        <div>
          {Auth.isAuthenticated() ?
            <Link to="/sports/create">
              <button type="button" className="button">Create Sport</button>
            </Link>
            : null}
        </div>

      </section>
    )
  }
}

export default SportIndex