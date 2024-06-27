import { Link } from 'react-router-dom';
import check from '../images/check-mark-10120.png';
import cancel from '../images/red-x-10340.png';

const TodoItem = ({ todo, onCheck, onDeleteClicked }) => {

    return (
        <div className='flex items-center justify-between border-t-2 border-t-gray-200 px-2 py-2'>
            <div className='flex items-center gap-2 '>
                <div className='w-[30px] aspect-square rounded-full border border-gray-200 p-1 cursor-pointer'
                    onClick={() => onCheck(todo.id)}>
                    {
                        todo.isChecked && <img src={check} className='w-full h-full' alt='' />
                    }
                </div>
                <Link to={`todo/${todo.id}`}>
                    <p style={{ color: todo.color }}>{todo.text}</p>
                </Link>
            </div>
            <div>
                <div className='w-[30px] aspect-square p-1 cursor-pointer' onClick={() => onDeleteClicked(todo.id)}>
                    <img src={cancel} className='w-full h-full' alt='' />
                </div>
            </div>
        </div>
    )
}

export default TodoItem
