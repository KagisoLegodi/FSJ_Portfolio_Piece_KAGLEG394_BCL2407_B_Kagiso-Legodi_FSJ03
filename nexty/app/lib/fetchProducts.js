// /lib/fetchProducts.js

export async function fetchProducts(page, searchTerm = "", sort = "", category = "") {
  const itemsPerPage = 20;
  const skip = (page - 1) * itemsPerPage;
  const searchQuery = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "";
  const sortQuery = sort ? `&sort=${sort}` : "";
  const categoryQuery = category ? `&category=${encodeURIComponent(category)}` : "";
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products?limit=${itemsPerPage}&skip=${skip}${searchQuery}${sortQuery}${categoryQuery}`
  );

  if (!res.ok) throw new Error("Failed to load products");

  return res.json();
}
