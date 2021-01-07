import { useState } from 'react';
import { useParams } from 'react-router-dom'
import ImagesView from './ImagesView'
import useAlbum from '../../hooks/useAlbum'
import UploadAlbumImage from './UploadAlbumImage'
import EditAlbumTitle from './EditAlbumTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { ClipLoader } from 'react-spinners'

const Album = () => {
	const { albumId } = useParams()
	const { album, images, loading } = useAlbum(albumId)
	const [editTitle, setEditTitle] = useState(false);

	const handleEditTitle = () => {
        setEditTitle(true);
	};

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