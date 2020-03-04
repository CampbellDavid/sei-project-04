import React from "react"
import { Link } from "react-router-dom"

const SportCard = ({ id, name, image, events, owner }) => (
	<>
		<Link to={`/sports/${id}`}>
			<div className='sport-card'>
				<div className='card-info'>
					<h2 className='sport-card-title'>{name}</h2>
					<p className='sport-card-content'>
						{events.map(event => event.title)}
					</p>
					<div>
						<img src={image} alt={name} className='sport-card-img' />
					</div>
				</div>
			</div>
		</Link>
	</>
)
export default SportCard
