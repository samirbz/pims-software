import { nextui } from "@nextui-org/react"
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 20px rgba(255, 0, 0, 0.8)", // Customize as needed
      },
    },
  },
  fontFamily: {
    inter: ["var(--font-inter)"],
    spaceGrotesk: ["var(--font-spaceGrotesk)"],
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
