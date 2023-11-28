import { Icon } from "@iconify/react"


export default function ProfileButton() {
    return (
        <button
            id="profile-button"
            type="button"
            className="py-2 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-violet-600 md:py-3 md:px-4"
            data-hs-overlay="#hs-overlay-right"
        >
            <Icon 
                icon="iconamoon:profile-fill" 
                className="text-viole-200 text-2xl"/>
            <span className="hidden lg:block">Meu Perfil</span>
        </button>
    )
}