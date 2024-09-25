// /lib/fetchProducts.js

export async function fetchProducts(page) {
  const itemsPerPage = 20;
  const skip = (page - 1) * itemsPerPage;
  const res = await fetch(
    `https://next-ecommerce-api.vercel.app/products?limit=${itemsPerPage}&skip=${skip}`
  );

  if (!res.ok) throw new Error("Failed to load products");

  return res.json();
}
