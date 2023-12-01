import { createClient } from '@supabase/supabase-js'


const ENV_URL = process.env.NEXT_PUBLIC_ENV_URL

const SUPABASE_PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL
const SUPABASE_API_SECRET_KEY = process.env.NEXT_PUBLIC_SUPABASE_API_SECRET_KEY

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_API_SECRET_KEY)

const PROFILE_SELECT = 'id, name, user_id, email, created_at'


// PROFILE
export async function getAllProfiles() {
    return await supabase.from('Profile')
                            .select(PROFILE_SELECT) 
}

export async function getProfileById(id) {
    return await supabase.from('Profile')
                            .select(PROFILE_SELECT)
                            .eq('id', id)
}

export async function getProfileByEmail(email) {
    return await supabase.from('Profile')
                            .select(PROFILE_SELECT)
                            .eq('email', email)
                            .single()
}

export async function createProfile(profile) {
    return await supabase.from('Profile')
                            .insert({ ...profile })
                            .select(PROFILE_SELECT)
}

export async function updateProfile(profile) {
    return await supabase.from('Profile')
                            .update({...profile})
                            .eq('id', profile.id)
                            .select(PROFILE_SELECT)
}

// USER MANAGEMENT SUPABASE PROVIDED
export async function signUp(user) {
    const existingUser = await getProfileByEmail(user.email)
    if (existingUser.data) {
        return false
    }
    const { data, error } = await supabase.auth.signUp({ ...user })
    const created_user = data.user
    if (created_user) {
        const user = data
        const profile = {
            name: user.name,
            user_id: created_user.id,
            email: user.email,
            password: created_user.encrypted_password
        }
        const { data, error } = await createProfile(profile)
        user.profile = data
        return { user, error }
    } else {
        return error
    }
}

export async function singIn(email, password) {
    const existingUser = await getProfileByEmail(email)
    if (!existingUser.data) {
        return false
    }
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })
    if (data.user) {
        return existingUser
    } else {
        return false
    }
} 

export async function recoverPass(email) {
    await supabase.auth.resetPasswordForEmail(email)
}

export async function logOut() {
    await supabase.auth.signOut()
}

export async function getLoggedUser() {
    try {
        const { data: { user}  } = await supabase.auth.getUser()
        if (user) {
            const { data, error } = await getProfileByEmail(user.email)
            user.profile = data
            return user
        }
    } catch (error) {
        console.error(error)
    }
    
}

export async function updateLoggedUser(data) {
    return await supabase.auth.updateUser({
        ...data
      })
} 

// ToDos
export async function getAllTodoByUser(profileId, filters) {
    const priority = [filters.normal ? 'normal' : '',
                      filters.light ? 'light' : '',
                      filters.medium ? 'medium' : '', 
                      filters.high ? 'high' : '']
    const title = filters.title ? filters.title : ''
    let filterPriority = priority.filter(filter => filter !== '')
    let statusFilter = [true, false]
    if (filters.done || filters.notDone) {
        statusFilter = []
        statusFilter.push(filters.done ? true : false)
        statusFilter.push(filters.notDone ? false : true)
    }
    if (filterPriority.length == 0) {
        filterPriority = ['normal', 'light', 'medium', 'high']
    }
    let query = await supabase.from('Todo')
                         .select('*')
                         .eq('profile_id', profileId) 
                         .eq('is_active', true)
                         .order('created_at', { ascending: false })
                         .ilike('title', `%${title}%`)
                         .in('priority', filterPriority)
                         .in('is_completed', statusFilter)
    return query
    

}

export async function createTodo(todo, profile_id) {
    return await supabase.from('Todo')
                         .insert({ profile_id, ...todo })
                         .select()
}

export async function updateTodo(todo) {
    delete todo.created_at
    return await supabase.from('Todo')
                         .update({...todo})
                         .select('*')
                         .eq('id', todo.id)
}

export async function updateTodoStatus(id, is_completed) {
    return await supabase.from('Todo')
                         .update({'is_completed': is_completed})
                         .select('*')
                         .eq('id', id)
}

export async function getTodoById(id) {
    return await supabase.from('Todo')
                         .select()
                         .eq('id', id)
                         .single()
}

export async function deleteTodo(todo) {
    return await supabase.from('Todo')
                         .update({'is_active': false})
                         .eq('id', todo.id)
}

export async function getTodosCountByProfileId(profileId, isCompleted=[false, true], isActive=[true]) {
    const { count, error } = await supabase
                         .from('Todo')
                         .select('*', { count: 'exact', head: true })
                         .eq('profile_id', profileId)
                         .in('is_active', isActive)
                         .in('is_completed', isCompleted)
    return count
}

export async function passwordRecovery(email) {
    
    const { data } = await getProfileByEmail(email)
    const profile = data
    if (profile) {
        const { data }  = await createPassToken(profile.id) 
        const passToken = data
        const url = `${ENV_URL}auth/recover-pass?recoverPassToken=${passToken.id}`
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: url
        })
    }
}

export async function resetPassword(newPassword) {
    await supabase.auth.updateUser({ password: newPassword })
}


export async function createPassToken(profile_id) {
    return await supabase.from('PasswordToken')
                         .insert({ profile_id })
                         .select()
                         .single()
}

export async function updatePassToken(token) {
    await supabase.from('PasswordToken')
                        .update({'is_active': false})
                        .eq('id', token.id)
}

export async function getPassTokenById(id) {
    return await supabase.from('PasswordToken')
                         .select()
                         .eq('id', id)
                         .eq('is_active', true)
                         .single()
}