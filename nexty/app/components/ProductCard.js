"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * ProductCard component displays individual product details with image gallery.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.product - Product data to display.
 * @returns {JSX.Element} - Rendered ProductCard component.
 */
export default function ProductCard({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Switch to the next image in the gallery.
   */
  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  /**
   * Switch to the previous image in the gallery.
   */
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
      {/* Product Image Gallery */}
      <div className="relative">
        <Image
          src={product.images[currentImageIndex]}
          alt={`Image of ${product.title}`}
          width={320}
          height={320}
          className="rounded-t-lg object-contain w-full h-64"
          onError={(e) => {
            e.currentTarget.src = "/path/to/placeholder-image.jpg"; // Fallback image
          }}
        />
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
            >
              &lt;
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
            >
              &gt;
            </button>
          </>
        )}
      </div>
      <div className="px-5 pb-5">
        <Link href={`/products/${product.id}`}>
          <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white truncate">
            {product.title}
          </h5>
        </Link>
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
          {product.description}
        </p>

        <div className="flex items-center mt-2 mb-3">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 ${
                  product.rating >= index + 1
                    ? "text-yellow-400"
                    : "text-gray-200 dark:text-gray-600"
                }`}
                aria-hidden="true"
              >
                <path d="..." />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {product.rating}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Category: {product.category}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Stock: {product.stock} available
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <Link
            href={`/cart/add/${product.id}`}
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to cart
          </Link>
        </div>
      </div>
    </div>
  );
}
