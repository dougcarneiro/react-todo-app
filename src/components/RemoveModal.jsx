import Todos from "@/lib/todos";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
  } from "tw-elements-react";

  
export function RemoveModal({todo, onRemove}) {

    const [showModal, setShowModal] = useState(false);

    const handleEditTodoClick = () => {
        // Chame a função onClick passando o objeto todo
        setShowModal(true);
      };

    const handleSubmit = async () => {
        await Todos.remove(todo)
        setShowModal(false)
        onRemove()
        
      };

   return(
   <div>
        {/* <!-- Button trigger modal --> */}
        <TERipple rippleColor="white">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-700 cursor-pointer"
          onClick={handleEditTodoClick}
          >
          <Icon icon="solar:trash-bin-minimalistic-broken"/>
        </button>
        </TERipple>

        {/* <!-- Modal --> */}
        <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
            <TEModalContent>
        <div className='bg-white font-montserrat border shadow-sm rounded-xl'>
            <TEModalHeader>
                {/* <!--Modal title--> */}
                <h5 className="text-xl text-violet-800 font-satisfy font-bold">
                Remover Afazer
                </h5>
                {/* <!--Close button--> */}
                <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
                    <div className="p-4 overflow-y-auto">
                        <p className="mt-1 text-violet-800">
                            Deseja remover o afazer 
                            <span className="todo-title font-extrabold"> {todo.title}? </span>
                        </p>
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                    <button
                        type="button"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-violet-700 shadow-sm align-middle hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-600 transition-all text-sm"
                        onClick={()=> setShowModal(false)}
                    >
                        Cancelar
                    </button>
                        <button
                        type="button"
                        className="remove-todo-btn py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-violet-500 text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-viole-500 focus:ring-offset-2 transition-all text-sm"
                        onClick={handleSubmit}
                    >
                        Confirmar
                    </button>
                </div>
            </TEModalBody>
        </div>
            </TEModalContent>
        </TEModalDialog>
        </TEModal>
    </div>
    );

}