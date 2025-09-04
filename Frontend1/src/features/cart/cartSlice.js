import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//get all product
export const addItemsToCart = createAsyncThunk("cart/addItemsToCart", async ({ id, quantity }, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`/api/v1/getsingleproduct/${id}`)

        return {
            product_id: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].url,
            stock: data.product.stock,
            quantity: quantity
        }
    } catch (error) {
        //error.response?.data =object send by backed inside of catch block
        return rejectWithValue(error.response?.data?.message || "An error occured")
    }
})

// Get logged-in user from localStorage
const user = JSON.parse(localStorage.getItem("user")) || {};
const userId = user._id || "guest";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [],
        loading: false,
        error: null,
        success: false,
        message: null,
        removingId: null,
        shippingInfo: JSON.parse(localStorage.getItem("shippingInfo")) || {}
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeMessage: (state) => {
            state.message = null;
        },
        removeItemFromCart: (state, action) => {
            state.removingId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.product_id != action.payload);

            // Save cart per user directly
            const user = JSON.parse(localStorage.getItem("user")) || {};
            const userId = user._id || "guest";
            localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));

            state.removingId = null;
        },
        saveshippingInfo: (state, action) => {
            state.shippingInfo = action.payload
            localStorage.setItem("shippingInfo", JSON.stringify(state.shippingInfo))
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem(`cartItems_${userId}`);
            localStorage.removeItem("shippingInfo");
        },
        // ← New reducer to load cart for a user
        loadCartForUser: (state, action) => {
            const userId = action.payload._id || "guest";
            state.cartItems = JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [];
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(addItemsToCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                const item = action.payload;
                const { payload } = action; // <-- ensure payload is defined
                if (import.meta.env.DEV) console.debug("cart action payload:", action.payload);

                const existingItem = state.cartItems.find((i) => i.product_id === item.product_id);
                if (existingItem) {
                    existingItem.quantity = item.quantity;
                    state.message = `Updated ${item.name} quantity in the cart`
                }
                else {
                    state.cartItems.push(item);
                    state.message = `${item.name} is added to cart successfully`
                }
                state.loading = false;
                state.error = null;
                state.success = true;
                //    localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
                const user = JSON.parse(localStorage.getItem("user")) || {};
                const userId = user._id;
                localStorage.setItem(`cartItems_${userId}`, JSON.stringify(state.cartItems));

            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Error occured during add item to cart"
            })

    }
})
export const { removeErrors, removeMessage, clearCart, removeItemFromCart, saveshippingInfo,loadCartForUser } = cartSlice.actions;
export default cartSlice.reducer;