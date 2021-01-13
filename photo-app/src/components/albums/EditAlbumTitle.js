import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { db } from '../../firebase'

const EditAlbumTitle = ({ album }) => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [newAlbumTitle, setNewAlbumTitle] = useState("")
	const navigate = useNavigate()

	const handleTitleChange = (e) => {
		setNewAlbumTitle(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (newAlbumTitle.length < 3) {
			return;
		}

		setError(false)
		setLoading(true)

		try {
			// Update album title in database
			await db.collection('albums').doc(album.id).update({
				title: newAlbumTitle,
});

			navigate(`/albums/${album.id}`)
			window.location.reload()

		} catch (e) {
			setError("The title could not be updated. Please try again.")
		}
	}

	return (
		<>
            {error && <Alert variant="danger">{error}</Alert>}

			<Form onSubmit={handleSubmit}>
				<Form.Group id="title">
					<Form.Label>New album title</Form.Label>
					<Form.Control type="title" onChange={handleTitleChange} placeholder={album.title} value={newAlbumTitle} autoFocus />
					
					{album.title && album.title.length < 4 && 
						<Form.Text className="text__alert">The album title must be at least 4 characters long.</Form.Text>
					}
				</Form.Group>
				<Button  disabled={loading} type="submit">Update</Button>
			</Form>
		</>
	)
}

export default EditAlbumTitle