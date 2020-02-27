import React from 'react'

const GroupForm = ({ handleChange, handleSubmit }) => {
  return (
    <section className="form">
      <h1>Make a Group</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-div">
          <input
            onChange={handleChange}
            placeholder="Group Name"
            name="group_name"
            required />
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

export default GroupForm