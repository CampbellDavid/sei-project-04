import React from "react"
import { Link } from "react-router-dom"

const EventCard = ({
	id,
	sport,
	title,
	location,
	price,
	time_and_date,
	description
}) => (
	<div className='event-card'>
		<Link to={`/events/${id}`}>
			<h2 className='ev-card-title'>{title}</h2>
			<p className='ev-card-content'>{sport}</p>
			<p className='ev-card-content'>{location}</p>
			<p className='ev-card-content'>{price}</p>
			<p className='ev-card-content'>{time_and_date}</p>
			<p className='ev-card-content'>{description}</p>
		</Link>
	</div>
)
export default EventCard
