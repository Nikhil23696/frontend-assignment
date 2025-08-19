'use client';

// components/RecentlyViewed.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RecentlyViewed = () => {
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('recent');
    if (stored) {
      const data = JSON.parse(stored);
      setRecentlyViewedProducts(data.slice(0, 3))
    }
  }, []);

  if (recentlyViewedProducts.length === 0) {
    return null; // Don't render if no products have been viewed
  }

  return (
    <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recentlyViewedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="block"
          >
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
