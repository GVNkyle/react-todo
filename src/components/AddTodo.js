import React, { useState, useEffect, useRef } from 'react'

const AddTodo = (props) => {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    })

    const handleChange = e => {
        setInput(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });

        setInput('');
    }

    return(
    <form onSubmit={handleSubmit} className='todo-form'>
        {props.edit ? (
            <>
                <input placeholder='Update your item' 
                       onChange={handleChange}
                       value={input}
                       name='value'
                       ref={inputRef}
                       className='todo-input edit'/>
                <button onClick={handleSubmit} className='todo-button edit'>
                    Update
                </button>
            </>
        ) : (
            <>
            <input placeholder='Add your item' 
                       onChange={handleChange}
                       value={input}
                       name='value'
                       ref={inputRef}
                       className='todo-input'/>
                <button onClick={handleSubmit} className='todo-button'>
                Add todo
                </button>
            </>
        )}

    </form>
    )
}

export default AddTodo