import { formatDate } from "@/lib/format";
import Storage from "@/services/storage";

export async function generateStaticParams() {
    const todos = await Storage.read('todo');

    return todos.map((todo) => ({
        slug: todo.id,
      }));
}

async function getData(slug) {
    const todo = await Storage.read('todos', slug);
  
    return todo;
  }

export default async function Todo({ params: slug }) {
    const [title, text, priority, is_completed, date, created_at] = await getData(slug);

    return (
        <>
      <h1 className="text-center text-2xl my-12 font-bold">{title}</h1>
      <div className="w-64 m-auto">
        <p className="text-violet-600 flex justify-between p-1">
          <span className="investment-text">{text}</span>
        </p>
        <p className="text-violet-600 flex justify-between p-1">
          <span className="font-bold mr-1">Data:</span>
          <span className="investment-date">{formatDate(date)}</span>
        </p>
        <p className="text-violet-600 flex justify-between p-1">
          <span className="font-bold mr-1">Criado em:</span>
          <span className="investment-created-at">{created_at}</span>
        </p>
      </div>
    </>
    )
}