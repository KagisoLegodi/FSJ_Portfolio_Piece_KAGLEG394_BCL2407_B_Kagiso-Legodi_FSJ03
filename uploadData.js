import { config } from "dotenv";
import { products, categories } from "./data.js";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function uploadProducts(products) {
  try {
    // Loop through the products array
    for (const product of products) {
      // Pad the product's ID with leading zeros (assuming max 3 digits)
      const paddedId = product.id.toString().padStart(3, "0");

      // Use the padded ID as the document ID
      const productRef = doc(db, "products", paddedId);

      // Upload the product data to Firestore
      await setDoc(productRef, product);

      console.log(`Document written with ID: ${paddedId}`);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

async function uploadCategories(categories) {
  try {
    // Create a reference to the 'categories' document
    const categoriesRef = doc(db, "categories", "allCategories");

    // Save the categories array in the document
    await setDoc(categoriesRef, { categories });

    console.log("Categories uploaded successfully!");
  } catch (error) {
    console.error("Error uploading categories: ", error);
  }
}

uploadProducts(products);
uploadCategories(categories);
