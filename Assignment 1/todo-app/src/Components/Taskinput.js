import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from '../Redux/slice';
import "../Pages/Home.css";

const Taskinput = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [text, setText] = useState('');

    const handleAddTodo = () => {
        if (!text) {
            console.log("done")
            alert("please enter a valid todo")
            return;
        }
        dispatch(addTodo(text));
        alert(`Todo added successfully!`)
        setText('');
    };


    const saveTodo = () => {
        localStorage.setItem("todo", JSON.stringify(todos));
        alert(`Saved to Local Storage`)
    }

    const removeTodo = () => {
        localStorage.removeItem("todo");
        alert(`Deleted from Local Storage`)
    }

    const downloadTodo = () => {
        const replacer = (key, value) => {
            if (key === 'createdAt' || key === 'updatedAt') {
                return new Date(value).toLocaleString();
            }
            return value === null ? '' : value;
        };
        const header = Object.keys(todos[0]);
        let csv = todos.map(row => header.map(fieldName => {
            let value = row[fieldName];
            if (replacer) {
                value = replacer(fieldName, value);
            }
            return JSON.stringify(value);
        }).join(','));
        csv.unshift(header.join(','));
        csv = csv.join('\r\n');
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.target = '_blank';
        link.download = 'todos.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        alert(`Todo download started`)
    }

    return (
        <>
            <input
                className='todo-input'
                placeholder='Enter Todo here'
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={event => {
                    if (event.key === 'Enter') {
                        handleAddTodo();
                    }
                }}
            />

            <button className="add-todo" onClick={handleAddTodo}>Add Todo</button>
            <div>
                <button className="add-todo" onClick={saveTodo}>Save Todo</button>
                <button className="add-todo" onClick={removeTodo}>Delete Todo</button>
                <button className='add-todo' onClick={downloadTodo}>Downlaod Todo</button>
            </div>
        </>
    )
}

export default Taskinput