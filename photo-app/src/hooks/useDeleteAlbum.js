import { db } from '../firebase';

const useDeleteAlbum = async (album) => {
		if (!album) {
			return
		}

		const imagesInAlbum = db.collection('images').where('album','==', db.collection('albums').doc(album.id))
		
		imagesInAlbum.get().then((imagesInAlbumDoc) => {
		
			imagesInAlbumDoc.forEach((imageDoc) => {
				imageDoc.ref.delete();

				
			})
		})

		await db.collection('albums').doc(album.id).delete()

	}

export default useDeleteAlbum