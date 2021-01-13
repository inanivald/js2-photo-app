import { useState, useEffect } from 'react';
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext'

const useUploadImage = (image, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const { currentUser } = useAuth()

	useEffect(() => {
		if (!image) {
			setUploadProgress(null);
			setUploadedImage(null);
			setError(null);
			setIsSuccess(false);

			return;
		}

		setError(null);
		setIsSuccess(false);

		const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`);

		const uploadTask = fileRef.put(image);

		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
		});

		uploadTask.then(async snapshot => {

			const url = await snapshot.ref.getDownloadURL();

			const img = {
				name: image.name,
				owner: currentUser.uid,
				path: snapshot.ref.fullPath,
				size: image.size,
				type: image.type,
				url,
			};

			if (albumId) {
				img.album = db.collection('albums').doc(albumId)
			}

			await db.collection('images').add(img)

			setIsSuccess(true);
			setUploadProgress(null);

			setUploadedImage(img);
			setIsSuccess(true);

		}).catch(error => {
			console.error("File upload triggered an error!", error);
			setError({
				type: "warning",
				msg: `Image could not be uploaded due to an error (${error.code})`
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image, currentUser]);

	return { uploadProgress, uploadedImage, error, isSuccess };
}

export default useUploadImage;