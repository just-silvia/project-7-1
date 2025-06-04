export const config = {
    API_HOST: "http://localhost:3000/api",
    AUTH_HOST: "http://localhost:3000/auth",
    PATH_TO_EXCLUDE: {
        navbar: ["/login", "/register", "/forgot-password"],
        footer: ["/login", "/register", "/forgot-password"]
    },
    DEFAULT_PASSWORD_OPTIONS: {
        minLength: 8,
        number: true,
        lowerCase: true,
        upperCase: true,
        specialDigit: true,
    },
}