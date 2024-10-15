import { auth } from "./firebase"; // Ensure correct path to your Firebase config
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile, // Import updateProfile to update user info
} from "firebase/auth";

// Sign-in function
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

// Sign-up function
export const signUp = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update the user profile with the display name
    await updateProfile(userCredential.user, { displayName });

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign-out function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Get the current authenticated user
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          console.log("User fetched:", user); // Log the user object for debugging
        }
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
};
