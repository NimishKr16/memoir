// src/lib/uploadMemory.ts
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Function to upload memory with Base64 image data
export const uploadMemory = async (
  image: string,  // Base64 image data
  caption: string,
  date: string
): Promise<void> => {
  try {
    // Save the memory with base64 image data in Firestore
    await addDoc(collection(db, 'memories'), {
      caption,
      date,
      imageBase64: image,  // Save image as Base64
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error uploading memory:', error);
    throw error;
  }
};