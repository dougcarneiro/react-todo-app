import { useOnStatusChangeContext } from '@/app/hooks/OnStatusChangeContext';
import { useTodoContext } from '@/app/hooks/TodoContext';
import { useState, useEffect } from 'react';


export function ToggleSwitch() {
    const todo = useTodoContext()
    const onStatusChange = useOnStatusChangeContext()

    const [isChecked, setIsChecked] = useState(todo.is_completed ? todo.is_completed : false);
    
    useEffect(() => {
        setIsChecked(!!isChecked);
    }, [isChecked]);

    async function toggleStatus() {
        setIsChecked((prevChecked) => !prevChecked);
        onStatusChange(todo, !isChecked)
    }

    return (
        <div className="mb-5 w-full flex justify-end mt-1">
            <span className="mr-2 text-md font-semibold text-violet-900">Feito</span>
            <label className="todo-toggle-status relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                defaultValue={false}
                className="sr-only peer"
                checked={isChecked}
                onChange={toggleStatus}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
            </label>
        </div>
        )
    }

    

export default ToggleSwitch;