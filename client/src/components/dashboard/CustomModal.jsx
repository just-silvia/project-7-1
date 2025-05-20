const CustomModal = ({ children, isOpen, setIsOpen }) => {
    return (
        <div className={`${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} absolute transition-all top-0 left-0 bg-black/60 h-screen w-screen z-50`}>
            <div className="flex justify-center items-center py-10 px-4 h-full w-full">
                <div className="w-full relative max-w-2xl bg-white shadow-md rounded-xl p-6">
                    <i className="fa-solid fa-xmark absolute top-4 right-4 cursor-pointer" onClick={() => setIsOpen(false)}></i>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CustomModal;