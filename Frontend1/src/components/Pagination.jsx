import React from 'react';
import { useSelector } from 'react-redux';

const Pagination = ({
  currentPage,
  onPageChange,
  activeClass = 'bg-gray-800 text-white border-gray-700',
  nextPageText = 'Next',
  prevPageText = 'Prev',
  firstPageText = '1st',
  lastPageText = 'Last',
}) => {
  const { totalPages, products } = useSelector((state) => state.product);

  if (!products || products.length === 0 || totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const pageWindow = 2;
    for (
      let i = Math.max(1, currentPage - pageWindow);
      i <= Math.min(totalPages, currentPage + pageWindow);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="inline-flex space-x-2 bg-white p-2 rounded-md shadow-sm border border-gray-300">
        {/* First & Prev */}
        {currentPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-3 py-1 text-sm font-semibold border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              {firstPageText}
            </button>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 text-sm font-semibold border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              {prevPageText}
            </button>
          </>
        )}

        {/* Page Numbers */}
        {getPageNumbers().map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`px-3 py-1 text-sm font-semibold border rounded-md ${
              currentPage === number
                ? activeClass
                : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {number}
          </button>
        ))}

        {/* Next & Last */}
        {currentPage < totalPages && (
          <>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 text-sm font-semibold border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              {nextPageText}
            </button>
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 text-sm font-semibold border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              {lastPageText}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
