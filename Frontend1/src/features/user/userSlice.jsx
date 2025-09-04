import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";


//register api
export const register = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
    try {

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const { data } = await axios.post('/api/v1/register', userData, config);
        return data;

    }
    catch (error) {

        return rejectWithValue(error.response?.data || "Registration failed. Please try again later ")

    }
}
)

//login api

export const login = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {

    try {

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const { data } = await axios.post('/api/v1/login', { email, password }, config);
        return data;


    } catch (error) {

        return rejectWithValue(error.response?.data || "Login failed. Please try again later ")

    }

})
//load user
export const loadUser = createAsyncThunk("user/loaduser", async (_, { rejectWithValue }) => {

    try {
        const { data } = await axios.get("/api/v1/fetchprofile");
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data || "Failed to load user profile. Try again")

    }


})
//logout
export const logout = createAsyncThunk("user/logout", async (_, { rejectWithValue }) => {

    try {
        const { data } = await axios.post("/api/v1/logout", { withCredentials: true });
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data || "Failed to logout. Try again")

    }


})
//update profile
export const updateProfile = createAsyncThunk("user/updateprofile", async (userData, { rejectWithValue }) => {

    try {
        const { data } = await axios.put("/api/v1/updateprofile", userData, { headers: { "Content-Type": "multipart/form-data" } });
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data || "Failed to Update profile. Try again")

    }


})

//update password
export const updatePassword = createAsyncThunk("user/updatePassword", async (userData, { rejectWithValue }) => {

    try {
        const { data } = await axios.put("/api/v1/updatepassword", userData, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data || "Failed to Update password. Try again")

    }


})
//forgot password
export const forgotPassword = createAsyncThunk("user/forgotPassword", async ({ email }, { rejectWithValue }) => {
    console.log(email);

    try {
        const { data } = await axios.post("/api/v1/requestresetpassword", { email }, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error) {

        return rejectWithValue(error.response?.data || "Failed to sent email. Try again")

    }


})
//reset password
export const resetPassword = createAsyncThunk("user/resetPassword", async ({ token, userData }, { rejectWithValue }) => {
    try {
        console.log(token.userData);
        const { data } = await axios.post(`/api/v1/reset/${token}`, userData, { headers: { "Content-Type": "application/json" } });
        return data;
    } catch (error) {
        console.error("Reset password error:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Failed to reset password. Try again")

    }


})



const userSlice = createSlice({
    name: "user",
    initialState: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        loading: false,
        error: null,
        success: false,
        isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
        message: null,
        updateSuccess:null,
        
    },
    reducers: {
        removeErrors: (state) => {
            state.error = null;
        },
        removeSuccess: (state) => {
            state.success = null;
        },
        removeupdateSuccess: (state) => {
            state.updateSuccess = null;
        },
    },
    extraReducers: (builder) => {
        //register cases
        builder.
            addCase(register.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
                //store user in local storage
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));

            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Registration failed. Please try again later";
                state.user = null;
                state.isAuthenticated = false;
            })
        //login cases
        builder.
            addCase(login.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
                //store user in local storage
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed. Please try again later";
                state.user = null;
                state.isAuthenticated = false;
            })
        //load user

        builder.
            addCase(loadUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = action.payload?.user || null;
                state.isAuthenticated = Boolean(action.payload?.user);
                //store user in local storage
                localStorage.setItem("user", JSON.stringify(state.user));
                localStorage.setItem("isAuthenticated", JSON.stringify(state.isAuthenticated));

            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to load user profile. Try again";
                state.user = null;
                state.isAuthenticated = false;

                if (action.payload?.statusCode === 401) {
                    state.user = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem("user");
                    localStorage.removeItem("isAuthenticated");
                }
            })
        //logout
        builder.
            addCase(logout.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = null;
                state.isAuthenticated = false;
                
                localStorage.removeItem("user");
                localStorage.removeItem("isAuthenticated");



            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to load user profile. Try again"


            })
        //update profile
        builder.
            addCase(updateProfile.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.updateSuccess = action.payload?.success;
                state.user = action.payload?.user || null;
                state.message = action.payload?.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to load user profile. Try again";
            })
        //update password
        builder.
            addCase(updatePassword.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.updateSuccess= action.payload?.success;
                state.message = action.payload?.message;


            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to Update Password. Try again";
            })
        //forgot password
        builder.
            addCase(forgotPassword.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.message = action.payload?.message;


            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Email sent Failed";
            })
        //reset password
        builder.
            addCase(resetPassword.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.success = action.payload?.success;
                state.user = null;
                state.isAuthenticated = false;

            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to reset password";

            })
    }
})

export const { removeErrors, removeSuccess, clearStatus,removeupdateSuccess } = userSlice.actions;
export default userSlice.reducer;