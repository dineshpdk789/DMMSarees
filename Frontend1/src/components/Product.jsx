import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="w-[250px] mx-auto my-4 flex flex-col rounded-xl shadow-md hover:shadow-sm transition duration-300 hover:-translate-y-1 text-gray-800 no-underline"
    >
      <img
        src={product.image[0].url}
        alt={product.name}
        className="w-full max-h-[200px] object-contain rounded-t-xl"
      />

      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-1 line-clamp-2">
          {product.description?.slice(0, 80) || "No description"}
        </p>

        <p className="text-base font-bold text-blue-600 mb-2">
          ₹{product.price}/-
        </p>

        <div className="flex items-center justify-center text-yellow-500 text-sm mb-1">
          ★★★★★
        </div>

        <span className="text-xs text-gray-400 mb-3">
          ({product.numofReviews} Review)
        </span>

        <button
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add To Cart
        </button>
      </div>
    </Link>
  );
};

export default Product;
