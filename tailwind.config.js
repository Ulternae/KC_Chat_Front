export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
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
      }
    },
  },
  plugins: [
    // Plugin para los textos que sobresalen de su contenedor
    function({ addUtilities }) {
      const newUtilities = {
        '.word-wrap': {
          'white-space': 'normal',
          'word-wrap': 'break-word',
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
    
    // Plugin existente para manejar la autofill de los inputs
    function({ addUtilities, theme }) {
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
    function({ addUtilities, theme }) {
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
