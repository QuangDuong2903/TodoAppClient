import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../constant/apiURL";

export const getUserData = createAsyncThunk('userManagement/getUserData', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(LOGIN_URL, data)
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.status)
    }
})

export const createUser = createAsyncThunk('userManagement/createUser', async (data) => {
    try {
        const res = await axios.post(SIGNUP_URL, data)
        return res.data
    } catch (error) {
        console.log(error)
    }
})

const initialState = {
    data: {
    },
    status: 'idle'
}

export const userManagementSlice = createSlice({
    name: 'userManagement',
    initialState: initialState,
    reducers: {
        setStatus: (state, action) => { state.status = action.payload }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserData.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(getUserData.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(createUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(createUser.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const { setStatus } = userManagementSlice.actions

export const selectUserData = state => state.userManagement.data

export const selectAccessToken = state => state.userManagement.data.accessToken

export const selectUserStatus = state => state.userManagement.status

export default userManagementSlice.reducer