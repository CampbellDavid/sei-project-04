import React from "react"
import axios from "axios"
import Auth from "../../lib/auth"
import { Link } from "react-router-dom"

class ShoppingCart extends React.Component {
	state = {
		user: null,
		errors: null
	}

	async componentDidMount() {
		const userId = this.props.match.params.id
		try {
			const res = await axios.get(`/api/user/${userId}`)
			this.setState({ user: res.data })
			console.log(res.data)
		} catch (error) {
			console.log(error)
		}
	}

	// handleChange = e => {
	//   const user = { ...this.state.user, [e.target.name]: e.target.value }
	//   const errors = { ...this.state.errors, [e.target.name]: '' }
	//   this.setState({ user, errors })
	// }

	// handleSubmit = async e => {
	//   e.preventDefault()
	//   const userId = this.props.match.params.id
	//   try {
	//     await axios.put(`/api/user/${userId}`, this.state.user, {
	//       headers: { Authorization: `Bearer ${Auth.getToken()}` }
	//     })
	//     this.props.history.push(`api/user/${userId}`)
	//   } catch (error) {
	//     console.log(error)
	//   }
	// }

	render() {
		const userId = Auth.getPayload().sub
		console.log("rendering")
		if (!this.state.user) return null
		const { user } = this.state
		return (
			<section className='cart-body'>
				{Auth.isAuthenticated() && <p>{user.username}'s Shopping Cart:</p>}
				{Auth.isAuthenticated() &&
				this.state.user.shopping_cart.length !== 0 ? (
					this.state.user.shopping_cart.map(item => {
						return (
							<>
								<h3>{item.title}</h3>
								<h3>{item.price}</h3>
							</>
						)
					})
				) : (
					<p>Your cart is empty!</p>
				)}

				<Link to={`/user/${userId}/checkout`}>
					<button type='button' className='button'>
						Checkout
					</button>
				</Link>
			</section>
		)
	}
}

export default ShoppingCart
