'use client';

import React, { useState, useEffect } from 'react';
import { getLoggedUser, signUp, singIn } from '@/services/supabase/supabase';
import { signJWT } from '@/services/jwt';
import Storage from '@/services/storage';
import SingInUpConfirmButton from '@/components/signInUpConfirmButton';
import SingInUpButtonSpinner from '@/components/signInUpButtonSpinner';
import SingInUpDisabledButton from '@/components/signInUpDisabledButton';
import Spinner from '@/components/Spinner';
import ErrorFieldText from '@/components/ErrorFieldText';
import { Icon } from '@iconify/react';


export default function SignIn() {
    const [state, setState] = useState({
        showConfirmButton: true,
      });

    const defaultFieldBg = 'border-violet-200'

    const [showPassField, setShowPassField] = useState(true);
    const [showLoadingButton, setShowLoadingButton] = useState(false);
    const [showDisabledConfirm, setShowDisabledConfirm] = useState(false);
    const [errorFieldClass, setErrorFieldClass] = useState('border-violet-200')


    let [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    });

    const [user, setUser] = useState(null);
    const [fetchedUser, setFetchedUser] = useState(false);

    useEffect(() => {
    const fetchUser = async () => {
        try {
            const fetchUser = await getLoggedUser()
            if (fetchUser) {
                setUser(fetchUser)
                window.location.href = "/"
            }
            setFetchedUser(true)
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    fetchUser();
    }, [user]);

    async function handleSignUp() {
        setShowInvalidCredentialsAlert(false)
        setState({
            showBackButton: true,
            showSignUpButton: true,
            showName: true,
            showConfirmPass: true,
            showLogInButton: false,
        })
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    async function handleForgetPass() {
        setShowInvalidCredentialsAlert(false)
        setState({
            showBackButton: true,
            showLogInButton: false,
            showGoToSignInButton: false,
            showResetPassButton: true,
        })
        setShowPassField(false)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let error
        setShowInvalidCredentialsAlert(false)
        setState({
            showLogInButton: false,
            showSignInButton: false,
            showForgotPassButton: false,
        })
        setShowLoadingButton(true)
        const isSignUp = formData.name == '' ? false : true
        const isSignIn = formData.password != '' ? true : false
        if (isSignUp) {
           error = checkPasswordsDiff(formData.password, formData.confirmPassword)
           if (error) {
            return
           } else {
            const { user, error } = await signUp(formData)
            if (user) {
                setUser(user)
            } else {
                setErrorFieldClass('border-red-500 bg-red-100')
                setEmailErrorField(true)
                setShowLoadingButton(false)
                setShowDisabledConfirm(true)
                
                }
           }
        } else if (isSignIn) {
            const { data, error } = await singIn(formData.email, formData.password)
            if (!data) {
                setShowInvalidCredentialsAlert(true)
                setShowLoadingButton(false)
                setState({showLogInButton: false})
            } else {
                setUser(data)
            }
        } else {
            // TODO lógica de reenvio de senha
        }
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
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          confirmPassword: formData.confirmPassword.trim(),
          })
        )
      }

    async function generateToken(data) {
        const token = await signJWT(data)
        window.localStorage.setItem(`@todo-app:jwt`, token);
        window.location.href = "/"
    }

    return (
        <>  
         {state.showBackButton && (<button
            onClick={() => {
                setShowPassField(true)
                setState({
                    showForgotPassButton: true,
                    showSignUpButton: false,
                    showLogInButton: true,
                    showSignInButton: false,
                    showGoToSignInButton: true,
                    
                })
            }}
            type="button"
            className="absolute top-8 left-8 inline-flex py-2 px-2 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-violet-500 text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all text-sm md:py-3 md:px-4"
            >
            <Icon 
            icon="lets-icons:back"
            className="text-violet-200 text-2xl"/>
        </button>)}
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
       
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            
            <a href="/">
                <h1 className="text-center text-9xl mt-6 font-medium font-satisfy text-violet-800 drop-shadow-lg">
                Tásku
                </h1>
                <h2 className="text-center text-3xl mt-6 italic font-medium font-satisfy text-violet-600 drop-shadow-lg">
                A melhor forma de organizar seus afazeres
                </h2>
            </a>
            </div>

            {!fetchedUser && (
            <div className="mt-14 fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99]">
                    <Spinner/>
                </div>
            )}
            
            {fetchedUser && !user && (<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
               
                <div id="password-div">
                    {showPassField && (
                    <>
                    <div className="flex items-center justify-between">
                        <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-violet-900"
                        >
                        Senha
                        </label>
                        {state.showForgotPassButton && (<div className="text-sm">
                        <a
                            href="#"
                            id="password-reset-button"
                            onClick={handleForgetPass}
                            className="font-semibold text-violet-600 hover:text-violet-500"
                        >
                            Esqueceu a senha?
                        </a>
                        </div>)}
                        
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
                    )}
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
                {showLoadingButton && (
                    <SingInUpButtonSpinner/>)}

                {state.showConfirmButton && (
                <SingInUpConfirmButton 
                    buttonTitle={'Confirmar'}/>
                )}
                {showDisabledConfirm && (
                    <SingInUpDisabledButton buttonTitle={'Confirmar'}/>)}
                </div>
            </form>
            </div>)}
        </div>
        </>
    )
}
