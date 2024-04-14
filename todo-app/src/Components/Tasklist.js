import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTodo, editTodo, deleteTodo } from '../Redux/slice';

const Tasklist = (props) => {

    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [editText, setEditText] = useState('');
    const [editId, setEditId] = useState(null);
    const {view} = props;

    // Filter todos based on view prop
    let filteredTodos = todos;
    if (view === 1) {
        filteredTodos = todos.filter(todo => todo.completed);
    } else if (view === 2) {
        filteredTodos = todos.filter(todo => !todo.completed);
    }

    const handleToggleTodo = id => {
        dispatch(toggleTodo(id));
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            alert(`Todo ${todo.text} set to ${todo.completed}`)
        }
    };

    const handleEditTodo = () => {
        dispatch(editTodo({ id: editId, newText: editText }));
        setEditId(null);
        alert(`Todo  edited successfully`)
        setEditText('');
    };

    const handleDeleteTodo = id => {
        dispatch(deleteTodo(id));
        alert(`Todo deleted successfully`)
    }
    return (
        <ul>
            {filteredTodos.map(todo => (
                <div className="card w-50 me-5" key={todo.id}>
                    <div className="card-body">
                        <h5 className="card-title">{todo.text}</h5>
                        <h6 className="card-subtitle mb-2">Status: {todo.completed ? <span>Completed</span> : <span>Not Completed</span>}</h6>
                        <p className="card-text">
                            Created at: {new Date(todo.createdAt).toLocaleString()}<br />
                            Updated at: {new Date(todo.updatedAt).toLocaleString()}
                        </p>

                        {editId === todo.id ? (
                            <>
                                <input className='todo-input' placeholder='Enter Todo here' value={editText} onChange={e => setEditText(e.target.value)} />
                                <button className='btn btn-primary' onClick={handleEditTodo}>Save</button>
                            </>
                        ) : (
                            <button className='btn btn-primary' disabled={todo.completed} onClick={() => { setEditId(todo.id); setEditText(todo.text); }}>Edit</button>
                        )}
                        <button className='btn btn-success' onClick={() => handleToggleTodo(todo.id)}>Change Status</button>
                        <button className='btn btn-danger' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </div>
                    {todo.completed ? <button className='btn btn-success show-status mt-3 me-3 rounded-pill' disabled>Done</button> : <></>}
                </div>
            ))}
        </ul>
    )
}

export default Tasklist;
