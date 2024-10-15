export async function fetchProducts(
  page = 1,
  search = "",
  sort = "",
  category = ""
) {
  const pageSize = 20; // You can adjust this value as needed
  const queryParams = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    search,
    sort,
    category,
  });

  // try {
    console.log("Fetching products with params:", queryParams.toString());
    const response = await fetch(`/api/products?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log("Fetched products data:", data);
    return data;
  }  //catch (error) {
//     console.error("Error fetching products:", error);
//     throw error;
//   }
// }