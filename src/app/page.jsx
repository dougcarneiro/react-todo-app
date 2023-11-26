'use client';

import('preline')

import TodoCard from "@/components/TodoCard";
import { AddModal, TodoForm } from "@/components/TodoForm";
import Todos from "@/lib/todos";

import { useEffect, useState } from 'react';


export function Home() {
    
    const [todos, setTodos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedTodos = await Todos.load()
                setTodos(fetchedTodos)
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
    
        fetchData();
      }, []);

    return (
        <> 
            <div id="search-bar">
                <div className="container mx-auto lg:max-w-screen-lg mb-20">
                    <a href="/">
                        <h1 className="text-center text-8xl mt-6 font-medium font-satisfy text-violet-800 drop-shadow-lg md:text-9xl">
                            Tásku
                        </h1>
                        <h2 className="text-center text-2xl mt-6 italic font-medium font-satisfy text-violet-600 drop-shadow-lg md:text-3xl">
                            A melhor forma de organizar seus afazeres
                        </h2>
                    </a>
                    <h2 id="not-found-todo" className="text-center text-2xl my-12 font-bold text-violet-900"></h2>
                    <AddModal/>
                </div>
                
                {todos && (
                    <div className="todo mx-2 grid grid-cols-1 gap-2 md:mx-8 md:grid-cols-2 xl:grid-cols-4 lg:mx-14">
                    {todos.map((todo) => (
                        <TodoCard {...todo} key={todo.id} />
                    ))}
                    </div>
                )}
            </div>
        </>

    )
}

export default Home;