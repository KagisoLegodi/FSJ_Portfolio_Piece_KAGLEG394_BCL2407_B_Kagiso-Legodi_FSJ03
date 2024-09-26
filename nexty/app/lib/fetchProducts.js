// lib/fetchProducts.js

export async function fetchProducts(page, search, sort, category) {
  const limit = 20;
  const skip = (page - 1) * limit;

  let url = `https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`;

  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;

  if (sort) {
    const [sortBy, order] = sort.split("-");
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
