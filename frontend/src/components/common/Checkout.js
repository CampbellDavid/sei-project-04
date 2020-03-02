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


  getTotalPrice = () => {
    const cartArr = this.state.user.shopping_cart
    const priceArr = []
    cartArr.map(item => priceArr.push(item.price))
    console.log(priceArr)
    return priceArr.reduce((a, b) => a + b)
  }


  render() {
    if (!this.state.user) return null
    console.log(this.state.user)
    const { user } = this.state
    return (
      <>
        <h1>Checkout</h1>

        {user.shopping_cart.map(item => {
          return (
            <>
              <p key={item.title}>{item.title}</p>
              <p key={item.price}>{item.price}</p>
            </>
          )
        })}
        <p>Total: {this.getTotalPrice()}</p>

      </>
    )
  }

}

export default Checkout