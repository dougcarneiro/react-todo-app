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


export function NewTodoButton() {
    const [showModal, setShowModal] = useState(false);

    return (
    <>
      <div>
        {/* <!-- Button trigger modal --> */}
        <TERipple rippleColor="white">
        <button
          type="button"
          className="new-todo-btn inline-flex py-2 px-2 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-violet-500 text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all text-sm md:py-3 md:px-4"
            onClick={() => setShowModal(true)}
          >
          <Icon icon="pajamas:todo-add" className="text-violet-200 text-xl"/>
          <span className="font-montserrat hidden lg:block">Novo Afazer</span> 
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
                  <TodoForm 
                    formTitle={'Novo Afazer'}
                    onCreate={() => setShowModal(false)}
                    isCreating={true}
                  />
                </TEModalBody>
          </div>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
      </div>
    </>
    );
  }