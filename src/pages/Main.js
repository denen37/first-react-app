import React from 'react'
import { useEffect, useState } from 'react';
import TodoItem from '../components/TodoItem';
import { useImmer } from "use-immer";
import Header from '../components/Header';

let initialState = [
    { id: 2, text: "Learn React", color: "black", isChecked: true },
    { id: 3, text: "Learn Redux", color: "blue", isChecked: false },
    { id: 1, text: "Build Something Cool", color: "red", isChecked: false }
]

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const [todoList, updateTodoList] = useImmer(initialState);

    const handleCheck = (id) => {

        updateTodoList((list) => {
            const todo = list.find(obj => obj.id === id)
            todo.isChecked = !todo.isChecked
        })
    }

    const handleCheckAll = (state) => {
        updateTodoList((list) => {
            list.forEach(item => item.isChecked = state)
        })
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeydown = (e) => {
        const trimmedText = e.target.value.trim()

        if (e.key === 'Enter' && trimmedText) {
            let newId = Math.max(...todoList.map(item => item.id)) + 1

            updateTodoList(list => {
                list.push({ id: newId, text: trimmedText, color: 'black' })
            })
            setInputValue('');
        }
    }

    const handleDelete = (id) => {
        updateTodoList(() => todoList.filter(item => item.id !== id))
    }

    // useEffect(() => {

    // }, [todoList])

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
                        todoList && todoList.map((item, index) => <div key={Math.random()}>
                            <TodoItem todo={item} onCheck={handleCheck} onDeleteClicked={handleDelete} />
                        </div>)
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
