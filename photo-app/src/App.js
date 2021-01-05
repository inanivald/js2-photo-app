import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SimpleReactLightbox from 'simple-react-lightbox'
import Album from './components/albums/Album'
import Albums from './components/albums/Albums'
import CreateAlbum from './components/albums/CreateAlbum'
import AuthRoute from './components/AuthRoute'
import ResetPassword from './components/ResetPassword'
import Home from './components/Home'
import Login from './components/Login'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import Signup from './components/Signup'
import Confirmation from './components/Confirmation'
import UpdateProfile from './components/UpdateProfile'
import AuthContextProvider from './contexts/AuthContext'
import './assets/scss/app.scss'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<SimpleReactLightbox>
					<Navigation />

					<Container className="py-3">
						<Routes>

							<AuthRoute path="/">
								<Home />
							</AuthRoute>

							<AuthRoute path="/albums">
								<Route path="/">
									<Albums />
								</Route>

								<Route path="/create">
									<CreateAlbum />
								</Route>

								<Route path="/:albumId">
									<Album />
								</Route>
							</AuthRoute>

							<Route path="/reset">
								<ResetPassword />
							</Route>

							<Route path="/login">
								<Login />
							</Route>

							<Route path="/signup">
								<Signup />
							</Route>

							<Route path="/confirmation">
								<Confirmation />
							</Route>


							<AuthRoute path="/update-profile">
								<UpdateProfile />
							</AuthRoute>

							<Route path="*" element={<NotFound />} />

						</Routes>
					</Container>
				</SimpleReactLightbox>
			</AuthContextProvider>
		</Router>
	)
}

export default App
