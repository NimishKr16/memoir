// src/lib/uploadMemory.ts
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadToCloudinary } from './uploadToCloud';
// Function to upload memory with Base64 image data
export const uploadMemory = async (
  image: File,  // Base64 image data
  caption: string,
  date: string
): Promise<void> => {
  try {
    // Save the memory with base64 image data in Firestore
    const imageUrl = await uploadToCloudinary(image);
    await addDoc(collection(db, 'memories'), {
      caption,
      date,
      imageUrl,  // Save image as Base64
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error uploading memory:', error);
    throw error;
  }
};