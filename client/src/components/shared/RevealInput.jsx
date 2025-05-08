import { useState } from "react";

const RevealInput = ({ className, onInput, value, name, id, required, placeholder }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative flex items-center">
            <input type={isVisible ? "text" : "password"} className={`${className} pr-12`} onInput={onInput} value={value} name={name} id={id} required={required} placeholder={placeholder} />
            {
                isVisible ? 
                    <i className="fa-solid fa-eye-slash cursor-pointer absolute right-4 text-gray-400" onClick={() => setIsVisible(false)}></i> 
                    : 
                    <i className="fa-solid fa-eye cursor-pointer absolute right-4 text-gray-400" onClick={() => setIsVisible(true)}></i>
            }
        </div>
    )
}

export default RevealInput;