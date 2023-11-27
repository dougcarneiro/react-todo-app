'use client';

import { NewTodoButton } from "@/components/NewTodoButton";
import Spinner from "@/components/Spinner";
import TodoCard from "@/components/TodoCard";
import Todos from "@/lib/todos";

import { useState, useEffect } from 'react';


export function Home() {
    
    const [todos, setTodos] = useState(null);
    const [todosFetched, setTodosFetched] = useState(false);

    const fetchData = async () => {
            try {
                const fetchedTodos = await Todos.load()
                setTodos(fetchedTodos)
                setTodosFetched(true)
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

    if (!todosFetched) {
        Todos.loadStorage()
        fetchData()
    }

    const todoChange = async () => {
        setTodos(null)
        fetchData()
    }

    const removeData = async (todo) => {
        await Todos.remove(todo)
        setTodos(null)
        fetchData()
    }

    const statusChange = async (todoId, newStatus) => {
        const todo = await Todos.get(todoId)
        todo.is_completed = newStatus
        await Todos.update(todo);
    }
    
    return (
        <> 
            <div id="search-bar">
                <div className="container font-montserrat mx-auto lg:max-w-screen-lg mb-20">
                    <a href="/">
                        <h1 className="text-center text-8xl mt-6 font-medium font-satisfy text-violet-800 drop-shadow-lg md:text-9xl">
                            Tásku
                        </h1>
                        <h2 className="text-center text-2xl mt-6 italic font-medium font-satisfy text-violet-600 drop-shadow-lg md:text-3xl">
                            A melhor forma de organizar seus afazeres
                        </h2>
                    </a>
                    {todos && todos.length == 0 && (
                    <h2 className="text-center text-2xl my-12 font-bold text-violet-900">
                        Você não possui afazeres.
                    </h2>
                    )}
                    <div className="fixed bottom-8 left-8 md:top-8 z-[99]">
                        <NewTodoButton onTodoAdded={todoChange}/>
                    </div>
                    
                {!todos && (
                    <div className="absolute mt-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Spinner size={'14'}/>
                    </div>
                )}
                {todos && (
                    <div className="todo mx-2 mb-10 mt-12 grid grid-cols-1 gap-2 md:mx-8 md:grid-cols-2 xl:grid-cols-2">
                    {todos.map((todo) => (
                        <TodoCard 
                            {...todo} 
                            key={todo.id} 
                            onSubmit={todoChange} 
                            onRemove={removeData}
                            onStatusChange={statusChange}
                            />
                    ))}
                    </div>
                )}
                </div>
                
            </div>
        </>

    )
}

export default Home;