import React, { useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import PhotoPlaceholder from '../../assets/scss/images/photo-placeholder.png'
import useDeleteAlbum from '../../hooks/useDeleteAlbum'

const AlbumsView = ({ albums }) => {
	const [deleteAlbum, setDeleteAlbum] = useState(null);
	const { currentUser } = useAuth()
	useDeleteAlbum(deleteAlbum);

	const handleDeleteAlbum = (album) => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Are you sure you want to delete the album\n"${album.title}"?`)) {
			setDeleteAlbum(album);
		}
	}
	return (
		<Row>
			{albums.map(album => (
				<Col sm={6} md={4} lg={3} key={album.id}>
					<Card className="mb-3">
						<Link to={`/albums/${album.id}`}>
							<Card.Img variant="top" src={PhotoPlaceholder} title={album.title} />
						</Link>
						<Card.Body>
							<Card.Title className="mb-0">
								<Link to={`/albums/${album.id}`}>{album.title}</Link>
							</Card.Title>
							{
									currentUser.uid === album.owner && (
										<Button variant="danger" size="sm mt-3" onClick={() => {
											handleDeleteAlbum(album)
										}}>
											Delete
										</Button>
									)
								}
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	)
}

export default AlbumsView
