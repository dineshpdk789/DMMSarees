import { Reviews } from "@mui/icons-material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//fetch all products
export const fetchAdminProducts = createAsyncThunk("user/fetchAdminProducts", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/v1/admin/getallproduct");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error while fetching products")

    }
})
//create products
export const createProducts = createAsyncThunk("user/createProducts", async (productdata, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.post("/api/v1/admin/createproduct", productdata, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product creation failed")

    }
})
//update product
export const updateProducts = createAsyncThunk("user/updateProducts", async ({ id, productdata }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.put(`/api/v1/admin/updateproduct/${id}`, productdata, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product update failed")

    }
})
//delete product
export const deleteProducts = createAsyncThunk("user/deleteProducts", async ({ id }, { rejectWithValue }) => {
    try {


        const { data } = await axios.delete(`/api/v1/admin/deleteproduct/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Product deletion failed")

    }
})
// fetch user
export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_, { rejectWithValue }) => {
    try {


        const { data } = await axios.get("/api/v1/admin/getallusers");

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch users");

    }
})
// get sigle user 
export const getSingleUser = createAsyncThunk("user/getSingleUser", async (id, { rejectWithValue }) => {
    try {


        const { data } = await axios.get(`/api/v1/admin/user/${id}`);

        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch user");

    }
})
// update user role
export const updateRole = createAsyncThunk("user/updateRole", async ({ id, role }, { rejectWithValue }) => {
    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, { role }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update role");

    }
})
// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id, { rejectWithValue }) => {
    try {

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete user");

    }
})
// fetch all order
export const fetchOrders = createAsyncThunk("user/fetchOrders ", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("/api/v1/admin/orders");
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch orders");

    }
})
// delete order
export const deleteOrder = createAsyncThunk("user/ deleteOrder", async (id, { rejectWithValue }) => {
    try {

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete order");

    }
})
// update order status
export const updateOrderStatus = createAsyncThunk("user/updateOrderStatus ", async ({ id, status }, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.put(`/api/v1/admin/order/${id}`, { status }, config);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch orders");

    }
})
// get all reviews
export const fetchProductReviews = createAsyncThunk("user/fetchProductReviews", async (id, { rejectWithValue }) => {
    try {

        const { data } = await axios.get(`/api/v1/admin/review/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch reviews");

    }
})
// delete review
export const deleteReview = createAsyncThunk("user/deleteReview", async ({ productid, reviewId }, { rejectWithValue }) => {
    try {

        const { data } = await axios.delete(`/api/v1/admin/review?productid=${productid}&id=${reviewId}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete product review");

    }
})


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        products: [],
        success: false,
        loading: false,
        error: null,
        product: {},
        deleteLoading: false,
        deleteError: null,
        deletesuccess: null,
        createsuccess:null,
        users: [],
        user: {},
        orders: [],
        totalAmount: null,
        order: {},
        updateSuccess: null,
        message: null,
        reviews: []
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
            state.updateSuccess=null;
        },
        removeDelete: (state) => {
            state.deleteError = null;
            state.deletesuccess = null;
        },
        removeMessage: (state) => {
            state.message = null;
        },
        removeCreatesuccess: (state) => {
            state.createsuccess = null;
        }
    },
    extraReducers: (builder) => {
        //fetch prduct
        builder.
            addCase(fetchAdminProducts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;

            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Error While Fetching the products";

            })
        //create product
        builder.
            addCase(createProducts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.createsuccess = action.payload.success;
                state.products.push(action.payload.product);

            })
            .addCase(createProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Product creation failed";

            })
        //update product
        builder.
            addCase(updateProducts.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.updateSuccess = action.payload.success;
                state.product = action.payload.product;

            })
            .addCase(updateProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Product update failed";

            })
        //delete product
        builder.
            addCase(deleteProducts.pending, (state, action) => {
                state.deleteLoading = true;
                state.deleteError = null;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.deletesuccess = action.payload.success;
                state.products = state.products.filter((product) => product._id !== action.payload.product._id)

            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.deleteLoading = false;
                state.deleteError = action.payload?.message || "Product deletion failed";

            })
        //fetch users
        builder.
            addCase(fetchUsers.pending, (state, action) => {
                state.loading = true;
                state.deleteError = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.deleteError = action.payload?.message || "Failed to fetch products";

            })

        //single user
        builder.
            addCase(getSingleUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user
            })
            .addCase(getSingleUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update role";

            })
        //update user role
        builder.
            addCase(updateRole.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false;
                state.updateSuccess = action.payload.success
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update role";

            })
        //delete user  
        builder.
            addCase(deleteUser.pending, (state, action) => {
                state.loading = true;
                state.deleteError = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.deletesuccess = action.payload.success;

            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.deleteError = action.payload?.message || "Failed to delete user";

            })
        //fetch all orders
        builder.
            addCase(fetchOrders.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.orders = action.payload.orders;
                state.totalAmount = action.payload.totalAmount

            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch orders";

            })
        //delete order
        builder.
            addCase(deleteOrder.pending, (state, action) => {
                state.loading = true;
                state.deleteError = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.deletesuccess = action.payload.success;

            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.deleteError = action.payload?.message || "Failed to delete order";

            })
        //update orders
        builder.
            addCase(updateOrderStatus.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.updateSuccess = action.payload.success;
                state.order = action.payload.order;
                state.message = action.payload.message;

            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch orders";

            })
        //product review
        builder.
            addCase(fetchProductReviews.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload.reviews;

            })
            .addCase(fetchProductReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to fetch reviews";

            })
        //delete review
        builder.
            addCase(deleteReview.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.message=action.payload.message;

            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to delete reviews";

            })

    }
})

export const { removeErrors, removeSuccess, removeDelete, removeMessage, removeCreatesuccess } = adminSlice.actions;
export default adminSlice.reducer;