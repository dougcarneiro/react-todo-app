import { createContext, useContext } from "react";

export const onTodoSubmittedContext = createContext(undefined)

export function useOnTodoSubmittedContext() {
    const onTodoSubmitted = useContext(onTodoSubmittedContext)

    return onTodoSubmitted
}