import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        calo: {
          brown: '#8B7355',
          orange: '#FF5722',
          darkgray: '#424242',
          navy: '#1A237E',
          beige: '#D4C4A8',
          lightgray: '#757575',
        }
      },
      backgroundImage: {
        'fabric-texture': "url('/textures/fabric.png')",
        'denim-texture': "url('/textures/denim.png')",
      },
    },
  },
  plugins: [],
};

export default config;
