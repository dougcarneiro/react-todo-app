import { formatDate } from '@/utils/date';
import ToggleSwitch from './ToggleSwitch';
import { TodoContext } from '@/hooks/TodoContext';
import EditTodoModal from './EditTodoModal';
import RemoveModal from './RemoveModal';



export default function TodoCard({todo}) {
    
    function priorityColor(priority) {
        
        const background = {
            normal: 'bg-white',
            light: 'bg-yellow-100',
            medium: 'bg-orange-200',
            high: 'bg-red-200'
          }
        
        switch(priority) {
            case 'light':
                return background.light
            case 'medium':
                return background.medium
            case 'high':
                return background.high
            case 'normal':
                return background.normal
        }
    }

    return (

    <div
        className={`shadow-md rounded-lg p-4 relative overflow-y-auto ${priorityColor(todo.priority)}`}
        >
        <div className="flex justify-between items-center">
        {
            <TodoContext.Provider value={todo}>
                <ToggleSwitch />
            </TodoContext.Provider>
            }
        </div> 
        <div>
            <h3 className="todo-title text-lg font-semibold text-gray-700">
            {todo.title}
            </h3>
            <div className="mt-4">
                <p className="text-justify text-lg text-black-500">
                <span className="todo-text">
                    {todo.text}
                </span>
                </p>
                <p className="mt-4 text-sm text-gray-500">
                <span className="font-bold">Data do Afazer: </span>
                <span className="todo-date">
                    {formatDate(todo.date)}
                </span>
                </p>
                <p className="mt-4 text-sm text-gray-500">
                <span className="font-bold">Criado em: </span>
                <span className="todo-created-at">{formatDate(todo.created_at)}</span>
                </p>
            </div>
            <div className="absolute bottom-4 right-4 inline-flex">
                <span className='mx-0.5'>
                    <RemoveModal todo={todo}/>
                </span>
                <span className='mx-0.5'>
                    <EditTodoModal todo={todo} />
                </span>
            </div>
        </div>
    </div>
    
    )
}