import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure this path is correct

export const fetchCategories = async () => {
  const docRef = doc(db, "categories", "allCategories");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const categoriesData = docSnap.data();
    console.log("Categories Data:", categoriesData);
  
    // Directly return categories if it's an array
    if (Array.isArray(categoriesData.categories)) {
      return categoriesData.categories; // Directly return the array
    } else {
      console.error("Categories structure is not as expected");
      return [];
    }
  }
};
