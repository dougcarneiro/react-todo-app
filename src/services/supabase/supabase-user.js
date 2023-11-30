export async function getUserProfileData(user) {
    const fetchCreatedTodos = await getTodosCountByProfileId(user.id, [true, false], [true, false])
    const fetchCompletedTodos = await getTodosCountByProfileId(user.id, [true])
    const fetchUncompletedTodos = await getTodosCountByProfileId(user.id, [false])

    return {fetchCreatedTodos: fetchCreatedTodos,
            fetchCompletedTodos: fetchCompletedTodos,
            fetchUncompletedTodos: fetchUncompletedTodos}
}


export function logoutUser() {
    localStorage.removeItem('@todo-app:jwt');
    window.location.href = '/auth/sign'
}