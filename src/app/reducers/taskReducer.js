import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TASK_URL } from "../constant/apiURL";

const initialState = {
    data: {
    },
    status: 'idle'
}

export const getTask = createAsyncThunk('taskManagement/getTaskData', async (accessToken, { rejectWithValue }) => {
    try {
        const res = await axios.get(TASK_URL, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response.data.status)
    }
})

export const createTask = createAsyncThunk('taskManagement/createTaskData', async ({ accessToken, data }) => {
    try {
        const res = await axios.post(TASK_URL, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const updateTask = createAsyncThunk('taskManagement/updateTaskData', async ({ accessToken, data, id }) => {
    try {
        const res = await axios.put(`${TASK_URL}/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

export const deleteTask = createAsyncThunk('taskManagement/deleteTaskData', async ({ accessToken, id }) => {
    try {
        await axios.delete(`${TASK_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return id
    } catch (error) {
        console.log(error)
    }
})


export const taskManagementSlice = createSlice({
    name: 'taskManagement',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
            })
            .addCase(getTask.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(createTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data.push(action.payload)
            })
            .addCase(createTask.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data[state.data.findIndex(task => task.id == action.payload.id)] = action.payload
            })
            .addCase(updateTask.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = state.data.filter(task => task.id != action.payload)
            })
            .addCase(deleteTask.rejected, (state) => {
                state.status = 'failed'
            })
    }
})

export const selectTaskData = state => state.taskManagement.data

export const selectTaskStatus = state => state.taskManagement.status

export const selectTaskErrorCode = state => state.taskManagement.errCode

export default taskManagementSlice.reducer