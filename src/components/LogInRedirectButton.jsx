import { Icon } from '@iconify/react';

export default function LogInRedirectButton() {
    return (
       <>
        <a href="/auth/sign">
            <button
                id="login-button"
                type="button"
                className="py-2 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 disabled:pointer-events-none md:py-3 md:px-4"
            >
                <Icon icon="mdi:login" className="text-violet-200 text-2xl"/>
                <span className="hidden lg:block">Entrar</span>
            </button>
        </a>
        </> 
    )
}