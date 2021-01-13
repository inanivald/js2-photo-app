import { useState } from 'react';
import { useParams } from 'react-router-dom'
import ImagesView from './ImagesView'
import { Button } from 'react-bootstrap'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'
import EditAlbumTitle from './EditAlbumTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { ClipLoader } from 'react-spinners'

const Album = () => {
	const [reviewLink, setReviewLink] = useState(null)
	const { albumId } = useParams()
	const { album, images, loading } = useAlbum(albumId)
	const [editTitle, setEditTitle] = useState(false)

	const handleEditTitle = () => {
        setEditTitle(true);
	};

	const handleCreateReviewLink = (album) => {
        let urlOrigin = window.location.origin
        let url = `${urlOrigin}/review/${album}`;
        setReviewLink(url);
	}
	
	return (
		<>	
			{loading
				? (<ClipLoader/>)
				: album && 
					<>
						{editTitle 
							? <EditAlbumTitle album={album}/> 
							: <>
								<h2> {album.title} 
								<span 
									className="edit_album_title" 
									onClick={handleEditTitle}>
									<FontAwesomeIcon icon={faPen} size="xs"/>
								</span>
								</h2>

					<div className="d-flex justify-content-between mb-3">
						<div>
							<Button variant="dark" onClick={() => {handleCreateReviewLink(albumId)}}>Create review link</Button>
						</div>
					</div>

					{
                		reviewLink && (
                    		<p>Review link: <a href={reviewLink}>{reviewLink}</a></p>
                		)
        			}
				
					<UploadAlbumImage albumId={albumId} />
					<ImagesView images={images} />

						
					
								</>
							}
						</>
				}
		</>
	)
}


export default Album