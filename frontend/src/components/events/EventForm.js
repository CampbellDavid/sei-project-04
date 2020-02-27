import React from 'react'

const EventForm = ({ data, handleChange, handleSubmit }) => {
  return (
    <div>
      <h1>Event Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Title"
            name="title"
            value={data.title}
            required />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Price"
            name="price"
            value={data.price}
            required />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            type="datetime-local"
            name="time_and_date"
            value={data.time_and_date}
            required />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Location"
            name="location"
            value={data.location}
            required />
        </div>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Sport"
            name="sport"
          // value={data.sport} 
          />
        </div>

        <div className="button-div">
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EventForm