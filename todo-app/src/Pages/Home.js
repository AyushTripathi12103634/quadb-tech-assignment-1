import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loadTodos } from '../Redux/slice';
import "./Home.css";
import Taskinput from '../Components/Taskinput';
import Tasklist from '../Components/Tasklist';


const Home = () => {
    const dispatch = useDispatch();
    // Called once when page is loaded, it will not be called again after rendering
    useEffect(() => {
        const savedTodos = localStorage.getItem('todo');
        if (savedTodos) {
            dispatch(loadTodos(JSON.parse(savedTodos)));
        }
    }, [dispatch]);

    const [view,setview] = useState(0);


    return (
        <div id="home-main">
            <h1>TODO APP</h1>
            <Taskinput />
            <button className='add-todo' onClick={()=>setview(1)}>Completed</button>
            <button className='add-todo' onClick={()=>setview(2)}>Not Completed</button>
            <button className='add-todo' onClick={()=>setview(0)}>All</button>
            <Tasklist view={view} />
        </div>
    );
}

export default Home