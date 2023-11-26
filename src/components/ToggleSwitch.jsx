import { useState } from 'react';
import Todos from '@/lib/todos';


export function StatusToggle({is_completed, id}) {
    const [isChecked, setIsChecked] = useState(is_completed);

    async function toggleStatus() {
        const todo = await Todos.get(id)
        setIsChecked(!isChecked);
        todo.is_completed = !isChecked
        await Todos.update(todo)
    }

    return (
        
        <div className="mb-5 w-full flex justify-end mt-1">
            <span className="mr-2 text-md font-semibold text-violet-900">Feito</span>
            <label className="todo-toggle-status relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                defaultValue=""
                className="sr-only peer"
                checked={isChecked}
                onChange={toggleStatus}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
        </div>
        )
    }

    

export default StatusToggle;