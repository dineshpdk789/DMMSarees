import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


//get all product
export const getProduct = createAsyncThunk("product/getProduct", async ({keyword,page=1,category}, { rejectWithValue }) => {
    try {
        // const link = keyword?`/api/v1/getproducts?name=${encodeURIComponent(keyword)}&page=${page}`:`/api/v1/getproducts?page=${page}`;
        let link="/api/v1/getproducts?page="+page;
        if(category){
            link+=`&category=${category}`;
        }
        if(keyword){
            link+=`&name=${keyword}`;
        }
        const { data } = await axios.get(link);
        if (import.meta.env.DEV) console.debug("product API response:", data);
        return data;
        


    } catch (error) {
        //error.response?.data =object send by backed inside of catch block
        return rejectWithValue(error.response?.data?.message || "An error occured")
    }
})
//single product detail
export const getProductDetails = createAsyncThunk("product/getProductDetails", async (id, { rejectWithValue }) => {
    try {
        const link = `/api/v1/getsingleproduct/${id}`;
        const { data } = await axios.get(link);
        if (import.meta.env.DEV) console.debug("product detail API response:", data);
        
        return data;


    } catch (error) {
        //error.response?.data =object send by backed inside of catch block
        return rejectWithValue(error.response?.data?.message || "An error occured")
    }
})
//submit review
export const createReview = createAsyncThunk("product/createReview", async ({productId,comment}, { rejectWithValue }) => {
    try {
       
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const { data } = await axios.put("/api/v1/createreview",{productId,comment},config);
        if (import.meta.env.DEV) console.debug("create review API response:", data);
        return data;


    } catch (error) {
        //error.response?.data =object send by backed inside of catch block
        return rejectWithValue(error.response?.data?.message || "An error occured")
    }
})


const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        productCount: 0,
        loading: false,
        error: null,
        product: null,
        totalPages:0,
        limit:0,
        reviewSuccess:false,
        reviewLoading:false,
        

    },
    reducers: {
        removeErrors: (state) => {
            state.error = null
        },
        removeSuccess:(state)=>{
              state.reviewSuccess=false;
        }
    },
    //state =initialState object above here 
    extraReducers: (builder) => {
        builder.
            addCase(getProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // in fullfilled case action.payload is the object that is return from the backend in response
            .addCase(getProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Something went wrong";
                state.products=[]
            })

            //product detail

        builder.
            addCase(getProductDetails.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductDetails.fulfilled,(state,action)=>{
                state.loading = false;
                state.error = null;
                state.product=action.payload.product;
            })
            .addCase(getProductDetails.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload ||"Something went Wrong";
                
            })
            //createreview
             builder.
            addCase(createReview.pending, (state, action) => {
                state.reviewLoading = true;
                state.error = null;
            })
            .addCase(createReview.fulfilled,(state,action)=>{
                state.reviewLoading =false;
                state.reviewSuccess=true;
            })
            .addCase(createReview.rejected,(state,action)=>{
                state.reviewLoading = false;
                state.error = action.payload ||"Something went Wrong";
                
            })
    }
})

export const { removeErrors, removeSuccess } = productSlice.actions;
export default productSlice.reducer;