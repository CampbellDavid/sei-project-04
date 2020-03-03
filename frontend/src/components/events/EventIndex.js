import React from "react"
import axios from "axios"
import Auth from "../../lib/auth"
import EventCard from "./EventCard"
import { Link } from "react-router-dom"

class EventIndex extends React.Component {
	state = {
		events: null
	}

	async componentDidMount() {
		try {
			const response = await axios.get("/api/events")
			this.setState({ events: response.data })
		} catch (error) {
			console.log(error)
		}
	}

	render() {
		if (!this.state.events) return null
		const events = this.state.events
		console.log("events:", events)
		return (
			<section className='main-body-event'>
				<h1 className='event-head'>Event's</h1>
				{events.map(event => {
					return <EventCard key={event.id} {...event} />
				})}

				<div>
					<hr className='divider-small' />
					{Auth.isAuthenticated() ? (
						<Link to='/events/create'>
							<button type='button' className='button'>
								Create New Event
							</button>
						</Link>
					) : null}
				</div>
			</section>
		)
	}
}

export default EventIndex
