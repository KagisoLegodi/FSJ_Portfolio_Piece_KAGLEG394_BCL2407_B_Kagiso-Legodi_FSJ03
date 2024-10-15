"use client";

import { useState } from "react";
import { arrayUnion, arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../lib/firebaseAuth"; // Adjust path as needed
import { db } from "../lib/firebase"; // Adjust Firebase import path

// Function to add or update a review in Firestore
async function addOrUpdateReview(productId, oldReview, newReview) {
  const productRef = doc(db, "products", productId);

  if (oldReview) {
    await updateDoc(productRef, {
      reviews: arrayRemove(oldReview), // Remove the old review
    });
  }

  await updateDoc(productRef, {
    reviews: arrayUnion(newReview), // Add the new or updated review
  });
}

// Function to delete a review from Firestore
async function deleteReview(productId, review) {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, {
    reviews: arrayRemove(review), // Remove the review
  });
}

const ReviewSection = ({ productId, reviews = [] }) => {
  const { currentUser } = useAuth(); // Get auth state
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [productReviews, setProductReviews] = useState(reviews);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null); // For delete confirmation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment || newReview.rating <= 0) {
      setError("Please enter a valid comment and rating.");
      return;
    }

    const reviewData = {
      reviewerId: currentUser?.uid,
      reviewerName:
        currentUser?.displayName || currentUser?.email || "Anonymous",
      comment: newReview.comment,
      rating: newReview.rating,
      date: new Date().toISOString(),
    };

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await addOrUpdateReview(productId, editingReview, reviewData);

      setProductReviews((prevReviews) => {
        if (editingReview) {
          return prevReviews.map((review) =>
            review === editingReview ? reviewData : review
          );
        } else {
          return [...prevReviews, reviewData];
        }
      });

      setNewReview({ rating: 5, comment: "" });
      setEditingReview(null);
      setSuccessMessage("Review submitted successfully!");
    } catch (error) {
      setError("Failed to submit the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (review) => {
    if (!confirmDelete) {
      setConfirmDelete(review); // Set review to confirm delete
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMessage(null);
    try {
      await deleteReview(productId, confirmDelete);

      setProductReviews((prevReviews) =>
        prevReviews.filter((r) => r !== confirmDelete)
      );
      setSuccessMessage("Review deleted successfully!");
      setConfirmDelete(null); // Reset delete confirmation
    } catch (error) {
      setError("Failed to delete the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setNewReview({ rating: review.rating, comment: review.comment });
    setEditingReview(review);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold">Reviews</h2>

      {successMessage && (
        <div className="mt-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}

      {confirmDelete && (
        <div className="mt-4 p-4 text-yellow-700 bg-yellow-100 border border-yellow-400 rounded">
          Are you sure you want to delete this review?
          <div className="mt-2">
            <button
              onClick={() => handleDelete(confirmDelete)}
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setConfirmDelete(null)} // Cancel delete
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-600 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {productReviews.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {productReviews
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((review, index) => (
              <li key={index} className="border border-gray-300 p-4 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-semibold">{review.reviewerName}</span>
                  <span className="text-yellow-500">{review.rating}/5</span>
                </div>
                <p>{review.comment}</p>
                <span className="text-gray-400 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </span>

                {currentUser && currentUser.uid === review.reviewerId && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleEdit(review)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review)}
                      className="inline-flex justify-center ml-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-500">No reviews yet.</p>
      )}

      {currentUser ? (
        <div className="mt-8">
          <h2 className="text-xl font-bold">Leave a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                rows="4"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                required
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium">Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: Number(e.target.value) })
                }
                required
                className="w-full border text-black border-gray-300 rounded-lg p-2"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : editingReview
                ? "Update Review"
                : "Submit Review"}
            </button>
            {editingReview && (
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg mt-4"
                disabled={loading}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>
      ) : (
        <p className="mt-4 text-red-600">
          You must be signed in to leave a review.
        </p>
      )}
    </div>
  );
};

export default ReviewSection;
