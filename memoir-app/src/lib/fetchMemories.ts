// src/lib/fetchMemories.ts
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

export const fetchMemories = async () => {
  const memoriesCollection = collection(db, 'memories');
  const querySnapshot = await getDocs(memoriesCollection);
  
  const memories = querySnapshot.docs.map(doc => ({
    id: doc.id,
    date: doc.data().date,        // Assuming date is stored as a string or Firestore Timestamp
    imageBase64: doc.data().string,  // Assuming base64 image data is stored
    caption: doc.data().caption,   // Assuming caption is stored
  }));
  
  return memories;
};