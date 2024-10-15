"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Ensure this path points to where your Firebase config is
import { useAuth } from "../../lib/firebaseAuth"; // Import useAuth hook

// Function to get product data from Firestore by product ID
async function getProduct(productId) {
  const productRef = doc(db, "products", productId); // Firestore reference to the product document
  const productSnap = await getDoc(productRef); // Fetch the document

  if (!productSnap.exists()) {
    throw new Error("Product not found"); // Handle if the product does not exist
  }

  return productSnap.data(); // Return product data
}

// Function to add a review to the product
async function addReview(productId, reviewData) {
  const productRef = doc(db, "products", productId);
  await setDoc(
    productRef,
    {
      reviews: reviewData, // Update the reviews field in Firestore
    },
    { merge: true }
  ); // Use merge to avoid overwriting existing data
}

const ProductDetailPage = ({ params }) => {
  const { id: productId } = params;
  const { currentUser, loading: authLoading } = useAuth(); // Get auth state
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId); // Fetch product data from Firestore
        setProduct(productData);
        setMainImage(productData.thumbnail); // Set the main image to the product's thumbnail
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product data.");
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0); // Scroll to the top of the page when product data is loaded
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewComment || reviewRating <= 0) {
      alert("Please enter a comment and a rating.");
      return;
    }

    const reviewData = {
      reviewerName: currentUser.displayName || currentUser.email,
      comment: reviewComment,
      rating: reviewRating,
      date: new Date().toISOString(),
    };

    try {
      await addReview(productId, reviewData); // Add the review to Firestore
      setProduct((prev) => ({
        ...prev,
        reviews: [...prev.reviews, reviewData],
      })); // Update the local state to reflect the new review
      setReviewComment(""); // Clear the comment input
      setReviewRating(0); // Reset the rating
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review.");
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <svg
          className="w-12 h-12 animate-spin text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z" />
        </svg>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!product) {
    return <p className="text-gray-500 text-center mt-4">Product not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8 dark:text-gray-200">
      <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
        &larr; Back
      </Link>

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
              e.currentTarget.src = "/path/to/placeholder-image.jpg";
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
                    e.currentTarget.src = "/path/to/placeholder-image.jpg";
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
      </div>

      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-bold">Customer Reviews</h2>
        <p className="text-lg text-yellow-500">Rating: {product.rating}/5</p>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="space-y-6">
            {product.reviews.map((review, index) => (
              <li
                key={index}
                className="border-b border-gray-200 pb-6 dark:border-gray-700"
              >
                <p className="font-semibold text-lg">{review.reviewerName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-800 dark:text-gray-300">
                  {review.comment}
                </p>
                <p className="text-yellow-400 mt-1">
                  Rating: {review.rating}/5
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No reviews yet.</p>
        )}
      </div>

      {currentUser && (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Leave a Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2"
                rows="3"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Rating</label>
              <select
                className="mt-1 text-black block w-full border border-gray-300 rounded-md p-2"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                required
              >
                <option value={0}>Select a rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
