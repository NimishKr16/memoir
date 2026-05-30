// src/lib/uploadMemory.ts
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { uploadToCloudinary } from './uploadToCloud';

// Upload memory: upload image to Cloudinary, then save Firestore doc and return the doc id
export const uploadMemory = async (
  image: File,
  caption: string,
  date: string
): Promise<string> => {
  try {
    const imageUrl = await uploadToCloudinary(image);
    const docRef = await addDoc(collection(db, 'memories'), {
      caption,
      date,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    // Read back the saved document to verify
    await getDoc(docRef);
    return docRef.id;
  } catch (error) {
    console.error('Error uploading memory:', error);
    throw error;
  }
};