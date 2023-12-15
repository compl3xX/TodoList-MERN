import { createContext, useEffect, useReducer, useState } from "react";

import { v4 as uuidv4 } from 'uuid';


import fetchNotes from "../components/fetchNotes";

export const TodoContext = createContext();

export const TodoDispatchContext = createContext();

export const TodoFilterContext = createContext();

export const ExtraFeatureContext = createContext();


const todoReducer = (state, action) => {

    switch (action.type) {

        case 'ADD_TODOS':
            return [
                ...action.payload
            ]

        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    content: action.content,
                    isDone: action.isDone
                }
            ]

        case 'DEL_TODO':

            const delTodos = state.filter((s) => {

                if (action.id) return action.id !== s.id

                else {
                    return !s.isDone;
                }
            })

            return delTodos;

        case 'UPDATE_TODO':

            const updateTodos = state.map((todo) => {


                if (action.id) {
                    if (action.id === todo.id) {
                        return {
                            ...todo,
                            isDone: action.isDone !== undefined ? action.isDone : todo.isDone,
                            title: action.title !== undefined ? action.title : todo.title,
                            content: action.content !== undefined ? action.content : todo.content,

                            // Add more properties as needed
                        };
                    } else {
                        return todo; // Return the original todo item if the ID doesn't match
                    }
                }
                else {

                    return {
                        ...todo,
                        isDone: true
                    }

                }
            })

            return updateTodos

    }

}


export const TodoProvider = ({ children }) => {


    const initialNotes = [];

    const [todos, dispatch] = useReducer(todoReducer, initialNotes);

    const [filter, setFilter] = useState('All')

    const [delCompTodos, setdelCompTodos] = useState(false)


    return (
        <TodoDispatchContext.Provider value={dispatch}>
            <TodoContext.Provider value={todos} >
                <TodoFilterContext.Provider value={{ filter, setFilter }}>
                    <ExtraFeatureContext.Provider value={{ delCompTodos, setdelCompTodos }}>
                        {children}
                    </ExtraFeatureContext.Provider>
                </TodoFilterContext.Provider>
            </TodoContext.Provider >
        </TodoDispatchContext.Provider>

    )


}


const initialTasks = [
    { id: uuidv4(), text: 'Make WebApp', isDone: true },
    { id: uuidv4(), text: 'Make Project List', isDone: false }
]

