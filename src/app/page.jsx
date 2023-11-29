'use client';

import Spinner from "@/components/Spinner";
import TodoCard from "@/components/TodoCard";
import Todos from "@/lib/todos";

import { useEffect, useState } from 'react';
import { onStatusChangeContext } from "./hooks/OnStatusChangeContext";
import { onTodoAddedContext } from "./hooks/OnTodoAddedContext";
import { onTodoEditedContext } from "./hooks/OnTodoEditedContext";
import { onTodoRemoveContext } from "./hooks/OnTodoRemoveContext";
import LogInRedirectButton from "@/components/LogInRedirectButton";
import Storage from "@/services/storage";
import NewTodoModal from "@/components/NewTodoModal";
import Profile from "@/components/Profile";
import SearchBar from "@/components/SearchBar";


export function Home() {

    const defaultSearch = {title: '',
                           notDone: false,
                           done: false,
                           high: false,
                           medium: false,
                           light: false,
                           normal: false,
                           isSearching: false}
    
    const [todos, setTodos] = useState(null);
    const [fetchTodos, setFetchTodos] = useState(true);
    const [showSpinner, setShowSpinner] = useState(true)
    const [blurTodos, setBlurTodos] = useState('')
    const [user, setUser] = useState(null);
    const [searchOptions, setSearchOptions] = useState(defaultSearch)

    const blurMd = 'blur-md'

    const fetchData = async (searchOptions) => {
            try {
                const fetchedTodos = await Todos.load(searchOptions)
                setBlurTodos('')
                setTodos(fetchedTodos)
                setShowSpinner(false)
                setSearchOptions(defaultSearch)
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }

    useEffect(() => {
        const fetchUser = async () => {
            const user = await Storage.getUserByJWT()
            setUser(user)
        }

    fetchUser()

    }, [])
    
    const blurLoadingEffect = () => {
        setBlurTodos(blurMd)
        setShowSpinner(true)
    }

    const todoChange = async () => {
        blurLoadingEffect()
        setFetchTodos(false)
    }

    const removeData = async (todo) => {
        blurLoadingEffect()
        await Todos.remove(todo)
        setFetchTodos(false)
    }

    const statusChange = async (todo, newStatus) => {
        todo.is_completed = newStatus
        blurLoadingEffect()
        await Todos.update(todo)
        setFetchTodos(false)
    }

    const onSearch = async (options) => {
        blurLoadingEffect()
        setFetchTodos(false)
        setSearchOptions(options)
    }

    useEffect(() => {
        Todos.loadStorage()
        fetchData(searchOptions)
        setFetchTodos(true)
    }, [fetchTodos])
    
    return (
        <> 
            <div id="search-bar">
                <SearchBar onSearch={onSearch} options={defaultSearch}/>
                <div className="container mt-12 font-montserrat mx-auto lg:max-w-screen-lg mb-20 md:mt-0">
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
                    <div className="fixed bottom-8 right-8 z-[99] md:absolute md:top-8 md:right-8 md:z-[50]">
                        {user && (<Profile user={user}/>)}
                        {!user && (<LogInRedirectButton/>)}
                    </div>
                    <div className="fixed bottom-8 left-8 md:top-8 z-[99]">
                        <onTodoAddedContext.Provider value={todoChange}>
                            <NewTodoModal/>
                        </onTodoAddedContext.Provider>
                    </div>
                {showSpinner && (
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99]">
                        <Spinner/>
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