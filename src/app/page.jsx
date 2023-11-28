'use client';

import { NewTodoButton } from "@/components/NewTodoButton";
import Spinner from "@/components/Spinner";
import TodoCard from "@/components/TodoCard";
import Todos from "@/lib/todos";

import { useEffect, useState } from 'react';
import { onStatusChangeContext } from "./hooks/OnStatusChangeContext";
import { onTodoAddedContext } from "./hooks/OnTodoAddedContext";
import { onTodoEditedContext } from "./hooks/OnTodoEditedContext";
import { onTodoRemoveContext } from "./hooks/OnTodoRemoveContext";
import LogInRedirectButton from "@/components/LogInRedirectButton";
import Profile from "@/components/Profile";



export function Home() {
    
    const [todos, setTodos] = useState(null);
    const [fetchTodos, setFetchTodos] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true)
    const [blurTodos, setBlurTodos] = useState('')

    const blurMd = 'blur-md'

    const fetchData = async () => {
            try {
                const fetchedTodos = await Todos.load()
                setBlurTodos('')
                setTodos(fetchedTodos)
                setShowSpinner(false)
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

    useEffect(() => {
        Todos.loadStorage()
        fetchData()
        setFetchTodos(true)
    }, [fetchTodos])
    
    const blurLoadingEffect = async (waitTime=400) => {
        await new Promise(resolve => setTimeout(resolve, waitTime));
        setBlurTodos(blurMd)
        setShowSpinner(true)
    }

    const todoChange = async () => {
        await blurLoadingEffect()
        setFetchTodos(false)
    }


    const removeData = async (todo) => {
        await blurLoadingEffect()
        await Todos.remove(todo)
        setFetchTodos(false)
    }

    const statusChange = async (todo, newStatus) => {
        todo.is_completed = newStatus
        await blurLoadingEffect(50)
        await Todos.update(todo)
        setFetchTodos(false)
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
                    <div className="absolute bottom-8 right-8 md:top-8">
                        <LogInRedirectButton/>
                        <Profile/>
                    </div>
                    <div className="fixed bottom-8 left-8 md:top-8 z-[99]">
                        <onTodoAddedContext.Provider value={todoChange}>
                            <NewTodoButton/>
                        </onTodoAddedContext.Provider>
                    </div>
                {showSpinner && (
                    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99]">
                        <Spinner />
                    </div>
                )}
                <onStatusChangeContext.Provider value={statusChange}>
                    <onTodoEditedContext.Provider value={todoChange}>
                        <onTodoRemoveContext.Provider value={removeData}>
                            {todos && (
                                <div className={`todo ${blurTodos} mx-2 mb-10 mt-12 grid grid-cols-1 gap-2 md:mx-8 md:grid-cols-2 xl:grid-cols-2`}>
                                {todos.map((todo) => (
                                    <TodoCard 
                                        todo={todo}
                                        key={todo.id} 
                                        />
                                ))}
                                </div>
                            )}
                        </onTodoRemoveContext.Provider>
                    </onTodoEditedContext.Provider>
                </onStatusChangeContext.Provider>
                </div>
                
            </div>
        </>

    )
}

export default Home;