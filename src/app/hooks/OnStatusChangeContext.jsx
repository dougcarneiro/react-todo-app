import { createContext, useContext } from "react";

export const onStatusChangeContext = createContext(undefined)

export function useOnStatusChangeContext() {
    const changeStatus = useContext(onStatusChangeContext)
    if (changeStatus === undefined) {
        throw new Error('useOnStatusChangeContext must be used with a onStatusChangeContext')
    }
    return changeStatus
}