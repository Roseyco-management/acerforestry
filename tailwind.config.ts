import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // Acer Forestry Brand Colors
        primary: '#1B4332',
        secondary: '#2D6A4F',
        accent: '#52B788',
        charcoal: '#2B2D42',
        slate: '#8D99AE',
        light: '#EDF2F4',
        offwhite: '#FEFEFE',
        heather: '#7209B7',
        stone: '#6C757D',
      },
    },
  },
  plugins: [],
}
export default config
