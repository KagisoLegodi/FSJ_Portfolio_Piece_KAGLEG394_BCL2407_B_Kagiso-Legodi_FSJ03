/**
 * Fetches product categories from the API with caching enabled.
 *
 * @async
 * @function fetchCategories
 * @returns {Promise<Array>} - A promise that resolves to an array of categories.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch(
      "https://next-ecommerce-api.vercel.app/categories",
      { cache: "force-cache" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    console.log("Fetched categories:", data); // Debug log
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of error
  }
};
