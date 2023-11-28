import { useOnTodoAddedContext } from '@/app/hooks/OnTodoAddedContext';
import { useOnTodoEditeContext } from '@/app/hooks/OnTodoEditedContext';
import { formatDate } from '@/lib/format';
import Todos from '@/lib/todos';
import { useState } from 'react';


export function TodoForm(
  { id, 
    title, 
    text, 
    priority, 
    date, 
    created_at, 
    formTitle, 
    isCreating, 
    onCreate, 
    onEdit }) {

  const onTodoAdded = useOnTodoAddedContext()

  const onTodoEdited = useOnTodoEditeContext()

  const [formData, setFormData] = useState({
    title: title || '',
    text: text || '',
    priority: priority || 'normal',
    date: date || new Date().toISOString(),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function handleBlur() {
    setFormData((prevData) => ({
      ...prevData,
      title: formData.title.trim(),
      text: formData.text.trim(),
      })
    )
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      ...formData,
      created_at: created_at,
      is_completed: false,
    }

    if (id) {
      todo.id = id
    }


    if (!todo.created_at) {
      todo.created_at = new Date().toISOString()
    }

    try {
      await Todos.update(todo, isCreating);
  
    } catch (error) {
      console.error('Erro durante a execução assíncrona:', error);
    }

    if (onTodoEdited) {
      onEdit()
      onTodoEdited()
    }      

    if (onTodoAdded) {
      onCreate()
      onTodoAdded();
      setFormData({
        title: '',
        text: '',
        priority: 'normal',
        date: new Date().toISOString(),
      });    
    }
  };

    return (
        <>
        <div className="bg-white rounded-lg p-4 relative max-w-md mx-auto mt-0 h-full">
            <h2 className='font-satisfy text-center text-5xl mb-7 font-bold text-violet-500'>{formTitle}</h2>
            <div className="mb-5 flex justify-center mt-1">
            <form id="todo-form" onSubmit={handleSubmit}>
                <input 
                    type="hidden" 
                    id="id" 
                    name="id" />
                <div>
                <label
                    htmlFor="title"
                    className="w-full block text-md font-medium text-violet-800"
                >
                    Título
                </label>
                <input
                    required={true}
                    maxLength={50}
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 mb-1 w-full py-3 px-4 block border text-violet-800 border-violet-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                </div>
                <div className="mt-4">
                <label
                    htmlFor="text"
                    className="mt-4 mb-1 w-full block text-md font-medium text-violet-800"
                >
                    Texto
                </label>
                <textarea
                    required={true}
                    maxLength={300}
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    className=" w-full block p-2.5 text-lg text-violet-900 bg-violet-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-violet-400"
                    placeholder="Descreva o seu afazer..."
                />
                </div>
                <div>
                <label
                    htmlFor="priority"
                    className="mt-4 mb-1 w-full block text-md font-medium text-violet-800"
                >
                    Prioridade
                </label>
                <select
                    name="priority"
                    id="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="text-violet-800 w-full py-2 px-4 border border-gray-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                    <option value="normal">Normal</option>
                    <option value="light">Leve</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                </select>
                </div>
                <div className="mb-3">
                <label
                    htmlFor="date"
                    className="mt-4 mb-1 block text-md font-medium text-violet-800"
                >
                    Data
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formatDate(formData.date, 'ymd')}
                    onChange={handleChange}
                    className="text-violet-800 py-3 px-4 block w-full border border-violet-200 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-violet-500 "
                />
                </div>
                <div>
                <button
                    type="submit"
                    className="submit-button mt-4 py-3 px-4 inline-flex w-full justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-violet-500 text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all text-md"
                >
                    Enviar
                </button>
                </div>
            </form>
            </div>
        </div>
        </>
    )
}
