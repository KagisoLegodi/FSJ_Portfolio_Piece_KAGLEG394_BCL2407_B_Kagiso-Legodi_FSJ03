"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

/**
 * ProductList component that displays a list of products with image and information.
 *
 * @param {Object} product - The product data to display.
 * @returns {JSX.Element} - Rendered ProductList component.
 */
export default function ProductList({ product }) {
  const searchParams = useSearchParams();

  return (
    <div>
      <Suspense key={product.id} fallback={<div>Loading product...</div>}>
        <Link
          href={`api/products/${product.id}?${searchParams.toString()}`}
          className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="relative bg-slate-300">
            <Image
              src={product.images ? product.images[0] : product.thumbnail}
              alt={`Image of ${product.title}`}
              width={320}
              height={320}
              className="object-contain w-full h-48 mb-4"
              quality={75}
              priority
            />
          </div>
          <h2 className="text-lg font-bold truncate text-black">
            {product.title}
          </h2>
          <p className="text-gray-700">{product.category}</p>
          <p className="text-green-600 font-semibold">${product.price}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-gray-600 text-sm">
              {product.reviews.length} reviews
            </span>
          </div>
        </Link>
      </Suspense>
    </div>
  );
}
