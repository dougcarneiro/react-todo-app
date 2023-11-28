import "preline";

import ProfileButton from "./ProfileButton";

export default function Profile() {
    return (
    <>
        <div id="profile-drawer">
            <div
                id="hs-overlay-right"
                className="font-montserrat hs-overlay hs-overlay-open:translate-x-0 hidden overflow-y-auto translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full w-full z-[60] bg-white border-s dark:bg-violet-800 dark:border-violet-700 hidden"
                tabIndex={-1}
            >
                <div className="flex justify-between items-center py-3 px-4 border-b dark:border-violet-700">
                <h3 className="font-satisfy font-bold text-2xl text-violet-800 dark:text-white">
                    Meu Perfil
                </h3>
                <button
                    type="button"
                    className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-violet-800 hover:bg-violet-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-violet-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-violet-600"
                    data-hs-overlay="#hs-overlay-right"
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
                <div className="bg-white overflow-hidden shadow rounded-lg border">
                <div className="px-4 py-5 sm:px-6">
                    <h3
                    id="profile-user-first-name"
                    className="text-lg leading-6 font-medium text-violet-800"
                    ></h3>
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
                        ></dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-violet-500">Email</dt>
                        <dd
                        id="profile-user-email"
                        className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                        ></dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-violet-500">
                        Total de Afazeres criados:
                        </dt>
                        <dd
                        id="profile-todo-count"
                        className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                        ></dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-violet-500">
                        Total de Afazeres completos:
                        </dt>
                        <dd
                        id="profile-completed-count"
                        className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                        ></dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-violet-500">
                        Total de Afazeres pendentes:
                        </dt>
                        <dd
                        id="profile-uncompleted-count"
                        className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                        ></dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-violet-500">
                        Membro desde:
                        </dt>
                        <dd
                        id="profile-created-at"
                        className="mt-1 text-sm text-violet-800 sm:mt-0 sm:col-span-2"
                        ></dd>
                    </div>
                    </dl>
                </div>
                </div>
                <div className="m-5">
                <button
                    id="logout-button"
                    type="button"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-violet-500 text-white hover:bg-violet-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-violet-600"
                    data-hs-overlay="#hs-overlay-right"
                >
                    <span
                    className="iconify text-2xl text-violet-200"
                    data-icon="mdi:logout"
                    data-rotate="180deg"
                    />
                    Sair da minha conta
                </button>
                </div>
            </div>
        </div>
        <ProfileButton/>
    </>
    )
}