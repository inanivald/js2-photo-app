import React from 'react'
import { Link } from 'react-router-dom'


const Confirmation = () => {

return (
		<div className="text-center mt-2">
			<p>Thank you. Please check your email for reset link.</p>
			<p><Link to="/login">Go to login page</Link></p>
		</div>
	)
}

export default Confirmation



