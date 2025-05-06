export const config = {
    PATH_TO_EXCLUDE: {
        navbar: ["/login", "/register"],
        footer: ["/login", "/register"]
    },
    DEFAULT_PASSWORD_OPTIONS: {
        minLength: 8,
        number: true,
        lowerCase: true,
        upperCase: true,
        specialDigit: true,
    },
}