import { createContext, useContext } from "react";

export const TodoContext = createContext(undefined)

export function useTodoContext() {
    const todo = useContext(TodoContext)
    if (todo === undefined) {
        throw new Error('useTodoContext must be used with a TodoContext')
    }
    return todo
}