import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class UserView extends React.Component {

  state = {
    user: null
  }

  isOwner = () => Auth.getPayload().sub === this.state.user.id


  async componentDidMount() {
    const userId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/user/${userId}`)
      this.setState({ user: res.data })
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    if (!this.state.user) return null
    const userId = this.props.match.params.id
    const user = this.state.user
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>{user.username}</h2>
          <br />
          <div className="profile-bio">

            <div className="third-column">
              <p><span>Name: </span>{user.first_name} {user.last_name}</p>
              <p><span>Sex: </span>{user.sex}</p>
              <span>Wish List: </span>{user.wish_list.map(item => <p key={item.title}>{item.title}</p>)}
              <p><span>Bio: </span>{user.bio}</p>
              <img src={user.profile_image} alt={user.username} />
              <p><span>{user.email}</span></p>
            </div>
            {this.isOwner() && <Link to={`/user/${userId}/amend`}>
              <button type="button" className="button">Account Settings</button>
            </Link>}
          </div>

        </div>
      </div>
    )
  }
}

export default UserView