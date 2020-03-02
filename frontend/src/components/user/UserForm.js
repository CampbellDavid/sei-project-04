import React from 'react'

const UserForm = ({ user, handleChange, handleSubmit }) => {
  return (
    <section className="form">

      <h1>User Settings</h1>

      <form onSubmit={handleSubmit}>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Email"
            name="email"
            value={user.email}
          />
        </div>

        <div className="form-div">
          <textarea
            rows="5"
            cols="30"
            onChange={handleChange}
            placeholder="Bio"
            name="bio"
            value={user.bio} />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Sex"
            name="sex"
            value={user.sex}
          />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Profile Image"
            name="profile_image"
            value={user.profile_image}
          />
        </div>

        <div>
          <input
            onChange={handleChange}
            type="password"
            placeholder="password"
            name="password"
          />
        </div>

        <div>
          <input
            onChange={handleChange}
            type="password"
            placeholder="confirm password"
            name="password_confirmation"
          />
        </div>

        <div className="button-div">
          <button
            className="button"
            type="submit">
            Submit</button>
        </div>

      </form>
    </section>
  )
}

export default UserForm