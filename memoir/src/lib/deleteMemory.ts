// src/lib/deleteMemory.ts
import { db } from './firebase';
import { doc, deleteDoc } from 'firebase/firestore';

export const deleteMemory = async (memoryId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, 'memories', memoryId));
    console.log('Memory deleted successfully');
  } catch (error) {
    console.error('Error deleting memory:', error);
    throw error;
  }
};