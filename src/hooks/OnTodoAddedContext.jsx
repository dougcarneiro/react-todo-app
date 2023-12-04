import { createContext, useContext } from "react";

export const onTodoAddedContext = createContext(undefined)

export function useOnTodoAddedContext() {
    const onTodoAdded = useContext(onTodoAddedContext)

    return onTodoAdded
}