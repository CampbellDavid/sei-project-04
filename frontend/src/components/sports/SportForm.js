import React from "react"

const SportForm = ({ data, handleChange, handleSubmit }) => {
	console.log(data)
	return (
		<section className='main-body'>
			<div>
				<h1 className='main-heading'>Sport</h1>
				<div className='form-wrapper'>
					<form onSubmit={handleSubmit}>
						<div className='main-form-group'>
							<input
								className='main-form-field'
								onChange={handleChange}
								placeholder='Name'
								name='name'
								value={data.name}
								required
							/>
							<label for='name' class='main-form-label'>
								Name
							</label>
						</div>

						<div className='main-form-group'>
							<input
								className='main-form-field'
								onChange={handleChange}
								placeholder='Image'
								name='image'
								value={data.image}
								required
							/>
							<label for='image' class='main-form-label'>
								Image URL
							</label>
						</div>
						<hr className='divider' />
						<div className='button-div'>
							<button className='button is-rounded' type='submit'>
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	)
}

export default SportForm
