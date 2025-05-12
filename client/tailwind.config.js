/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', 
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#4281a4ff",
                secondary: "#0f192eff",
                light: "#f5f5f5ff",
                accent: "#50b99aff",
                dark: "#1f1f1fff"
            },
        }
    }
}