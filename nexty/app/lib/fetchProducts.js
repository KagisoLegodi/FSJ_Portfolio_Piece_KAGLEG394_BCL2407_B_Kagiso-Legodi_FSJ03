export async function fetchProducts(
  page = 1,
  searchTerm = "",
  sort = "",
  category = "",
) {
  const itemsPerPage = 20;
  const skip = (page - 1) * itemsPerPage;

  const searchQuery = searchTerm
    ? `&search=${encodeURIComponent(searchTerm)}`
    : "";
  const sortQuery = sort
    ? `&sortBy=${sort.split("-")[0]}&order=${sort.split("-")[1] || "asc"}`
    : "";
  const categoryQuery = category
    ? `&category=${encodeURIComponent(category)}`
    : "";

  const apiUrl = `https://next-ecommerce-api.vercel.app/products?limit=${itemsPerPage}&skip=${skip}${searchQuery}${sortQuery}${categoryQuery}`;

  console.log("Attempting to fetch from URL:", apiUrl);

  try {
    const res = await fetch(apiUrl, { mode: "cors" }); // Add mode: 'cors' for cross-origin requests

    if (!res.ok) {
      console.error(
        `Failed to fetch products: ${res.status} - ${res.statusText}`
      );
      const errorDetails = await res.text();
      console.error("Error details:", errorDetails);
      throw new Error("Failed to load products");
    }

    return await res.json();
  } catch (error) {
    console.error("Error during fetch operation:", error);
    throw new Error(
      "Fetch failed. Possible reasons: Network error, CORS issue, or incorrect API URL."
    );
  }
}
