'use client';

import('preline')

import { Icon } from '@iconify/react';

import { formatDate } from '@/lib/format';

import StatusToggle from './ToggleSwitch';
import { EditModal } from './TodoForm';


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

}) {

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
    

    const handleDeleteTodo = (title) => {
        confirm(`Deseja remover ${title}?`)
    };    

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
            <span className="font-bold">Data do Afazer:</span>
            <span className="todo-date">
                {formatDate(date)}
            </span>
            </p>
            <p className="mt-4 text-sm text-gray-500">
            <span className="font-bold">Criado em:</span>
            <span className="todo-created-at"> {formatDate(created_at)}</span>
            </p>
        </div>
        <div className="absolute bottom-4 right-4 inline-flex">
            <span
            className="icon-trash mr-1 text-gray-400 hover:text-gray-700 cursor-pointer"
            data-hs-overlay="#remove-modal"
            >
               <Icon icon="solar:trash-bin-minimalistic-broken" 
               onClick={handleDeleteTodo}/>
            </span>
            <EditModal/>
        </div>
    </div>
    
    )
}