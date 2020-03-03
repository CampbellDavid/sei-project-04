import React from "react"

const UserForm = ({ user, handleChange, handleSubmit }) => {
	return (
		<section className='form main-body'>
			<h1 className='main-heading'>User Settings</h1>

			<form onSubmit={handleSubmit}>
				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='Email'
						name='email'
						value={user.email}
					/>
				</div>

				<div className='main-form-group'>
					<textarea
						className='main-user-form-field'
						rows='5'
						cols='30'
						onChange={handleChange}
						placeholder='Bio'
						name='bio'
						value={user.bio}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='Sex'
						name='sex'
						value={user.sex}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						placeholder='Profile Image'
						name='profile_image'
						value={user.profile_image}
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						type='password'
						placeholder='New Password'
						name='password'
					/>
				</div>

				<div className='main-form-group'>
					<input
						className='main-user-form-field'
						onChange={handleChange}
						type='password'
						placeholder='Confirm New Password'
						name='password_confirmation'
					/>
				</div>

				<div className='button-div'>
					<hr className='divider' />
					<button className='button is-rounded' type='submit'>
						Submit
					</button>
					<hr className='divider-small' />
				</div>
			</form>
		</section>
	)
}

export default UserForm
