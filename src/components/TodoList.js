import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/todos"
});

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        api.get().then((response) => setTodos(response.data));
    }, []);

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text) || todos.some(x => x.id === todo.id)) {
            return
        }
        api.post('', {
            ...todo
        }).then((response) => {
            const newTodos = [response.data, ...todos]
            setTodos(newTodos);
        })
    };


    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        api.put(`${todoId}`, {
            ...newValue
        }).then((response) => {
            const { id, text, isComplete } = response.data;
            setTodos(prev => prev.map(item => (item.id === id ? { id, text, isComplete } : item)));
        })
    }

    const removeTodo = (id) => {
        api.delete(`${id}`);
        setTodos([...todos].filter(todo => todo.id !== id));
    }

    const completeTodo = (id) => {
        const todo = todos.find(x => x.id === id);
        api.put(`${id}`, {
            ...todo,
            isComplete: !todo.isComplete
        }).then((response) => {
            let updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    todo.isComplete = !todo.isComplete;
                }
                return todo;
            });
            setTodos(updatedTodos);
        })
    }


    return (
        <div>
            <h1>What's plan for today?</h1>
            <AddTodo onSubmit={addTodo} />
            <TodoItem todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
        </div>
    )
}

export default TodoList