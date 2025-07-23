import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
    isLoading:false,
    userdetail:null,
}

export const getUserByIdForSeller = createAsyncThunk(
    "/auth/user/getUserById",
    async(id) => {
        const response = await axios.get(`http://localhost:3000/api/auth/user/${id}`);

        console.log(response.data);
        return response.data;
    }
)

const getUserByIdSlice = createSlice({
    name:"getUserByIdSlice",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getUserByIdForSeller.pending, (state) => {
            state.isLoading = true;
        }).addCase(getUserByIdForSeller.fulfilled,(state,action)=> {
            state.isLoading=false;
            state.userdetail = action.payload.data;
        }).addCase(getUserByIdForSeller.rejected,(state)=> {
            state.isLoading = false,
            state.userdetail = null;
        })
    }
})

export default getUserByIdSlice.reducer;