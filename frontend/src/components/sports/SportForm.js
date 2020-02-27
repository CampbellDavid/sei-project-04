import React from 'react'

const SportForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <div>
      <h1>Sport Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Name"
            name="name"
            value={data.name}
            required />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Image"
            name="image"
            value={data.image} />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            name="events"
            value={data.events} />
        </div>

        <div className="button-div">
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SportForm