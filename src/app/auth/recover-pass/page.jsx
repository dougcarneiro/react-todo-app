'use client';

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react';
import { getLoggedUser, checkToken, resetPassword, updatePassToken } from '@/services/supabase/supabase';
import SingInUpConfirmButton from '@/components/signInUpConfirmButton';
import SingInUpButtonSpinner from '@/components/signInUpButtonSpinner';
import SingInUpDisabledButton from '@/components/signInUpDisabledButton';
import Spinner from '@/components/Spinner';
import ErrorFieldText from '@/components/ErrorFieldText';


export default function RecoverPassForm() {
    
    const defaultFieldStyle = 'border-violet-200'
    const defaultFieldErrorStyle = 'border-red-500 bg-red-100'

    const [passStyle, setPassStyle] = useState(defaultFieldStyle)
    const [confirmPassStyle, setConfirmPassStyle] = useState(defaultFieldStyle)
    const [passLengthErrorField, setPassLengthErrorField] = useState(false)
    const [passDiffErrorField, setPassDiffErrorField] = useState(false)

    const [showConfirmButton, setShowConfirmButton] = useState(true)
    const [showLoadingButton, setShowLoadingButton] = useState(false)
    const [showDisabledConfirm, setShowDisabledConfirm] = useState(false)

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
        setShowConfirmButton(false)
        setShowLoadingButton(true)

        const { data } = await checkToken(searchParams.get('recoverPassToken'),
                                          user.profile)
        if (data) {
            const newPassword = formData.password
            await resetPassword(newPassword)
            await updatePassToken(data)
        }
        window.location.href = "/"
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
            setShowConfirmButton(false)
            setShowDisabledConfirm(true)
        }
    }

    function checkPasswordLength(password) {
        if (password) {
            if (password.length < 6) {
                setPassLengthErrorField(true)
                setPassStyle(defaultFieldErrorStyle)
                setShowConfirmButton(false)
                setShowDisabledConfirm(true)
            }
        }
    }

    function handleBlur() {
        setFormData(() => ({
          password: formData.password.trim(),
          confirmPassword: formData.confirmPassword.trim(),
            }))
        checkPasswordLength(formData.password)
        checkPasswordsDiff(formData.password, formData.confirmPassword)
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
                        onFocus={() => {
                            if (passLengthErrorField) {
                                setShowDisabledConfirm(false)
                                setShowConfirmButton(true)
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
                            onFocus={() => {
                                setPassDiffErrorField(false)
                                setConfirmPassStyle(defaultFieldStyle)
                                if (!passLengthErrorField) {
                                    setShowConfirmButton(true)
                                    setShowDisabledConfirm(false)
                                }
                            }}
                            autoComplete="confirm-password"
                            className={`mt-1 mb-1 w-full py-1.5 px-4 block border text-violet-800 ${confirmPassStyle} rounded-md text-3xl focus:outline-none focus:ring-2 focus:ring-violet-500`}
                            />
                            {passDiffErrorField && (
                            <ErrorFieldText text={'As senhas precisam ser iguais.'}/>)}
                        </div>
                    </div>
                </div>

                <div id="sign-in-button-div" className="">
                {showLoadingButton && (
                    <SingInUpButtonSpinner/>)}

                {showConfirmButton && (
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
