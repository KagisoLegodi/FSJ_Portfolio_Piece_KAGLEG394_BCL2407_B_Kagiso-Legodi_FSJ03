// app/lib/firestore.js
import { db } from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Save a user's data to Firestore.
 * @param {string} userId - The unique user ID (UID) from Firebase Authentication.
 * @param {Object} userData - An object containing additional user data to be stored.
 */
export const saveUserToFirestore = async (userId, userData) => {
  try {
    await setDoc(doc(db, 'users', userId), userData);
    console.log('User data saved successfully.');
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};
