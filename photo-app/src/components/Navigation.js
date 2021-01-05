import React from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navigation = () => {
	const { currentUser, logout } = useAuth()
	const handleLogout = () => {
		logout()
	}


	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Link to="/" className="navbar-brand">
						Photo app
					</Link>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{
								currentUser ? (
									<NavDropdown title={currentUser.displayName || currentUser.email} id="basic-nav-dropdown">
										<NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
										<NavDropdown.Divider />
										<NavLink to="/login" className="dropdown-item" onClick={handleLogout}>Log Out</NavLink>
									</NavDropdown>
								) : (
									<NavLink to="/login" className="nav-link">Login</NavLink>
								)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
