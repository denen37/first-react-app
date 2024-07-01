import React from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'

const TodoDetails = () => {
    const { id } = useParams();

    return (
        <div className="w-8/12 mx-auto py-4 bg-white min-h-screen flex flex-col">
            <Header />
            <p className='text-lg'>id: {id}</p>
            {/* <p className='text-lg'>Text: {todo.text}</p>
            <p className='text-lg'>Completed: {todo.isChecked ? 'true' : 'false'}</p> */}
        </div>
    )
}

export default TodoDetails
