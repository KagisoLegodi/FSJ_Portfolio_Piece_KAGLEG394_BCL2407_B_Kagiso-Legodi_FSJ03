// app/lib/firebaseAuth.js
import { auth } from "./firebase";
import { signInWithEmailAndPassword,signOut, onAuthStateChanged } from "firebase/auth";

/**
 * Sign in a user using Firebase Authentication.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise} - A promise that resolves with the user credentials.
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

/**
 * Get the currently authenticated user.
 * @returns {Promise<null|Object>} - A promise that resolves with the authenticated user or null if not authenticated.
 */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe(); // Unsubscribe after the first call to prevent memory leaks
        resolve(user);
      },
      reject
    );
  });
};

/**
 * Sign out the current user.
 * @returns {Promise<void>}
 */
export const logOut = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };