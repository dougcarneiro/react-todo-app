'use client';

import { useState, Fragment, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ProfileButton from './ProfileButton';
import { Icon } from '@iconify/react';
import { getTodosCountByProfileId, logOut } from '@/services/supabase/supabase';
import { formatDate } from '@/lib/format';
import Spinner from './Spinner';


export default function Profile({profile}) {

    const userName = profile.name.toLowerCase().split(' ').map((x) => x[0].toUpperCase() + x.slice(1)).join(' ')
    const userFirstName = userName.split(' ')[0]

    const [createdTodos, setCreatedTodos] = useState(null)
    const [completedTodos, setCompletedTodos] = useState(null)
    const [unCompletedTodos, setUncompletedTodos] = useState(null)
    const [userCreatedAt, setUserCreatedAt] = useState(null)
    
    const [drawerState, setDrawerState] = useState(false);
    const [blurProfile, setBlurProfile] = useState('')
    const [showSpinner, setShowSpinner] = useState(true)

    const blurMd = 'blur-md'

    const fetchData = async () => {
        setShowSpinner(true)
        setBlurProfile(blurMd)
        const fetchCreatedTodos = await getTodosCountByProfileId(profile.id, [true, false], [true, false])
        const fetchCompletedTodos = await getTodosCountByProfileId(profile.id, [true])
        const fetchUncompletedTodos = await getTodosCountByProfileId(profile.id, [false])
        setCreatedTodos(fetchCreatedTodos)
        setCompletedTodos(fetchCompletedTodos)
        setUncompletedTodos(fetchUncompletedTodos)
        setUserCreatedAt(formatDate(profile.created_at))
        setBlurProfile('')
        setShowSpinner(false)
            
    }

    useEffect(() => {
        if (drawerState) {
            fetchData()
            
        }
    }, [drawerState])



    const toggleDrawer = (state) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setDrawerState(state);
    };

    const logoutUser = async () => {
        await logOut()
        window.location.href = '/auth/sign'
    }

    const list = () => (
        <Box
        role="presentation"
        sx={{width: 350}}
        onKeyDown={toggleDrawer(false)}
        >
            {showSpinner && (
                    <div className="flex justify-center items-center fixed top-1/2 right-24 transform -translate-x-1/4 -translate-y-1/4 z-[99]">
                        <Spinner/>
                    </div>
                )}
            <div
                className={`${blurProfile} font-montserrat bg-white`}
            >
            <div className="bg-white shadow rounded-lg border overflow-x-auto h-screen">
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-violet-700">
                    <h3 className="font-satisfy font-bold text-2xl text-violet-800 dark:text-white">
                        Meu Perfil
                    </h3>
                    <button
                        type="button"
                        onClick={toggleDrawer(false)}
                        className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-violet-800 hover:bg-violet-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-violet-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-violet-600"
                    >
                        <span className="sr-only">Close modal</span>
                        <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
                <div className="px-4 py-5 sm:px-6">
                    <h3
                    id="profile-user-first-name"
                    className="text-lg leading-6 font-medium text-violet-800"
                    >Perfil de {userFirstName}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-violet-500">
                    Apenas algumas informações sobre você.
                    </p>
                </div>
                <div className="border-t border-violet-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-violet-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-violet-500">
                            Nome Completo
                            </dt>
                            <dd
                            id="profile-user-name"
                            className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                            >{userName}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-violet-500">Email</dt>
                            <dd
                            id="profile-user-email"
                            className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                            >{profile.email}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-violet-500">
                            Total de Afazeres criados:
                            </dt>
                            <dd
                            id="profile-todo-count"
                            className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                            >{createdTodos}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-violet-500">
                            Total de Afazeres completos:
                            </dt>
                            <dd
                            id="profile-completed-count"
                            className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                            >{completedTodos}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-violet-500">
                            Total de Afazeres pendentes:
                            </dt>
                            <dd
                            id="profile-uncompleted-count"
                            className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                            >{unCompletedTodos}</dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-violet-500">
                            Membro desde:
                            </dt>
                            <dd
                            id="profile-created-at"
                            className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                            >{userCreatedAt}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        <div className="absolute bottom-8 -right-0 transform -translate-x-2/3 md:-right-9">
            <button
                id="logout-button"
                type="button"
                onClick={logoutUser}
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 disabled:pointer-events-none"
            >
                <Icon 
                    icon="mdi:logout"
                    className="text-xl text-violet-200"
                    rotate="180deg"
                />
                <span className="font-montserrat hidden md:block">Logout</span> 
            </button>
        </div>
        </div>
    </Box>
    );

    return (
        <div>
            <Fragment key={'right'}>
            <ProfileButton 
                    onClick={toggleDrawer(true)}>
                </ProfileButton>
            <Drawer
                anchor={'right'}
                open={drawerState}
                onClose={toggleDrawer(false)}
                BackdropProps={{
                    style: { backdropFilter: 'blur(4px)' },
                }}
            >
                {list('right')}
            </Drawer>
            </Fragment>
        </div>
    );
}