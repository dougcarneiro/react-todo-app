import { useState } from "react";


export default function SearchBar({onSearch}) {

    const options = {title: null,
                           notDone: false,
                           done: false,
                           high: false,
                           medium: false,
                           light: false,
                           normal: false,
                           isSearching: true}

    const [searchString, setSearchString] = useState('')

    const handleSubmit = (e) => {
        options.title = searchString
        e.preventDefault()
        onSearch(options)

    }

    const handleChange = (e) => {
        setSearchString(e.target.value)
        handleSubmit(e)
    }
    return (
    <>
        <div
            className="flex items-center justify-center mx-4 w-auto md:mx-0">
                {/* dropdown */}
            <form
                id="search-bar"
                onSubmit={handleSubmit}
                className="ml-2 flex items-center justify-center w-fit md:mt-0 md:w-1/3"
            >
                <div className="relative w-full my-8">
                <div className=""></div>
                    <input
                        type="text"
                        id="searchInput"
                        className="bg-white border-none rounded-md text-violet-900 text-sm hover:outline-none hover:ring-2 hover:ring-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 block w-full pl-10 p-2.5 placeholder-violet-500 md:text-lg"
                        placeholder="Busque por um afazer..."
                        required={false}
                        value={searchString}
                        onChange={handleChange}
                        onBlur={() => setSearchString(searchString.trim())}
                    />
                </div>
                <button
                id="search-button"
                type="submit"
                className="p-2.5 ml-2 text-md font-medium rounded-full bg-violet-500 text-white hover:bg-violet-600 hover:outline-none hover:ring-2 hover:ring-violet-500 hover:ring-offset-2 transition-all text-md"
                >
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    </>

    )
}