import React, { useState } from 'react';
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { RiCheckboxLine } from "react-icons/ri";
import { RiCheckboxBlankLine } from "react-icons/ri";
import AddTodo from './AddTodo'

const TodoItem = ({ todos, completeTodo, removeTodo, updateTodo }) => {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    const submitUpdate = value => {
        updateTodo(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if (edit.id) {
        return <AddTodo edit={edit} onSubmit={submitUpdate} />
    }

    return todos.map((todo, index) => {
        return (
            <div key={index} className={todo.isComplete ? 'todo-row complete' : 'todo-row'}>
                <div key={todo.id}>
                    {todo.text}
                </div>
                <div className='icons'>
                    {todo.isComplete ? (<RiCheckboxLine onClick={() => completeTodo(todo.id)} className='complete-icon'/>) : 
                                       (<RiCheckboxBlankLine onClick={() => completeTodo(todo.id)} className='complete-icon'/>)}
                    <RiCloseCircleLine onClick={() => removeTodo(todo.id)} className='delete-icon' />
                    <TiEdit onClick={() => setEdit({ id: todo.id, value: todo.text })} className='edit-icon' />
                </div>
            </div>)
    });
}

export default TodoItem