import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllTodos = createAsyncThunk(
    'todos/fetchAllTodos', async () => {
        const response = await axios.get('/todo');
        return response.data;
    }
)


let initialState = {
    data: [],
    status: 'idle',
    error: []
}

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todoAdded(state, action) {
            state.push(action.payload);
        },
        todoChecked(state, action) {
            let todo = state.find(todo => todo.id == action.payload)
            todo.isChecked = !todo.isChecked;
        },
        todoDeleted(state, action) {
            return state.filter(todo => todo.id !== action.payload)
        },
        todoToggleAll(state, action) {
            state.forEach(todo => {
                todo.isChecked = action.payload
            })
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTodos.pending, (state, action) => {
            state.status = 'loading'
        })

        builder.addCase(fetchAllTodos.fulfilled, (state, action) => {
            state.data.push(action.payload);
            state.status = 'succeeded'
        })

        builder.addCase(fetchAllTodos.rejected, (state, action) => {
            state.error.push(action.error.message);
            state.status = 'failed'
        })
    }
})

export const { todoAdded, todoChecked, todoDeleted, todoToggleAll } = todosSlice.actions

export { todosSlice }