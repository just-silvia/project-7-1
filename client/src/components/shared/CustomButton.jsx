

const CustomButton = ({ type = "default", children, onClick = () => {} }) => {
    
    const selectButtonVariant = () => {
        switch(type) {
            case "default":
                return "py-1 px-4 bg-primary text-light hover:opacity-85 transition-all cursor-pointer border-none rounded";
            case "inverse":
                return "py-1 px-4 bg-secondary text-light hover:opacity-85 transition-all cursor-pointer border-none rounded";
            default:
                return "py-1 px-4 bg-primary text-light hover:opacity-85 transition-all cursor-pointer border-none rounded";
        }
    }
    
    return(
        <button onClick={onClick} className={selectButtonVariant()}>
            {children}
        </button>
    )
}
export default CustomButton;