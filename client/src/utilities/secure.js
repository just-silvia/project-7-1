import { config } from "../config";

const {DEFAULT_PASSWORD_OPTIONS} = config;

/**
 * Validates a password and provides specific feedback on what requirements are not met
 * @param {string} password - The password to validate
 * @param {object} [options] - Validation options
 * @param {object} [options.minLength] - Minimum length of the password
 * @param {object} [options.number] - Whether the password should contain at least one number
 * @param {object} [options.lowerCase] - Whether the password should contain at least one lowercase letter
 * @param {object} [options.upperCase] - Whether the password should contain at least one uppercase letter
 * @param {object} [options.specialDigit] - Whether the password should contain at least one special character
 * @returns {{ isValid: boolean, errors: string[] }} Object containing validation status and feedback messages
 */
export const validatePassword = (password, options = DEFAULT_PASSWORD_OPTIONS) => {
    options = { ...DEFAULT_PASSWORD_OPTIONS, ...options };

    const result = {
        isValid: true,
        errors: [
            {active: false, label: "minLength", message: `Password must be at least ${options.minLength} characters long`},
            {active: false, label: "lowerCase", message: "Password must contain at least one lowercase letter"},
            {active: false, label: "upperCase", message: "Password must contain at least one uppercase letter"},
            {active: false, label: "number", message: "Password must contain at least one number"},
            {active: false, label: "specialDigit", message: "Password must contain at least one special character"},
        ]
    };

    const _setError = (label, active) => {
        const index = result.errors.findIndex((item) => item.label == label);
        if(index !== -1) result.errors[index].active = active;
    }

    // Check minimum length
    if (password.length < options.minLength) {
        result.isValid = false;
        _setError("minLength", true);
    }

    // Check for lowercase letter
    if (options.lowerCase && !/[a-z]/.test(password)) {
        result.isValid = false;
        _setError("lowerCase", true);
    }

    // Check for uppercase letter
    if (options.upperCase && !/[A-Z]/.test(password)) {
        result.isValid = false;
        _setError("upperCase", true);
    }

    // Check for numbers
    if (options.number && !/\d/.test(password)) {
        result.isValid = false;
        _setError("number", true);
    }
    
    // Check for special character
    if (options.specialDigit && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(password)) {
        result.isValid = false;
        _setError("specialDigit", true);
    }

    return result;
}