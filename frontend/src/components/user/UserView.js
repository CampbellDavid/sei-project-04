import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class UserView extends React.Component {

  state = {
    user: {
      username: '',
      profile_image: '',
      wish_list: [],
      email: '',
      bio: '',
      sex: '',
      id: ''
    }
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
    const userId = this.props.match.params.id
    const { username, first_name, last_name, email, profile_image, bio, sex, wish_list } = this.state.user
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>{username}</h2>
          <br />
          <div className="profile-bio">

            <div className="third-column">
              <p><span>Name</span> {first_name}</p>
              <p><span>Bio</span>{bio}</p>
              <img src={profile_image} alt={username} />
              <p><span>{email}</span></p>
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