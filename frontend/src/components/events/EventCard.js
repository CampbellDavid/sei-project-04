import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ id, sport, title, location, price, time_and_date }) => (
  <>
    <Link to={`/events/${id}`}>
      <div className="card">
        <div className="card-info">
          <h2>{title}</h2>
          <p>{sport} | {location} | {price} | {time_and_date}</p>
        </div>
      </div>
    </Link>
  </>
)
export default EventCard