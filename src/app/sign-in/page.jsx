'use client';


import React, { useState, useEffect } from 'react';
import { signUp, singIn } from '@/services/supabase';
import { signJWT } from '@/services/jwt';
import Storage from '@/services/storage';
import SingInUpConfirmButton from '@/components/signInUpConfirmButton';
import SingInUpButtonSpinner from '@/components/signInUpButtonSpinner';
import SingInUpDisabledButton from '@/components/signInUpDisabledButton';
import Spinner from '@/components/Spinner';


export default function SignIn() {
    const [state, setState] = useState({
        showLogInButton: true,
        showForgotPassButton: true,
        showSignInButton: false,
        showName: false,
        showConfirmPass: false,
        showGoToSignInButton: true,
        
      });

      const [showInvalidCredentialsAlert, setShowInvalidCredentialsAlert] = useState(false)
      const [showLogInButton, setShowLoginButton] = useState(true);
      const [showSignUnButton, setShowSignUpButton] = useState(false);
      const [showLoadingButton, setShowLoadingButton] = useState(false);
      const [showDisabledConfirm, setShowDisabledConfirm] = useState(false);
      const [showDisableEnter, setShowDisableEnter] = useState(false);


      let [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });


    async function handleSignUp() {
        setShowInvalidCredentialsAlert(false)
        setShowLoginButton(false)
        setShowSignUpButton(true)
        setState((prevState) => {
            return Object.fromEntries(
              Object.entries(prevState).map(([key, value]) => [key, !value])
            );
        });
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    async function handleSubmit(event) {
        setShowInvalidCredentialsAlert(false)
        event.preventDefault()
        let error
        setShowLoginButton(false)
        setShowLoadingButton(true)
        const isSignUp = formData.name === '' ? false : true
        if (isSignUp) {
            // error = passwordsDiff()
        } 
        if (isSignUp) {
            const { data, error } = await signUp(formData)
            
            if (data) {
            } else {
                await generateToken(data)
            }
        } else {
            const { data, error } = await singIn(formData.email, formData.password)
            if (!data) {
                setShowInvalidCredentialsAlert(true)
                setShowLoadingButton(false)
                setShowLoginButton(true)
            } else {
                await generateToken(data)
            }
        }
    }

    async function generateToken(data) {
        const token = await signJWT(data)
        window.localStorage.setItem(`@todo-app:jwt`, token);
        window.location.href = "/"
    }

    const [user, setUser] = useState(null);
    const [fetchedUser, setFetchedUser] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchUser = await Storage.getUserByJWT()
                setUser(fetchUser)
                setFetchedUser(true)
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };
    
        fetchUser();
      }, []);

    if (fetchedUser && user) {
        window.location.href = "/"
    } else {
       return (
            <>  
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
                <div className="mx-auto my-14">
                        <Spinner size={'14'}/>
                    </div>
                )}
                
                {fetchedUser && !user && (<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                    {state.showName &&(<div id="name-div">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Nome
                    </label>
                        <div className="mt-2">
                            <input
                            id="name"
                            name="name"
                            type="name"
                            value={formData.value}
                            onChange={handleChange}
                            maxLength={150}
                            minLength={2}
                            autoComplete="name"
                            className="mt-1 mb-1 w-full py-2.5 px-4 block border text-violet-800 border-violet-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                        </div>
                    </div>)}
                    <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-violet-900"
                    >
                        Email
                    </label>
                    <div className="mt-2">
                        <input
                        required={true}
                        id="email"
                        name="email"
                        type="email"
                        value={formData.value}
                        onChange={handleChange}
                        autoComplete="email"
                        className="mt-1 mb-1 w-full py-2.5 px-4 block border text-violet-800 border-violet-200 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <p
                        id="email-error-msg"
                        className="hidden mt-0 text-left text-sm text-red-600"
                        >
                        Já existe um usuário cadastrado com esse email.
                        </p>
                    </div>
                    </div>
                    <div id="password-div">
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
                            value={formData.value}
                            onChange={handleChange}
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
                        {state.showConfirmPass && (<div className="mt-5">
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
                                value={formData.value}
                                onChange={handleChange}
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
                        </div>)}
                    </div>
                    {showInvalidCredentialsAlert && (
                    <div
                        id="invalid-credentials-alert"
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                        role="alert"
                        >
                        <strong className="font-bold px-1">Credenciais inválidas!</strong>
                        <span className="block sm:inline px-1">Se certifique que você informou os dados corretos.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg
                            className="fill-current h-6 w-6 text-red-500"
                            role="button"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            onClick={() => setShowInvalidCredentialsAlert(false)}
                            >
                            <title>Fechar</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                        </span>
                    </div>)}
                    <div id="sign-in-button-div" className="">
                   {showLoadingButton && (
                        <SingInUpButtonSpinner/>)}
                    {showLogInButton && (
                        <SingInUpConfirmButton 
                            buttonTitle={'Entrar'}/>
                        )}
                    {showDisableEnter && (
                        <SingInUpDisabledButton 
                            buttonTitle={'Entrar'}
                            />)}

                    {showSignUnButton && (
                    <SingInUpConfirmButton 
                        buttonTitle={'Confirmar'}/>
                    )}
                    {showDisabledConfirm && (
                        <SingInUpDisabledButton buttonTitle={'Confirmar'}/>)}
                    </div>
                </form>
                {state.showGoToSignInButton && (<div id="sign-up-div">
                    <p className="mt-10 text-center text-sm text-violet-600">
                    Primeira vez acessando?
                    <a
                        href="#"
                        id="sign-up-button"
                        className="font-semibold leading-6 text-violet-600 hover:text-violet-500"
                        onClick={handleSignUp}
                    > Faça o seu cadastro agora!
                    </a>
                    </p>
                </div>)}
                <p/>
                </div>)}
            </div>
            </>
        )
    }
}

