export default function SingInUpDisabledButton({buttonTitle}) {

    return (
    <button
        disabled={true}
        className="flex w-full justify-center rounded-md bg-violet-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm"
        >
        {buttonTitle}
    </button>)
}