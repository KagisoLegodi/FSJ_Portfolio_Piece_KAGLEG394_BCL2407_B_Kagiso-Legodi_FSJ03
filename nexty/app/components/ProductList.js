import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductList({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e) => {
    e.preventDefault(); // Prevent link navigation
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e) => {
    e.preventDefault(); // Prevent link navigation
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        <Image
          src={
            product.images
              ? product.images[currentImageIndex]
              : product.thumbnail
          }
          alt={`Image of ${product.title}`}
          width={320}
          height={320}
          className="object-contain w-full h-48 mb-4"
          onError={(e) => {
            e.currentTarget.src = "/path/to/placeholder-image.jpg"; // Fallback image
          }}
        />

        {product.images && product.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              &#8249;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              &#8250;
            </button>
          </>
        )}
      </div>
      <h2 className="text-lg font-bold truncate text-black underline">
        {product.title}
      </h2>
      <p className="text-gray-700">{product.category}</p>
      <p className="text-green-600 font-semibold">
        ${product.price.toFixed(2)}
      </p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-400 mr-1">★</span>
        <span className="text-gray-600 text-sm">
          {product.rating.toFixed(1)}
        </span>
      </div>
    </Link>
  );
}
