import Storage from '@/services/storage';
import { createTodo, deleteTodo, getAllTodoByUser, getLoggedUser, getTodoById, updateTodo, updateTodoStatus } from '@/services/supabase/supabase';
import { orderByDate } from './orderByCreatedAt';


async function load(options = {}, user = null) {
  const loggedUser = user

  const {
    title = '',
    notDone = false,
    done = false,
    high = false,
    medium = false,
    light = false,
    normal = false,
    isSearching = false
  } = options;
  
  

  let todos
  
  if (loggedUser) {
    const { data, error } =  await getAllTodoByUser(loggedUser.profile.id, options)
    if (data) {
      todos = data
    }
  } else {
    todos = Storage.read('todos');
  }

  if (!loggedUser) {
    if (title){
      todos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(title.toLowerCase())
      );
    }
  
    if (notDone && !done) {
      todos = todos.filter((todo) =>
      !(todo.is_completed)
      );
    }
  
    if (done && !notDone) {
      todos = todos.filter((todo) =>
      todo.is_completed
      );
    }

    let todosHigh = []
    let todosMedium = []
    let todosLow = []
    let todosNormal = []
    let filteredTodos = []
  
    if (high || medium || light || normal) {
  
        if (high) {
          todosHigh = todos.filter((todo) =>
          todo.priority === 'high'
          );
        }
      
        if (medium) {
          todosMedium = todos.filter((todo) =>
          todo.priority === 'medium'
          );
        }
      
        if (light) {
          todosLow = todos.filter((todo) =>
          todo.priority === 'light'
          );
        }
      
        if (normal) {
          todosNormal = todos.filter((todo) => 
            todo.priority === 'normal'
          );
        }
      
        filteredTodos = [...todosHigh, ...todosMedium, ...todosLow, ...todosNormal]
        
        todos = filteredTodos
  
    }
  }

  const notFoundMsg = isSearching ? 'Nenhum afazer encontrado.' : 'Você não possui nenhum afazer.'
  if (!loggedUser) {
    orderByDate(todos, 'desc')
  }
  return todos
  }


async function get(id) {
  const loggedUser = await getLoggedUser()
  if (loggedUser) {
    const { data, error } = await getTodoById(id)
    if (data) {
      return data
    }
  } else {
    return Storage.read('todos', id)
  }
}


async function create(todo, loggedUser=false) {
  delete todo.id;
  let createdTodo

  if (loggedUser) {
    const { data, error } = await createTodo(todo, loggedUser.id)
    if (data) {
      createdTodo = data[0]
    }
  } else {
    createdTodo = Storage.create('todos', todo);
  }
}

async function update(todo, isCreating) {
  const { id } = todo;
  let updatedTodo

  const loggedUser = await getLoggedUser()

  if (isCreating) {
      await create(todo, loggedUser.profile)
    } else {
      if (loggedUser) {
        try {
          const { data, erro } = await updateTodo(todo)
          updatedTodo = data[0]
        } catch (err) {
          console.log(err)
        }
      } else {
        updatedTodo = Storage.update('todos', id, todo);
      }
    }
  }

async function remove(todo) {
  const { id } = todo;

  const loggedUser = await getLoggedUser()
  if (loggedUser) {
    const { data, erro } = await deleteTodo(todo)
  } else {
    Storage.remove('todos', id);
  }
}

function loadStorage(seed=[]) {
  Storage.loadSeed('todos', seed)
}

export default { load, get, create, update, remove, loadStorage };
