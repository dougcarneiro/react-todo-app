import { Icon } from '@iconify/react';
import { useState } from 'react';
import { TodoForm } from './TodoForm';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
} from "tw-elements-react";


export function EditTodoButton({ todo, editTodoClick, onSubmit}) {
    const [showModal, setShowModal] = useState(false);

    const handleEditTodoClick = () => {
      // Chame a função onClick passando o objeto todo
      editTodoClick(todo);
      setShowModal(true);
    };

    const handleSubmit = async () => {
      onSubmit()
      setShowModal(false)

    };

    return (
      <div>
        {/* <!-- Button trigger modal --> */}
        <TERipple rippleColor="white">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-700 cursor-pointer"
            onClick={handleEditTodoClick}
          >
          <Icon icon="tabler:pencil"/>
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
                  Tásku
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
                <TodoForm {...todo}
                  onCancel={() => setShowModal(false)}
                  formTitle={'Alterar Afazer'}
                  onSubmit={handleSubmit}
                  isCreating={false}
                  />
                </TEModalBody>
          </div>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    );
  }