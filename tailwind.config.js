export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grp: {
          crimson: {
            100: '#9792A4',
            200: '#834E4E',
            300: '#463338',
            400: '#BC7878'
          },
          emerald: {
            100: '#8DACA5',
            200: '#3F5750',
            300: '#235241',
            400: '#4DB3A1'
          },
          amber: {
            100: '#AE9D8B',
            200: '#6B5133',
            300: '#403018',
            400: '#BC8936'
          },
          sapphire: {
            100: '#8AA8D9',
            200: '#3B4E6C',
            300: '#33486B',
            400: '#8CB0FC'
          },
          orchid: {
            100: '#92859E',
            200: '#4C3A5A',
            300: '#413054',
            400: '#AB85D1'
          }
        },
        swiks: {
          100: "#D4D6D2",
          200: "#D0FF84",
          300: "#FFA184"
        },
        warn: {
          100: "#FFDCDC",
          400: "#FF8484",
          500: "#FF6464",
          800: "#6D3737"
        },
        liwr: {
          100: "#9FAFC9",
          200: "#828FA3",
          300: "#798496",
          400: "#717D91",
          500: "#566070",
          600: "#4A5161",
          700: "#343a4d",
          800: "#2B2E46",
          900: "#1A1E31",
        },
        perl: {
          100: "#DCF4FF",
          200: "#828FA3",
          300: "#303241",
          400: "#21232E",
          500: "#1B1C25",
          550: "#171821",
          600: "#13141C",
          700: "#101018",
          800: "#0B0C13",
        },
      },
      boxShadow: {
        "liwr-inset": "inset 0px 0px 8px 0px #566070",
        "liwr-focus": "0px 0px 4px 0px #2B2E46",
        "perl-inset": "inset 0px 0px 8px 0px #31343E", // 999FCB
        "perl-focus": "0px 0px 4px 0px #828FA3"
      },
      screens: {
        'h-sm': { 'raw': '(min-height: 500px)' },
        'h-md': { 'raw': '(min-height: 880px)' }
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        progress: 'progress 6s ease-in-out forwards',
      },
    },
  },
  safelist: [
    'row-span-1', 'row-span-2', 'row-span-3', 'row-span-4', 'row-span-5', 'row-span-6', 'row-span-7', 'row-span-8', 'row-span-9', 'row-span-10', 'row-span-11', 'row-span-12',
    'fill-grp-crimson-100', 'fill-grp-crimson-200', 'fill-grp-crimson-300', 'dark:fill-grp-crimson-300', 'fill-grp-crimson-400', 'dark:fill-grp-crimson-400',
    'fill-grp-emerald-100', 'fill-grp-emerald-200', 'fill-grp-emerald-300', 'dark:fill-grp-emerald-300', 'fill-grp-emerald-400', 'dark:fill-grp-emerald-400',
    'fill-grp-amber-100', 'fill-grp-amber-200', 'fill-grp-amber-300', 'dark:fill-grp-amber-300', 'fill-grp-amber-400', 'dark:fill-grp-amber-400',
    'fill-grp-sapphire-100', 'fill-grp-sapphire-200', 'fill-grp-sapphire-300', 'dark:fill-grp-sapphire-300', 'fill-grp-sapphire-400', 'dark:fill-grp-sapphire-400',
    'fill-grp-orchid-100', 'fill-grp-orchid-200', 'fill-grp-orchid-300', 'dark:fill-grp-orchid-300', 'fill-grp-orchid-400', 'dark:fill-grp-orchid-400',
    'bg-grp-crimson-100', 'bg-grp-crimson-200', 'bg-grp-crimson-300', 'dark:bg-grp-crimson-300', 'bg-grp-crimson-400', 'dark:bg-grp-crimson-400',
    'bg-grp-emerald-100', 'bg-grp-emerald-200', 'bg-grp-emerald-300', 'dark:bg-grp-emerald-300', 'bg-grp-emerald-400', 'dark:bg-grp-emerald-400',
    'bg-grp-amber-100', 'bg-grp-amber-200', 'bg-grp-amber-300', 'dark:bg-grp-amber-300', 'bg-grp-amber-400', 'dark:bg-grp-amber-400',
    'bg-grp-sapphire-100', 'bg-grp-sapphire-200', 'bg-grp-sapphire-300', 'dark:bg-grp-sapphire-300', 'bg-grp-sapphire-400', 'dark:bg-grp-sapphire-400',
    'bg-grp-orchid-100', 'bg-grp-orchid-200', 'bg-grp-orchid-300', 'dark:bg-grp-orchid-300', 'bg-grp-orchid-400', 'dark:bg-grp-orchid-400',
    'text-grp-crimson-100', 'text-grp-crimson-200', 'text-grp-crimson-300', 'dark:text-grp-crimson-300', 'text-grp-crimson-400', 'dark:text-grp-crimson-400',
    'text-grp-emerald-100', 'text-grp-emerald-200', 'text-grp-emerald-300', 'dark:text-grp-emerald-300', 'text-grp-emerald-400', 'dark:text-grp-emerald-400',
    'text-grp-amber-100', 'text-grp-amber-200', 'text-grp-amber-300', 'dark:text-grp-amber-300', 'text-grp-amber-400', 'dark:text-grp-amber-400',
    'text-grp-sapphire-100', 'text-grp-sapphire-200', 'text-grp-sapphire-300', 'dark:text-grp-sapphire-300', 'text-grp-sapphire-400', 'dark:text-grp-sapphire-400',
    'text-grp-orchid-100', 'text-grp-orchid-200', 'text-grp-orchid-300', 'dark:text-grp-orchid-300', 'text-grp-orchid-400', 'dark:text-grp-orchid-400',
    'fill-swiks-100/50', 'fill-swiks-200/50', 'fill-swiks-300/50',
    'from-grp-amber-100', 'from-grp-amber-200', 'from-grp-amber-300', 'dark:from-grp-amber-300', 'from-grp-amber-400', 'dark:from-grp-amber-400',
    'from-grp-crimson-100', 'from-grp-crimson-200', 'from-grp-crimson-300', 'dark:from-grp-crimson-300', 'from-grp-crimson-400', 'dark:from-grp-crimson-400',
    'from-grp-emerald-100', 'from-grp-emerald-200', 'from-grp-emerald-300', 'dark:from-grp-emerald-300', 'from-grp-emerald-400', 'dark:from-grp-emerald-400',
    'from-grp-sapphire-100', 'from-grp-sapphire-200', 'from-grp-sapphire-300', 'dark:from-grp-sapphire-300', 'from-grp-sapphire-400', 'dark:from-grp-sapphire-400',
    'from-grp-orchid-100', 'from-grp-orchid-200', 'from-grp-orchid-300', 'dark:from-grp-orchid-300', 'from-grp-orchid-400', 'dark:from-grp-orchid-400'
  ],  
  plugins: [
    // Plugin para los textos que sobresalen de su contenedor
    function ({ addUtilities }) {
      const newUtilities = {
        '.word-wrap': {
          'white-space': 'normal',
          'word-wrap': 'break-word',
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },

    // Plugin existente para manejar la autofill de los inputs
    function ({ addUtilities, theme }) {
      const colors = theme('colors');
      const newUtilities = {};

      Object.entries(colors).forEach(([colorName, colorValues]) => {
        if (typeof colorValues === 'object') {
          // Itera sobre cada tono de color
          Object.entries(colorValues).forEach(([shade, value]) => {
            newUtilities[`.autocomplete-${colorName}-${shade}`] = {
              '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & select:-webkit-autofill, & select:-webkit-autofill:hover, & select:-webkit-autofill:focus': {
                '-webkit-text-fill-color': value,
                '-webkit-box-shadow': `0 0 0 30px transparent inset`,
                'transition': 'background-color 5000s ease-in-out 0s',
              },
            };
            newUtilities[`.dark .autocomplete-${colorName}-${shade}`] = {
              '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & select:-webkit-autofill, & select:-webkit-autofill:hover, & select:-webkit-autofill:focus': {
                '-webkit-text-fill-color': value,
                '-webkit-box-shadow': `0 0 0 30px transparent inset`,
                'transition': 'background-color 5000s ease-in-out 0s',
              },
            };
          });
        } else {
          // Manejar colores que no son objetos (sin tonos)
          newUtilities[`.autocomplete-${colorName}`] = {
            '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & select:-webkit-autofill, & select:-webkit-autofill:hover, & select:-webkit-autofill:focus': {
              '-webkit-text-fill-color': colorValues,
              '-webkit-box-shadow': `0 0 0 30px transparent inset`,
              'transition': 'background-color 5000s ease-in-out 0s',
            },
          };
          newUtilities[`.dark .autocomplete-${colorName}`] = {
            '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & select:-webkit-autofill, & select:-webkit-autofill:hover, & select:-webkit-autofill:focus': {
              '-webkit-text-fill-color': colorValues,
              '-webkit-box-shadow': `0 0 0 30px transparent inset`,
              'transition': 'background-color 5000s ease-in-out 0s',
            },
          };
        }
      });

      addUtilities(newUtilities, ['responsive', 'hover']);
    },

    // Nuevo plugin para personalizar el scrollbar
    function ({ addUtilities, theme }) {
      const colors = theme('colors');
      const scrollbarUtilities = {};

      Object.entries(colors).forEach(([colorName, colorValues]) => {
        if (typeof colorValues === 'object') {
          // Iterar sobre cada tono de color
          Object.entries(colorValues).forEach(([shade, value]) => {
            scrollbarUtilities[`.scrollbar-${colorName}-${shade}`] = {
              '::-webkit-scrollbar': {
                width: '8px',
                height: '8px'
              },
              '::-webkit-scrollbar-track': {
                background: 'transparent'
              },
              '::-webkit-scrollbar-thumb': {
                background: value,
                borderRadius: '9999px'
              },
              '::-webkit-scrollbar-thumb:hover': {
                background: value
              },
            };
          });
        } else {
          // Manejar colores que no son objetos (sin tonos)
          scrollbarUtilities[`.scrollbar-${colorName}`] = {
            '::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '::-webkit-scrollbar-track': {
              background: 'transparent'
            },
            '::-webkit-scrollbar-thumb': {
              background: colorValues,
              borderRadius: '9999px'
            },
            '::-webkit-scrollbar-thumb:hover': {
              background: colorValues
            },
          };
        }
      });

      // Añadir clases específicas para quitar el scrollbar
      scrollbarUtilities['.scrollbar-none'] = {
        '::-webkit-scrollbar': {
          display: 'none'
        },
        '-ms-overflow-style': 'none', /* IE and Edge */
        'scrollbar-width': 'none' /* Firefox */
      };

      addUtilities(scrollbarUtilities, ['responsive', 'hover']);
    }
  ],
};
