import { db } from "./firebase"; // Ensure this path is correct
import { collection, getDocs } from "firebase/firestore";

export const fetchCategories = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categories = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Throw the error to be handled by the calling function
  }
};
