'use client';

import { useState, useEffect } from 'react';
import { getLoggedUser, passwordRecovery, signUp, singIn } from '@/services/supabase/supabase';
import { signJWT } from '@/services/jwt';
import SingInUpConfirmButton from '@/components/signInUpConfirmButton';
import SingInUpButtonSpinner from '@/components/signInUpButtonSpinner';
import SingInUpDisabledButton from '@/components/signInUpDisabledButton';
import Spinner from '@/components/Spinner';
import ErrorFieldText from '@/components/ErrorFieldText';
import { Icon } from '@iconify/react';


export default function SignIn() {

    const defaultFieldStyle = 'border-violet-200'
    const defaultFieldErrorStyle = 'border-red-500 bg-red-100'

    const [showLogInButton, setShowLogInButton] = useState(true)
    const [showForgotPassButton, setShowForgotPassButton] = useState(true)
    const [showName, setShowName] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const [showGoToSignInButton, setShowGoToSignInButton] = useState(true)
    const [showSignUpButton, setShowSignUpButton] = useState(false)
    const [showResetPassButton, setShowResetPassButton] = useState(false)
    const [showBackButton, setShowBackButton] = useState(false)
    

    const [showInvalidCredentialsAlert, setShowInvalidCredentialsAlert] = useState(false)
    const [showSentResetPassAlert, setShowSentResetPassAlert] = useState(false)

    const [showPassField, setShowPassField] = useState(true);
    const [showLoadingButton, setShowLoadingButton] = useState(false);
    const [showDisabledConfirm, setShowDisabledConfirm] = useState(false);

    const [emailStyle, setEmailStyle] = useState(defaultFieldStyle)
    const [emailErrorField, setEmailErrorField] = useState(false)

    const [passStyle, setPassStyle] = useState(defaultFieldStyle)
    const [confirmPassStyle, setConfirmPassStyle] = useState(defaultFieldStyle)
    const [passLengthErrorField, setPassLengthErrorField] = useState(false)
    const [passDiffErrorField, setPassDiffErrorField] = useState(false)

    const [formData, setFormData] = useState(null);

    function clearFormData() {
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        })
    }

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

    useEffect(() => {
        clearFormData()
        if (!showBackButton) {
            setPassStyle(defaultFieldStyle)
            setConfirmPassStyle(defaultFieldStyle)
            setEmailStyle(defaultFieldStyle)
            setPassLengthErrorField(false)
            setEmailErrorField(false)
            setPassDiffErrorField(false)
            setShowLogInButton(true)
            setShowPassField(true)
            setShowGoToSignInButton(true)
            setShowForgotPassButton(true)
            setShowResetPassButton(false)
            setShowSentResetPassAlert(false)
            setShowSignUpButton(false)
            setShowBackButton(false)
            setShowConfirmPass(false)
            setShowName(false)
            setShowDisabledConfirm(false)
        }

    }, [showBackButton])

    async function handleSignUp() {
        setShowForgotPassButton(false)
        setShowGoToSignInButton(false)
        setShowInvalidCredentialsAlert(false)
        setShowBackButton(true)
        setShowSignUpButton(true)
        setShowName(true)
        setShowConfirmPass(true)
        setShowLogInButton(false)
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    async function handleForgetPass() {
        setShowResetPassButton(true)
        setShowInvalidCredentialsAlert(false)
        setShowBackButton(true)
        setShowLogInButton(false)
        setShowGoToSignInButton(false)
        setShowPassField(false)
    }

    async function handleSubmit(event) {
        let error
        event.preventDefault()
        setShowInvalidCredentialsAlert(false)
        setShowLoadingButton(true)
        const isSignUp = showSignUpButton ? true : false
        const isSignIn = showLogInButton ? true : false
        if (isSignUp) {
            setShowSignUpButton(false)
            const { created_user, error } = await signUp(formData)
            if (created_user) {
                setUser(created_user)
            } else {
                setEmailStyle(defaultFieldErrorStyle)
                setEmailErrorField(true)
                setShowLoadingButton(false)
                setShowDisabledConfirm(true)
                }
        } else if (isSignIn) {
            setShowLogInButton(false)
            const { data, error } = await singIn(formData.email, formData.password)
            if (!data) {
                setShowInvalidCredentialsAlert(true)
                setShowLoadingButton(false)
                setShowLogInButton(true)
                setShowGoToSignInButton(true)
                setShowForgotPassButton(true)
            } else {
                setUser(data)
            }
        } else {
            setShowResetPassButton(false)
            const email = formData.email
            try {
                await passwordRecovery(email)
            } catch (err) {
                // pass
            }
            setShowSentResetPassAlert(true)
            setShowLoadingButton(false)
            setShowBackButton(true)
        }
    }

    function checkPasswordsDiff(password, confirmPassword) {
        let error = false
        if (!confirmPassword || !password) {
            return
        }
        if (!password || !password) {
            error = true
        }
        if (password !== confirmPassword) {
            error = true
        }
        if (error) {
            setPassDiffErrorField(true)
            setConfirmPassStyle(defaultFieldErrorStyle)
            setShowSignUpButton(false)
            setShowDisabledConfirm(true)
        }
    }

    function checkPasswordLength(password) {
        if (password) {
            if (password.length < 6) {
                setPassLengthErrorField(true)
                setPassStyle(defaultFieldErrorStyle)
                setShowSignUpButton(false)
                setShowDisabledConfirm(true)
            }
        }
    }

    function handleBlur() {
        setFormData(() => ({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          confirmPassword: formData.confirmPassword.trim(),
          })
        )
        if (showSignUpButton) {
            checkPasswordLength(formData.password)
            checkPasswordsDiff(formData.password, formData.confirmPassword)
        }
      }

    async function generateToken(data) {
        const token = await signJWT(data)
        window.localStorage.setItem(`@todo-app:jwt`, token);
        window.location.href = "/"
        
    }

    return (
        <>  
         {showBackButton && (<button
            type="button"
            onClick={() => setShowBackButton(false)}
            className="absolute top-8 left-8 inline-flex py-2 px-2 justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-violet-500 text-white hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-all text-sm md:py-3 md:px-4"
            >
            <Icon 
            icon="lets-icons:back"
            className="text-violet-200 text-2xl"/>
        </button>)}
        <div className="font-montserrat flex flex-col justify-center px-6 py-12 lg:px-8">
       
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
                {showName &&(<div id="name-div">
                <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-violet-900"
                >
                    Nome
                </label>
                    <div className="mt-2">
                        <input
                        id="name"
                        name="name"
                        type="name"
                        required={true}
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={150}
                        minLength={2}
                        onBlur={handleBlur}
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
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={() => {
                            if (emailErrorField) {
                                setEmailStyle(defaultFieldStyle)
                                setShowDisabledConfirm(false)
                                setShowSignUpButton(true)
                                setEmailErrorField(false)}}
                            }
                        autoComplete="email"
                        className={`mt-1 mb-1 w-full py-2.5 px-4 block border text-violet-800 ${emailStyle} rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-violet-500`}
                        />
                        {
                            emailErrorField && (
                                <ErrorFieldText text={'Já existe um usuário cadastrado com esse email.'}/>
                            )
                        }
    
                    </div>
                </div>
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
                        {showForgotPassButton && (<div className="text-sm">
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
                        onFocus={() => {
                            if (passLengthErrorField) {
                                setShowDisabledConfirm(false)
                                setShowSignUpButton(true)
                                setPassStyle(defaultFieldStyle)
                                setPassLengthErrorField(false)
                            }
                        }}
                        autoComplete="current-password"
                        className={`mt-1 mb-1 w-full py-1.5 px-4 block border text-violet-800 ${passStyle} rounded-md text-3xl focus:outline-none focus:ring-2 focus:ring-violet-500`}
                        />
                            {passLengthErrorField && (
                            <ErrorFieldText text={'A senha precisa ter ao menos seis caracteres.'}/>)}

                    </div>
                    </>
                    )}
                    {showConfirmPass && (<div className="mt-5">
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
                            onFocus={() => {
                                setPassDiffErrorField(false)
                                setConfirmPassStyle(defaultFieldStyle)
                                if (!passLengthErrorField) {
                                    setShowSignUpButton(true)
                                    setShowDisabledConfirm(false)
                                }
                            }}
                            autoComplete="confirm-password"
                            className={`mt-1 mb-1 w-full py-1.5 px-4 block border text-violet-800 ${confirmPassStyle} rounded-md text-3xl focus:outline-none focus:ring-2 focus:ring-violet-500`}
                            />
                            {passDiffErrorField && (
                            <ErrorFieldText text={'As senhas precisam ser iguais.'}/>)}
                        </div>
                    </div>)}
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
                </div>
            {showSentResetPassAlert && (
                <div
                    id="sent-reset-pass-alert"
                    className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
                    role="alert"
                    >
                    <strong className="font-bold px-1">Solicitação feita!</strong>
                    <span className="block sm:inline px-1">Caso o endereço esteja cadastrado em nosso banco de dados, você receberá o email com as instruções.</span>
                </div>)}
                <div id="sign-in-button-div" className="">
                {showLoadingButton && (
                    <SingInUpButtonSpinner/>)}
                {showLogInButton && (
                    <SingInUpConfirmButton 
                        buttonTitle={'Entrar'}/>
                    )}
                {showSignUpButton && (
                <SingInUpConfirmButton 
                    buttonTitle={'Confirmar'}/>
                )}
                {showResetPassButton && (
                <SingInUpConfirmButton 
                    buttonTitle={'Solicitar recuperação de senha'}/>
                )}
                {showDisabledConfirm && (
                    <SingInUpDisabledButton buttonTitle={'Confirmar'}/>)}
                </div>
            </form>
            {showGoToSignInButton && (<div id="sign-up-div">
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
