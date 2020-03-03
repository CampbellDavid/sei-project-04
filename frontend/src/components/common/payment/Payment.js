import React from 'react'
import { render } from 'react-dom'
import Card from 'react-credit-cards'
import Auth from '../../../lib/auth'
import axios from 'axios'
import { formatCreditCardNumber, formatCVC, formatExpirationDate, formatFormData } from './utils'
import 'react-credit-cards/es/styles-compiled.css'
import styles from './styles.css'

class Payment extends React.Component {

  state = {
    user: null,
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    issuer: '',
    focused: '',
    formData: null,
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

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer })
    }
  }

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    })
  }

  handleInputChange = ({ target }) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value)
    }

    this.setState({ [target.name]: target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { issuer } = this.state
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value
        return acc
      }, {})

    this.setState({ formData })
    this.form.reset()
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
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state
    console.log(this.state.user)
    return (
      <div key="Payment">
        <div className="App-payment">
          <h1>Secure Payment</h1>
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              <small>E.g.: 49..., 51..., 36..., 37...</small>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <p>Total: {this.getTotalPrice()}</p>
            <div className="form-actions">
              <button className="btn btn-primary btn-block">PAY</button>
            </div>
          </form>
          {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => <div key={i}>{d}</div>)}
            </div>
          )}

        </div>

      </div>
    )
  }
}

export default Payment