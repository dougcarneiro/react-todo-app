import { createContext, useContext } from "react";

export const onTodoEditedContext = createContext(undefined)

export function useOnTodoEditeContext() {
    const onTodoEdited = useContext(onTodoEditedContext)

    return onTodoEdited
}