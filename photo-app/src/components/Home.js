import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const Home = () => {
	const { currentUser } = useAuth()
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/albums`)
	}
	

	return (
		<div className="home text-center">
			<h1>Welcome {currentUser.displayName || currentUser.email}!</h1>

			<p>You can start creating your albums.</p>
			<Button className="btn btn-standard" size="lg" onClick={handleClick}>
                Start
            </Button>
		</div>
	)
}

export default Home