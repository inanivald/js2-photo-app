import React from 'react'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { useAuth } from '../../contexts/AuthContext'
import useAlbums from '../../hooks/useAlbums'
import AlbumsView from './AlbumsView'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums()

	return (
		<>
			<h2 className="mb-3">All Albums</h2>

			{
				loading
					? (<ClipLoader color={"#888"} size={20} />)
					: (<AlbumsView albums={albums} />)
			}

			{currentUser && (
				<div className="mt-3">
					<Link to="/albums/create" className="btn btn-standard">Create a new Album</Link>
				</div>
			)}
		</>
	)
}

export default Albums
