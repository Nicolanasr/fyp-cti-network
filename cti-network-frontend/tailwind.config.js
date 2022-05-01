module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    100: "#1f3954"
                },
                secondary: {
                    100: "#e91e63"
                }
            },
            fontSize: {
                'xss': '.6rem',
            }
        },
    },
    plugins: [],
}