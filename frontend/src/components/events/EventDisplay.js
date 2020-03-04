import React from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Auth from "../../lib/auth"
import GroupCard from "../groups/GroupCard"

class EventDisplay extends React.Component {
	state = {
		event: null,
		groups: null,
		user: null
	}

	async componentDidMount() {
		try {
			const userId = Auth.getPayload().sub
			const eventId = this.props.match.params.id
			await axios
				.all([
					axios.get(`/api/events/${eventId}`),
					axios.get(`/api/events/${eventId}/event_groups`),
					Auth.getPayload() && axios.get(`/api/user/${userId}`)
				])
				.then(
					axios.spread((eventRequest, groupsRequest, userRequest) => {
						this.setState({
							event: eventRequest.data,
							groups: groupsRequest.data,
							user: userRequest.data
						})
					})
				)
		} catch (error) {
			console.log(error)
		}
	}

	isOwner = () => {
		return Auth.getPayload().sub === this.state.event.owner.id
	}

	deleteEvent = async () => {
		const eventId = this.props.match.params.id
		try {
			await axios.delete(`/api/events/${eventId}/`, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			this.props.history.push("/events")
		} catch (err) {
			this.props.history.push("/unknown-path")
		}
	}

	addToWishList = async () => {
		const userId = Auth.getPayload().sub
		const wishListArr = this.state.user.wish_list
		const currentEvent = this.state.event.id
		console.log(currentEvent)
		const eventId = this.state.event.id
		const index = wishListArr.indexOf(currentEvent)

		wishListArr.includes(eventId)
			? wishListArr.splice(index, 1)
			: wishListArr.push(this.state.event.id)
		this.setState({ user: { wish_list: wishListArr } })
		console.log(this.state.user)
		try {
			await axios.put(`/api/user/${userId}`, this.state.user, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
		} catch (err) {
			console.log(err.response.data)
		}
	}

	addToCart = async () => {
		const userId = Auth.getPayload().sub
		const cartArr = this.state.user.shopping_cart
		const currentEventForCart = this.state.event.id
		console.log(currentEventForCart)
		const eventId = this.state.event.id
		const index = cartArr.indexOf(currentEventForCart)

		cartArr.includes(eventId)
			? cartArr.splice(index, 1)
			: cartArr.push(this.state.event.id)
		this.setState({ user: { shopping_cart: cartArr } })
		console.log(this.state.user)
		try {
			await axios.put(`/api/user/${userId}`, this.state.user, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
		} catch (err) {
			console.log(err.response.data)
		}
	}

	render() {
		if (!this.state.event) return null
		if (!this.state.user) return null
		const eventId = this.state.event.id
		const wishListArr = this.state.user.wish_list
		const cartArr = this.state.user.shopping_cart
		console.log(cartArr, wishListArr)
		const filteredGroups = this.state.groups.filter(
			group => group.event.id === this.state.event.id
		)

		return (
			<section className='main-body-event-disp'>
				<h1 className='ev-disp-title'>{this.state.event.title}</h1>
				<h3 className='ev-disp-subtitle'>Price: £{this.state.event.price}</h3>
				<div>
					<h3 className='ev-disp-subtitle'>Groups</h3>

					{filteredGroups.map(group => (
						<div className='grp-card-sec'>
							<GroupCard key={group.id} {...group} />
						</div>
					))}
				</div>
				<hr className='divider-small' />
				<div className='buttons'>
					{Auth.isAuthenticated() ? (
						wishListArr && wishListArr.includes(eventId) ? (
							<button
								className='button is-rounded arr-btn'
								onClick={this.addToWishList}
							>
								Remove from Wishlist
							</button>
						) : (
							<button
								className='button is-rounded arr-btn'
								onClick={this.addToWishList}
							>
								Add to Wishlist
							</button>
						)
					) : null}

					<>
						{Auth.isAuthenticated() ? (
							cartArr && cartArr.includes(eventId) ? (
								<button
									className='button is-rounded arr-btn'
									onClick={this.addToCart}
								>
									Remove from Cart
								</button>
							) : (
								<button
									className='button is-rounded arr-btn'
									onClick={this.addToCart}
								>
									Add to Cart
								</button>
							)
						) : null}
					</>

					{Auth.isAuthenticated() ? (
						<>
							<Link to={`/events/${eventId}/event_groups/create`}>
								<button
									type='button is-rounded'
									className='button is-rounded arr-btn'
								>
									Create New Group
								</button>
							</Link>

							{this.isOwner() && (
								<div>
									<Link to={`/events/${eventId}/amend`}>
										<button className='button is-rounded arr-btn' type='button'>
											Amend Event
										</button>
									</Link>
									<button
										className='button is-rounded is-danger arr-btn'
										onClick={this.deleteEvent}
									>
										Delete Event
									</button>
								</div>
							)}
						</>
					) : null}
				</div>
			</section>
		)
	}
}

export default EventDisplay
