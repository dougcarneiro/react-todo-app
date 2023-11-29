import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';


export default function FilterDropdown({options, checkBoxChange}) {

    const [filterOptions, setOptions] = useState(options)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)};
        
    const handleClose = () => setOpen(false);
        
    const handleChange = (event) => {
        const {name, checked} = event.target
        setOptions((prevData) => ({
            ...prevData,
            [name]: checked
        }));
        
    }

    useEffect(() => {
        checkBoxChange(filterOptions)
    }, [filterOptions])
    

    return (
        <div>
            <button
                id="dropdown-item-checkbox"
                type="button"
                onClick={handleOpen}
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-violet-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-violet-600 transition-all text-sm"
                >
                <Icon icon="ion:filter" className="text-violet-600 text-xl"/>
                <span className="hidden lg:block">Filtros</span>
                <svg
                    className="w-2.5 h-2.5 text-violet-600"
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    />
                </svg>
            </button>
        <Modal
            open={open}
            onClose={handleClose}
            BackdropProps={{ invisible: true }}
        >
            <Box className="max-w-fit absolute top-16 right-1/4 my-4 md:left-1/4 lg:left-1/3">
            <div
                id="search-filter-checkbox"
                className=" z-[50] min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2"
                >
                <span className="block text-sm text-left m-2 italic font-semibold text-violet-400">
                    Por Status
                </span>
                <div className="relative flex items-start py-2 px-3 mx-4 rounded-md hover:bg-gray-100">
                    <div className="flex items-center h-5 mt-1">
                    <input
                        id="done"
                        name="done"
                        type="checkbox"
                        checked={filterOptions.done}
                        onChange={handleChange}
                        className="done-checkbox border-gray-200 rounded text-violet-600 focus:ring-violet-500"
                        aria-describedby="done-description"
                    />
                    </div>
                    <label htmlFor="done" className="ml-3.5">
                        <span className="block text-sm font-semibold text-violet-800">
                            Feitos
                        </span>
                        <span
                            id="done-description"
                            className="block text-sm text-violet-600"
                        >
                            Afazeres finalizados
                        </span>
                    </label>
                </div>
                <div className="relative flex items-start py-2 px-3 mx-4 rounded-md hover:bg-gray-100">
                    <div className="flex items-center h-5 mt-1">
                    <input
                        id="notDone"
                        name="notDone"
                        type="checkbox"
                        className="notDone-checkbox border-gray-200 rounded text-violet-600 focus:ring-violet-500"
                        aria-describedby="item-checkbox-description"
                        checked={filterOptions.notDone}
                        onChange={handleChange}
                    />
                    </div>
                    <label htmlFor="notDone" className="ml-3.5">
                    <span className="block text-sm font-semibold text-violet-800">
                        Não Feitos
                    </span>
                    <span
                        id="notDone-description"
                        className="block text-sm text-violet-600"
                    >
                        Afazeres pendentes
                    </span>
                    </label>
                </div>
                <span className="block text-sm text-left mt-4 m-2 italic font-semibold text-violet-400">
                    Por Prioridade
                </span>
                <div className="relative flex items-start py-2 px-3 mx-4 rounded-md hover:bg-gray-100">
                    <div className="flex items-center h-5 mt-1">
                    <input
                        id="high"
                        name="high"
                        type="checkbox"
                        className="high-checkbox border-gray-200 rounded text-violet-600 focus:ring-violet-500"
                        aria-describedby="high-description"
                        checked={filterOptions.high}
                        onChange={handleChange}
                    />
                    </div>
                    <label htmlFor="high" className="ml-3.5">
                    <span className="block text-sm font-semibold text-violet-800">
                        Prioridade Alta
                    </span>
                    <span
                        id="high-description"
                        className="block text-sm text-violet-600"
                    >
                        Afazeres de alta prioridade
                    </span>
                    </label>
                </div>
                <div className="relative flex items-start py-2 px-3 mx-4 rounded-md hover:bg-gray-100">
                    <div className="flex items-center h-5 mt-1">
                    <input
                        id="medium"
                        name="medium"
                        type="checkbox"
                        className="medium-checkbox border-gray-200 rounded text-violet-600 focus:ring-violet-500"
                        aria-describedby="medium-description"
                        checked={filterOptions.medium}
                        onChange={handleChange}
                    />
                    </div>
                    <label htmlFor="medium" className="ml-3.5">
                    <span className="block text-sm font-semibold text-violet-800">
                        Prioridade Média
                    </span>
                    <span
                        id="medium-description"
                        className="block text-sm text-violet-600"
                    >
                        Afazeres de média prioridade
                    </span>
                    </label>
                </div>
                <div className="relative flex items-start py-2 px-3 mx-4 rounded-md hover:bg-gray-100">
                    <div className="flex items-center h-5 mt-1">
                    <input
                        id="light"
                        name="light"
                        type="checkbox"
                        className="light-checkbox border-gray-200 rounded text-violet-600 focus:ring-violet-500"
                        aria-describedby="light-description"
                        checked={filterOptions.light}
                        onChange={handleChange}
                    />
                    </div>
                    <label htmlFor="light" className="ml-3.5">
                    <span className="block text-sm font-semibold text-violet-800">
                        Prioridade Baixa
                    </span>
                    <span
                        id="light-description"
                        className="block text-sm text-violet-600"
                    >
                        Afazeres de baixa prioridade
                    </span>
                    </label>
                </div>
                <div className="relative flex items-start py-2 px-3 mx-4 rounded-md hover:bg-gray-100">
                    <div className="flex items-center h-5 mt-1">
                    <input
                        id="normal"
                        name="normal"
                        type="checkbox"
                        className="normal-checkbox border-gray-200 rounded text-violet-600 focus:ring-violet-500"
                        checked={filterOptions.normal}
                        onChange={handleChange}
                    />
                    </div>
                    <label htmlFor="normal" className="ml-3.5">
                    <span className="block text-sm font-semibold text-violet-800">
                        Prioridade Normal
                    </span>
                    <span
                        id="normal-description"
                        className="block text-sm text-violet-600"
                    >
                        Afazeres de prioridade normal
                    </span>
                    </label>
                </div>
            </div>
            </Box>
        </Modal>
        </div>
    );
}