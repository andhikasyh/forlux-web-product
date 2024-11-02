/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forlux: {
          orange: {
            primary: '#F2C734',
            secondary: '#EF6D21',
            accent: '#E41018'
          },
          green: {
            primary: '#25E0A1',
            secondary: '#61D828',
            accent: '#EDD22F'
          }
        },
        'deep-black': '#0F172A',
        'dark-navy': '#1E293B',
        'slate-700': '#334155',
        'slate-800': '#1E293B',
        'slate-900': '#0F172A'
      },
      animation: {
        'aurora': 'aurora 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'scale': 'scale 0.2s ease-in-out',
        'fade': 'fade 0.2s ease-in-out',
        'spin-slow': 'spin 6s linear infinite',
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      backgroundImage: {
        'forlux-orange-gradient': 'linear-gradient(45deg, #F2C734, #EF6D21, #E41018)',
        'forlux-green-gradient': 'linear-gradient(45deg, #25E0A1, #61D828, #EDD22F)',
        'dark-gradient': 'linear-gradient(to bottom, #0F172A, #1E293B)',
        'glow-gradient': 'radial-gradient(circle at center, rgba(242, 199, 52, 0.15) 0%, transparent 70%)',
      }
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ],
}