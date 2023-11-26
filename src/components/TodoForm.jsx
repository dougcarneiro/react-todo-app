'use client';

import { Icon } from '@iconify/react';
import { useState } from 'react';

import React from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";


export function TodoForm({ children }) {
    return (
        <>
        <div className="bg-white rounded-lg p-4 relative max-w-md mx-auto mt-0 h-full">
            <h2 className='font-satisfy text-center text-5xl mb-7 font-bold text-violet-500'>{children}</h2>
            <div className="mb-5 flex justify-center mt-1">
            <form id="todo-form">
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
                    required=""
                    maxLength={50}
                    type="text"
                    id="title"
                    name="title"
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
                    required=""
                    maxLength={300}
                    id="text"
                    name="text"
                    rows={4}
                    className=" w-full block p-2.5 text-lg text-violet-900 bg-violet-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-violet-400"
                    placeholder="Descreva o seu afazer..."
                    defaultValue={""}
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

export function NewTodo({modalTitle}) {
  const [showModal, setShowModal] = useState(false);
  return (
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
                <TodoForm>{modalTitle}</TodoForm></TEModalBody>
        </div>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
      
    </div>
  );
}

export function EditTodo({modalTitle}) {
    const [showModal, setShowModal] = useState(false);
    return (
      <div>
        {/* <!-- Button trigger modal --> */}
        <TERipple rippleColor="white">
        <button
          type="button"
          className="text-gray-400 hover:text-gray-700 cursor-pointer"
            onClick={() => setShowModal(true)}
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
                  <TodoForm>{modalTitle}</TodoForm></TEModalBody>
          </div>
            </TEModalContent>
          </TEModalDialog>
        </TEModal>
        
      </div>
    );
  }