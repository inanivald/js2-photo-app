import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthRoute from './components/AuthRoute'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home'
import Login from './components/Login'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Signup from './components/Signup'
import UpdateProfile from './components/UpdateProfile'
import AuthContextProvider from './contexts/AuthContext'
import './assets/scss/app.scss'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navigation />

				<Container className="py-3">
					<Routes>

						<AuthRoute path="/">
							<Home />
						</AuthRoute>

					  <Route path="/reset-password">
							<ResetPassword />
						</Route>

						<Route path="/login">
							<Login />
						</Route>

						<Route path="/signup">
							<Signup />
						</Route>

						<AuthRoute path="/update-profile">
							<UpdateProfile />
						</AuthRoute>

						<Route path="*" element={<NotFound />} />

					</Routes>
				</Container>
			</AuthContextProvider>
		</Router>
	)
}

export default App