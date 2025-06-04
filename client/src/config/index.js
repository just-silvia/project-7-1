export const config = {
    API_HOST: "/api",
    AUTH_HOST: "/auth",
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