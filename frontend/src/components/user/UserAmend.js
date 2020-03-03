import React from "react"
import axios from "axios"
import Auth from "../../lib/auth"
import UserForm from "./UserForm"

class UserAmend extends React.Component {
	state = {
		user: null,
		errors: null
	}

	async componentDidMount() {
		const userId = Auth.getPayload().sub
		try {
			const res = await axios.get(`/api/user/${userId}`)
			this.setState({ user: res.data })
			console.log(this.state)
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = e => {
		const user = { ...this.state.user, [e.target.name]: e.target.value }
		const errors = { ...this.state.errors, [e.target.name]: "" }
		this.setState({ user, errors })
	}

	handleSubmit = async e => {
		e.preventDefault()
		const userId = Auth.getPayload().sub
		const userData = { ...this.state.user }
		try {
			await axios.put(`/api/user/${userId}`, userData, {
				headers: { Authorization: `Bearer ${Auth.getToken()}` }
			})
			this.props.history.push(`api/user/${userId}`)
		} catch (error) {
			console.log(error.response.data)
		}
	}

	render() {
		console.log("rendering")
		if (!this.state.user) return null
		const { user } = this.state
		return (
			<>
				{Auth.isAuthenticated() && (
					<UserForm
						user={this.state.user}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						errors={this.state.errors}
					/>
				)}
			</>
		)
	}
}

export default UserAmend
