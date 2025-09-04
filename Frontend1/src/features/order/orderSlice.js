import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//create order api
export const createOrder = createAsyncThunk("order/createOrder", async (order, { rejectWithValue }) => {

    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/v1/new/order", order, config);
        return data;

    } catch (error) {
        return rejectWithValue(error.response?.data || "order creating failed")
    }

})
//get user orders
export const getAllMyOrders = createAsyncThunk("order/getAllMyOrders", async (_, { rejectWithValue }) => {

    try {

        const { data } = await axios.get("/api/v1/orders/user");
        return data;

    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to show orders")
    }

})
//get user orders
export const getOrderDetails= createAsyncThunk("order/getOrderDetails", async (orderId, { rejectWithValue }) => {

    try {

        const { data } = await axios.get(`/api/v1/order/${orderId}`);
        return data;

    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch order detail")
    }

})



const orderSlice = createSlice({
    name: "order",
    initialState: {
        loading: false,
        error: null,
        success: false,
        orders: [],
        order: {}

    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        },

    },
    extraReducers: (builder) => {
        //create order
        builder.
            addCase(createOrder.pending,(state,action)=>{
                state.loading=true,
                state.error=null;

            })
            .addCase(createOrder.fulfilled,(state,action)=>{
                state.loading=false,
                state.success=action.payload.success,
                state.order=action.payload.order
                
            }).
            addCase(createOrder.rejected,(state,action)=>{
               state.loading=false;
               state.error=action.payload?.message || "order creating failed"
                
            })
            //get all order
        builder.
            addCase(getAllMyOrders.pending,(state,action)=>{
                state.loading=true,
                state.error=null;

            })
            .addCase(getAllMyOrders.fulfilled,(state,action)=>{
                state.loading=false,
                state.success=action.payload?.success,
                state.orders=action.payload?.orders
                
            }).
            addCase(getAllMyOrders.rejected,(state,action)=>{
               state.loading=false;
               state.error=action.payload?.message || "order creating failed"
                
            })
            //get orderdetail
        builder.
            addCase(getOrderDetails.pending,(state,action)=>{
                state.loading=true,
                state.error=null;

            })
            .addCase(getOrderDetails.fulfilled,(state,action)=>{
                state.loading=false,
                state.success=action.payload?.success,
                state.order=action.payload?.order
                
            }).
            addCase(getOrderDetails.rejected,(state,action)=>{
               state.loading=false;
               state.error=action.payload?.message || "Failed to fetch order detail"
                
            })
    }


})
export const { removeErrors, removeSuccess } = orderSlice.actions;
export default orderSlice.reducer;