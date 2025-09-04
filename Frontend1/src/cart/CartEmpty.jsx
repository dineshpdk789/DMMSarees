import React from 'react'
import { Link } from 'react-router-dom'

const CartEmpty = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-[75vh]">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Your cart is empty.
                </h2>
                <button className="bg-gray-800 text-white font-semibold py-2 px-6 rounded hover:bg-gray-900">
                   <Link to="/products"> View Products</Link>
                </button>
            </div>
        </>
    )
}

export default CartEmpty
