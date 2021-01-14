import { useEffect } from 'react';
import { db, storage } from '../firebase';

const useDeleteImage = (image) => {
	useEffect(() => {
		if (!image) {
			return;
		}

		(async () => {
			
			if (image.path !== `images/guest/${image.name}`)
				{ await db.collection('images').doc(image.id).delete();
					await storage.ref(image.path).delete();}
			else { await db.collection('images').doc(image.id).delete();

			}
			
		})();
	}, [image]);

	return {}
}

export default useDeleteImage