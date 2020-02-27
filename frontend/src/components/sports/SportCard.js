import React from 'react'
import { Link } from 'react-router-dom'

const SportCard = ({ id, name, image, events, owner }) => (
  <>
    <Link to={`/sports/${id}`}>
      <div className="card">
        <div className="card-info">
          <h2>{name}</h2>
          <img src={image} alt={name} height="100px" width="200px" />
        </div>
      </div>
    </Link>
  </>
)
export default SportCard