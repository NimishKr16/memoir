// src/lib/uploadMemory.ts
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { uploadToCloudinary } from './uploadToCloud';
// Function to upload memory with Base64 image data
export const uploadMemory = async (
  image: File,  // Base64 image data
  caption: string,
  date: string
): Promise<string> => {
  try {
    // Save the memory with base64 image data in Firestore
    const imageUrl = await uploadToCloudinary(image);
    const docRef = await addDoc(collection(db, 'memories'), {
      caption,
      date,
      imageUrl,  // Save image as Base64
      createdAt: serverTimestamp(),
    });

    const savedDoc = await getDoc(docRef);

    if (!savedDoc.exists()) {
      throw new Error('Firestore write completed but document could not be read back');
    }

    return docRef.id;
  } catch (error) {
    console.error('Error uploading memory:', error);
    throw error;
  }
};