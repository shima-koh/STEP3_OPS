/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: { 
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "BA5809",
          "secondary": "9FA194",
          "accent": "16354D",
          "neutral": "443927",
          "base-100": "F7F7EC",
          
        },
      },
    ],
  },

  plugins: [require("daisyui")],

}
