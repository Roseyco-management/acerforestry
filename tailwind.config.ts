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
        // Premium Acer Forestry Brand Colors
        forest: {
          50: '#F0F7F4',
          100: '#D4EAE3',
          200: '#A3D5C4',
          300: '#7AC0A5',
          400: '#51AB86',
          500: '#28966F',
          600: '#0F5F3D', // Primary dark forest
          700: '#0D4A31',
          800: '#0A3425',
          900: '#081F1A',
        },
        slate: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#5A6C7D',
          700: '#495057',
          800: '#2C3E50', // Professional dark slate
          900: '#1A1A1A',
        },
        accent: {
          50: '#F1F8F5',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A', // Vibrant growth green
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        bronze: {
          50: '#FFFBF0',
          100: '#FFE8CC',
          200: '#FFD699',
          300: '#FFC466',
          400: '#FFB233',
          500: '#FFA500',
          600: '#B8860B', // Premium bronze/gold
          700: '#8B6508',
          800: '#5D4505',
          900: '#2F2203',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        tight: '1.2',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      boxShadow: {
        'forest-md': '0 4px 12px -2px rgba(15, 95, 61, 0.12)',
        'forest-lg': '0 10px 25px -5px rgba(15, 95, 61, 0.15)',
        'forest-xl': '0 20px 40px -8px rgba(15, 95, 61, 0.18)',
      },
      backgroundImage: {
        'gradient-forest': 'linear-gradient(135deg, #0F5F3D 0%, #28966F 100%)',
        'gradient-slate': 'linear-gradient(135deg, #2C3E50 0%, #5A6C7D 100%)',
        'gradient-accent': 'linear-gradient(135deg, #66BB6A 0%, #51AB86 100%)',
      },
    },
  },
  plugins: [],
}
export default config
