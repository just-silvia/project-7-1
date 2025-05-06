import { useEffect, useState } from "react";
import { validatePassword } from "../../utilities/secure";
import RevealInput from "./RevealInput";

const RevealValidatePassword = ({value, name, placeholder, onInput, required, inputClassName, errorsClassName}) => {
    const [validationErrors, setValidationErrors] = useState({
        isValid: true,
        errors: []
    });

    useEffect(() => {
        const validation = validatePassword(value);

        setValidationErrors(validation);

    }, [value]);

    return (
        <>
            <RevealInput
                name={name}
                placeholder={placeholder}
                value={value}
                onInput={onInput}
                required={required}
                className={inputClassName}
            />
            <div className={errorsClassName}>
                {
                    validationErrors.errors.map(error => (
                        <span key={error.label} className={`${error.active ? "text-red-600" : "text-green-600"} text-sm flex gap-1 items-center`}>
                            {
                                error.active ? <i class="fa-solid fa-xmark text-red-600"></i> : <i class="fa-solid fa-check text-green-600"></i>
                            }
                            {error.message}
                        </span>
                    ))
                }
            </div>
        </>
    )
}

export default RevealValidatePassword;