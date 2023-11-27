import { Icon } from '@iconify/react';

import { formatDate } from '@/lib/format';

import StatusToggle from './ToggleSwitch';
import { EditTodoButton } from './EditTodoButton';
import { useState } from 'react';
import { RemoveModal } from './RemoveModal';


const background = {
    normal: 'bg-white',
    light: 'bg-yellow-100',
    medium: 'bg-orange-200',
    high: 'bg-red-200'
  }

export default function TodoCard({
    id,
    title,
    text,
    priority,
    is_completed,
    date,
    created_at,
    onSubmit,
    onRemove

}) {

    const todo = {
        id: id,
        title: title,
        text: text,
        priority: priority,
        is_completed: is_completed,
        date: date,
        created_at: created_at,
    }

    function priorityColor(priority) {
        if (priority == 'light') {
            return background.light
          } else if (priority == 'medium'){
            return background.medium
          } else if (priority == 'high'){
            return background.high
          } else {
            return background.normal
          }
    }
       
    const [editingTodo, setEditingTodo] = useState(null);

    function handleUpdateTodo() {
        setEditingTodo(todo)
    }

    return (

    <div
        className={`shadow-md rounded-lg p-4 relative overflow-y-auto ${priorityColor(priority)}`}
        >
       {<StatusToggle is_completed={ is_completed } id={ id }/>}
        <div className="flex justify-between items-center">
        <h3 className="todo-title text-lg font-semibold text-gray-700">
        {title}
        </h3>
        </div>
        <div className="mt-4">
            <p className="text-justify text-lg text-black-500">
            <span className="todo-text">
                {text}
            </span>
            </p>
            <p className="mt-4 text-sm text-gray-500">
            <span className="font-bold">Data do Afazer: </span>
            <span className="todo-date">
                {formatDate(date)}
            </span>
            </p>
            <p className="mt-4 text-sm text-gray-500">
            <span className="font-bold">Criado em: </span>
            <span className="todo-created-at">{formatDate(created_at)}</span>
            </p>
        </div>
        <div className="absolute bottom-4 right-4 inline-flex">
            <span className='mx-0.5'>
                <RemoveModal todo={todo} onRemove={onRemove} />
            </span>
            <span className='mx-0.5'>
                <EditTodoButton todo={todo} editTodoClick={handleUpdateTodo} onSubmit={onSubmit} />
            </span>
        </div>
    </div>
    
    )
}