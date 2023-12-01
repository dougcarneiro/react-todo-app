'use client';

import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react';
import { getLoggedUser, getPassTokenById, resetPassword, updatePassToken } from '@/services/supabase/supabase';
import SingInUpConfirmButton from '@/components/signInUpConfirmButton';
import SingInUpButtonSpinner from '@/components/signInUpButtonSpinner';
import SingInUpDisabledButton from '@/components/signInUpDisabledButton';
import Spinner from '@/components/Spinner';
import ErrorFieldText from '@/components/ErrorFieldText';


export default function SignIn() {

    const defaultFieldBg = 'border-violet-200'

    const [state, setState] = useState({
        errorFieldClass: defaultFieldBg,
        showConfirmButton: true,
        showLoadingButton: false,
        showDisabledConfirm: false,
        
      });

    let [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    });

    const searchParams = useSearchParams()

    const [user, setUser] = useState(null);
    const [fetchedUser, setFetchedUser] = useState(false);
    
    useEffect(() => {
        
        const fetchUser = async () => {
            try {
                const fetchUser = await getLoggedUser()
                if (fetchUser) {
                    setUser(fetchUser)
                } else {
                    window.location.href = "/"
                }
                setFetchedUser(true)
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
    };
    fetchUser();
    }, [user]);

    useEffect(() => {
        if (searchParams.get('recoverPassToken')) {
        } else {
            window.location.href = "/"
        }
    }, [])


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setState({
            showConfirmButton: false,
            showLoadingButton: true,
        })

        const { data } = await getPassTokenById(searchParams.get('recoverPassToken'))
        if (data) {
            const newPassword = formData.password
            await resetPassword(newPassword)
            await updatePassToken(data)
        }
        window.location.href = "/"
    }

    function checkPasswordsDiff(password, confirmPassword) {
        let error = true
        if (!password || !password) {
            return error
        }
        if (password !== confirmPassword) {
            return error
        }
        error = false
        return error
    }

    function handleBlur() {
        setFormData(() => ({
          password: formData.password.trim(),
          confirmPassword: formData.confirmPassword.trim(),
          })
        )
      }

    return (
        <>  
        <div className="font-montserrat flex flex-col justify-center px-6 py-12 lg:px-8">
       
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h1 className="text-center text-9xl mt-6 font-medium font-satisfy text-violet-800 drop-shadow-lg">
                Tásku
                </h1>
                <h2 className="text-center text-3xl mt-6 italic font-medium font-satisfy text-violet-600 drop-shadow-lg">
                A melhor forma de organizar seus afazeres
                </h2>
            </div>

            {!fetchedUser && (
            <div className="mt-14 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99]">
                    <Spinner/>
                </div>
            )}
            
            {fetchedUser && user && (<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
               
                <div id="password-div">
                    <>
                    <div className="flex items-center justify-between">
                        <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-violet-900"
                        >
                        Senha
                        </label>
                        
                    </div>
                    <div className="mt-2">
                        <input
                        required={true}
                        id="password"
                        name="password"
                        maxLength={30}
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={() => {
                            handleBlur()
                        }}
                        autoComplete="current-password"
                        className="mt-1 mb-1 w-full py-1.5 px-4 block border text-violet-800 border-violet-200 rounded-md text-3xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <p
                        id="pass-length-error-msg"
                        className="hidden mt-0 text-left text-sm text-red-600"
                        >
                        A senha precisa ter ao menos seis caracteres.
                        </p>
    
                    </div>
                    </>
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-violet-900"
                            >
                            Confirme a senha
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                            required={true}
                            maxLength={30}
                            id="confirm-password"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="confirm-password"
                            className="mt-1 mb-1 w-full py-1.5 px-4 block border text-violet-800 border-violet-200 rounded-md text-3xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                            <p
                            id="pass-error-msg"
                            className="hidden mt-0 text-left text-sm text-red-600"
                            >
                            As senhas precisam ser iguais.
                            </p>
                        </div>
                    </div>
                </div>

                <div id="sign-in-button-div" className="">
                {state.showLoadingButton && (
                    <SingInUpButtonSpinner/>)}

                {state.showConfirmButton && (
                    <SingInUpConfirmButton 
                        buttonTitle={'Confirmar'}/>
                )}
                {state.showDisabledConfirm && (
                    <SingInUpDisabledButton buttonTitle={'Confirmar'}/>)}
                </div>
            </form>
            </div>)}
        </div>
        </>
    )
}
