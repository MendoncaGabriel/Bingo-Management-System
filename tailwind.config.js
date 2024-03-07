/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{ejs,js}"],
    theme: {
      extend: {
        colors: {
            verde: '#56A746',
            branco: "#FFFFFF",
            preto: "#000000",
            cinza: "#212121"

          },
      },
    },
    plugins: [],
  }