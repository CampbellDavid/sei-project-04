import React from 'react'
import axios from 'axios'

class EventIndex extends React.Component {
  state = {
    events: null
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/api/events')
      this.setState({ events: response.data })
    }
    catch (error) {
      console.log(error)
    }
  }

  render() {
    if (!this.state.events) return null
    const events = this.state.events
    console.log(events)
    return (
      <section>
        <h1>Event index</h1>
        {events.map(event => {
          return (
            <h1 key={event.id}>{event.title}</h1>
          )
        })}
      </section>
    )
  }
}

export default EventIndex