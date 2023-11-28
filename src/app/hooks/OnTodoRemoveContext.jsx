import { createContext, useContext } from "react";

export const onTodoRemoveContext = createContext(undefined)

export function useOnTodoRemoveContext() {
    const onRemove = useContext(onTodoRemoveContext)
    if (onRemove === undefined) {
        throw new Error('useOnTodoRemoveContext must be used with a onTodoRemoveContext')
    }
    return onRemove
}