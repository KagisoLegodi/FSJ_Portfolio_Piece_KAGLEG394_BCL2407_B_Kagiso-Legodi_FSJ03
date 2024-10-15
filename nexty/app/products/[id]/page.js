"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../../lib/firebaseAuth";
import ReviewSection from "../../components/ReviewsSection"; // Import ReviewSection component

// Function to fetch product details by ID
async function getProduct(productId) {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (!productSnap.exists()) {
    throw new Error("Product not found");
  }

  return productSnap.data();
}

const ProductDetailPage = ({ params }) => {
  const { id: productId } = params;
  const { currentUser } = useAuth();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct({
          ...productData,
          reviews: productData.reviews || [],
        });
        setMainImage(productData.thumbnail);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product data.");
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0); // Scroll to top on product load
  }, [productId]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col items-center">
            <Image
              src={mainImage}
              alt={`Image of ${product.title}`}
              width={480}
              height={480}
              className="object-contain rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 bg-gray-600"
              priority
              onError={(e) => {
                e.currentTarget.src = "/path/to/placeholder-image.jpg"; // Replace with your placeholder image path
              }}
            />
            <h1 className="text-3xl font-bold mt-6 dark:text-white underline">
              {product.title}
            </h1>
          </div>

          {product.images && product.images.length > 0 && (
            <div className="mt-6 flex space-x-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="w-24 h-24 cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail image ${index + 1}`}
                    width={96}
                    height={96}
                    className="object-contain hover:opacity-75 transition-opacity duration-300 bg-gray-300"
                    onError={(e) => {
                      e.currentTarget.src = "/path/to/placeholder-image.jpg"; // Replace with your placeholder image path
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-4xl font-semibold text-green-500">
                ${product.price.toFixed(2)}
              </p>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg">
                {product.category}
              </span>
            </div>

            <p className="text-lg leading-relaxed">{product.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Discount: </span>
                <span className="text-red-500">
                  {product.discountPercentage}%
                </span>
              </div>
              <div>
                <span className="font-semibold">Stock: </span>
                <span>{product.stock} items available</span>
              </div>
              <div>
                <span className="font-semibold">SKU: </span>
                {product.sku}
              </div>
              <div>
                <span className="font-semibold">Tags: </span>
                {product.tags.join(", ")}
              </div>
            </div>
          </div>

          {/* Render Review Section */}
          <ReviewSection productId={productId} reviews={product.reviews} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
