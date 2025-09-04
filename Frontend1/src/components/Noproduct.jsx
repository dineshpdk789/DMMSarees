import React from 'react';

function Noproduct({ keyword }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 text-center">
      <div className="text-6xl mb-4">⚠️</div>
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        No Products Found
      </h3>
      <p className="text-gray-600 max-w-xl text-base md:text-lg">
        {keyword
          ? `We couldn't find any products matching "${keyword}". Try using different keywords or browse our complete catalog.`
          : 'No products are available. Please check after some time.'}
      </p>
    </div>
  );
}

export default Noproduct;
