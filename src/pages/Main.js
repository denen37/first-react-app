import React from 'react'
import { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import { useImmer } from "use-immer";
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { todoAdded, todoChecked, todoDeleted, todoToggleAll } from '../features/todos/todosSlice';
import { fetchAllTodos } from '../features/todos/todosSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';


const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const todos = useSelector(state => state.todos.data)
    const status = useSelector(state => state.todos.status)
    const error = useSelector(state => state.todos.error)



    const dispatch = useDispatch();

    const handleCheck = (id) => {
        dispatch(todoChecked(id));
    }

    const handleCheckAll = (state) => {
        dispatch(todoToggleAll(state));
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeydown = (e) => {
        const trimmedText = e.target.value.trim()

        if (e.key === 'Enter' && trimmedText) {
            // let newId = Math.max(...todos.map(item => item.id)) + 1

            // dispatch(todoAdded(
            //     { id: newId, text: trimmedText, color: "black", isChecked: false }
            // ))

            // axios.post('/todos', {
            //     text: trimmedText,
            //     color: 'black',
            //     isChecked: false,
            // })
            //     .then(result => setTodos((todos) => {
            //         console.log(result);
            //         todos.push(result.data.todo);
            //     }))
            //     .catch(err => console.log(err))
            //     .finally(() => console.log('End Execution'))

            setInputValue('');
        }
    }

    const handleDelete = (id) => {
        dispatch(todoDeleted(id));
    }

    useEffect(() => {
        console.log(todos)
    }, [todos])

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllTodos());
        }
    }, [])

    return (
        <div className="w-8/12 mx-auto py-4 bg-white min-h-screen flex flex-col">
            <Header />
            <div className="pt-4 pb-2 flex-1">
                <h1 className="text-center text-[#b83f45] font-semibold text-2xl">TODOS</h1>
                <div className="px-3">
                    <input placeholder="What needs to be done?" className="border border-gray-200 rounded py-2 px-3 text-lg text-gray-500"
                        onKeyDown={handleKeydown} value={inputValue} onChange={handleChange}
                    />
                </div>
                <div className='mt-2'>
                    {
                        status === 'loading' &&
                        <p className='text-center text-blue-400 text-2xl'>Loading...</p>
                    }
                    {
                        status === 'succeeded' &&
                        todos[0].todos.length > 0 &&
                        todos[0].todos.map((item, index) => <div key={index}>
                            <TodoItem todo={item} onCheck={handleCheck} onDeleteClicked={handleDelete} />
                        </div>)
                    }
                    {
                        status === 'succeeded' &&
                        todos[0].todos.length == 0 &&
                        <p className='text-center text-gray-400 text-2xl'>There are no todos yet</p>
                    }
                    {
                        status === 'failed' &&
                        <p className='text-center text-2xl text-red-400'>There seems to be a problem fetching todos</p>
                    }
                </div>
            </div>
            <div className='grid grid-cols-4 px-2 py-2 border-t-2 border-t-gray-200'>
                <div className='flex flex-col items-center'>
                    <h2 className='font-bold text-base'>Action</h2>
                    <button className='text-white bg-blue-600 px-2 py-1  font-semibold rounded mb-2'
                        onClick={() => handleCheckAll(true)}
                    >Mark All Completed</button>
                    <button className='text-white bg-blue-600 px-2 py-1 font-semibold rounded'
                        onClick={() => handleCheckAll(false)}
                    >Clear completed</button>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Main
