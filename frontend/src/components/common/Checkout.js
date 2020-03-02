import axios from 'axios'
import React from 'react'
import Auth from '../../lib/auth'

class Checkout extends React.Component {
  state = {
    user: null
  }

  async componentDidMount() {
    const userId = Auth.getPayload().sub
    try {
      const res = await axios.get(`/api/user/${userId}`)
      this.setState({ user: res.data })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (!this.state.user) return null
    console.log(this.state.user)
    const { user } = this.state
    return (
      <>
        <h1>Checkout</h1>
        {user.shopping_cart.map(item => <p>{item}</p>)}
      </>
    )
  }

}

export default Checkout