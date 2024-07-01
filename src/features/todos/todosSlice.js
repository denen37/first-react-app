import { createSlice } from "@reduxjs/toolkit";

let initialState = [
    { id: 2, text: "Learn React", color: "black", isChecked: true },
    { id: 3, text: "Learn Redux", color: "blue", isChecked: false },
    { id: 1, text: "Build Something Cool", color: "red", isChecked: false }
]

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
        }
    }
})

export const { todoAdded, todoChecked } = todosSlice.actions

export { todosSlice }