import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { addItemsToCart, removeErrors, removeItemFromCart, removeMessage } from '../features/cart/cartSlice';

const CartItems = ({ item }) => {

  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const { cartItems, loading, error, message, success } = useSelector((state) => state.cart);

  const handleUpdate = () => {
    if (loading) return;
    if (quantity != item.quantity) {
      dispatch(addItemsToCart({ id: item.product_id, quantity: quantity }))
    }
  }



  //decrease product quantity
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantitiy cannot be less than 1 ", { autoClose: 1000, toastId: "quantity-decrease" });
      dispatch(removeErrors());
      return;
    }
    setQuantity((prev) => prev - 1);
  }
  //increase product quantity
  const increaseQuantity = () => {
    if (item.stock <= quantity) {
      toast.error("cannot exceed available stock", { autoClose: 1000, toastId: "quantity-increase" });
      dispatch(removeErrors());
      return;
    }
    setQuantity((prev) => prev + 1)
  }
  //handle remove item from cart
  const handleRemoveItem = () => {
    if (loading) return;
    dispatch(removeItemFromCart(item.product_id));
    toast.success("Item removed from cart successfully", { position: "top-center", autoClose: 1000, toastId: "item" });
  }

  //success message 
  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 1000, toastId: "Update" });
      dispatch(removeMessage());

    }
  }, [dispatch, success, message])

  return (
    <>
      {/* ---  Cart Item --- */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center hover:bg-gray-100 -mx-4 sm:-mx-8 px-4 sm:px-6 py-5 border-b">

        {/* Product Details */}
        <div className="flex w-full lg:w-2/5 mb-4 lg:mb-0">
          <div className="w-20 sm:w-24">
            <img className="h-24" src={item.image} alt={item.name} />
          </div>
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <span className="font-bold text-sm">{item.name}</span>
            <span className="  text-black  text-xs">Quantity: {item.quantity}</span>
            <span className="text-black text-xs">Price: ₹{item.price.toFixed(2)}</span>
          </div>
        </div>
        <div className="w-full lg:w-3/5 flex flex-col lg:flex-row lg:items-center">

          <div className="flex lg:hidden text-xs uppercase text-gray-500 mb-2">
            <h3 className="font-semibold w-1/3 text-center">Quantity</h3>
            <h3 className="font-semibold w-1/3 text-center">Item Total</h3>
            <h3 className="font-semibold w-1/3 text-center">Actions</h3>
          </div>

          <div className="w-full flex items-center justify-between">
            {/* Quantity */}
            <div className="flex justify-center w-1/3 lg:w-1/3">
              <button className="border rounded-md px-2 py-1 text-lg" onClick={decreaseQuantity}>-</button>
              <input className="mx-2 border text-center w-12" type="text" value={quantity} readOnly />
              <button className="border rounded-md px-2 py-1 text-lg" onClick={increaseQuantity}>+</button>
            </div>

            {/* Item Total */}
            <span className="text-center w-1/3 lg:w-1/3 font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>

            {/* Actions */}
            <div className="flex flex-col items-center space-y-2 w-1/3 lg:w-1/3">
              <button className="font-semibold   disabled:cursor-not-allowed bg-gray-600 hover:bg-gray-700 text-white text-xs uppercase w-20 py-2 rounded"
                disabled={loading || quantity === item.quantity} onClick={handleUpdate}>
                Update
              </button>
              <button className="font-semibold bg-red-500 hover:bg-red-600
               text-white text-xs uppercase w-20 py-2 rounded"
                onClick={handleRemoveItem}>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* --- End Cart Item --- */}
    </>
  )
}

export default CartItems
