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
        "primary": "#f59e0b",       //orange
        "secondary": "#65a30d",    //
        "accent": "#facc15",
        "neutral": "#57534e",
        "base-100": "#f5f5f4",
        "info": "#0ea5e9",
        "success": "#0ea5e9",
        "warning": "#facc15",
        "error": "#da0009",
      },
    },
    /* {bumblebee
        mytheme: {
          "primary": "74953C",
          "secondary": "916132",
          "accent": "EECA8B",
          "neutral": "DAD4D2",
          "base-100": "F9F4F3",
          
        },
      },*/
    ],
  },

  plugins: [require("daisyui")],

}
