'use client';

import { NewTodoButton } from "@/components/NewTodoButton";
import TodoCard from "@/components/TodoCard";
import Todos from "@/lib/todos";

import { useState } from 'react';


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
    };

    if (!todosFetched) {
        Todos.loadStorage()
        fetchData()
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
                    <h2 id="not-found-todo" className="text-center text-2xl my-12 font-bold text-violet-900"></h2>
                    <div className="fixed bottom-8 left-8 md:top-8 z-[99]">
                        <NewTodoButton onTodoAdded={fetchData}/>
                    </div>

                {todos && (
                    <div className="todo mx-2 mb-10 grid grid-cols-1 gap-2 md:mx-8 md:grid-cols-2 xl:grid-cols-2">
                    {todos.map((todo) => (
                        <TodoCard {...todo} key={todo.id} onSubmit={fetchData} onRemove={fetchData}/>
                    ))}
                    </div>
                )}
                </div>
                
            </div>
        </>

    )
}

export default Home;