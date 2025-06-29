import { extendTheme } from '@chakra-ui/react';
import { Zen_Kaku_Gothic_New } from 'next/font/google';

const nextFont = Zen_Kaku_Gothic_New({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
});

const theme = extendTheme({
  fonts: {
    heading: nextFont.style.fontFamily,
    body: nextFont.style.fontFamily,
  },
  colors: {
    brand100: {
      100: '#0DD203', // green 100%
      200: '#005CFF', // blue 100%
      300: '#B4171E', // red 100%
      600: '#777777', // dark-gray 100%
      700: '#D4D4D4', // gray 100%
      800: '#ECECEC', // light-gray 100%
    },
    brand80: {
      100: 'rgba(13, 210, 3, 0.8)', // green 80%
      200: 'rgba(0, 92, 255, 0.8)', // blue 80%
      300: 'rgba(180, 23, 30, 0.8)', // red 80%
      400: 'rgba(255, 255, 255, 0.8)', // white 80%
      500: 'rgba(0, 0, 0, 0.8)', // black 80%
      600: 'rgba(119, 119, 119, 0.8)', // gray 80%
    },
  },
  textStyles: {
    normal: {
      xs: {
        fontSize: '0.625rem',
        fontWeight: 'normal',
        lineHeight: '0.75rem',
      },
      sm: {
        fontSize: '0.75rem',
        fontWeight: 'normal',
        lineHeight: '1rem',
      },
      md: {
        fontSize: '1rem',
        fontWeight: 'normal',
        lineHeight: '1.25rem',
      },
      lg: {
        fontSize: '1.25rem',
        fontWeight: 'normal',
        lineHeight: '1.5rem',
      },
      xl: {
        fontSize: '1.5rem',
        fontWeight: 'normal',
        lineHeight: '1.75rem',
      },
    },
    bold: {
      xs: {
        fontSize: '0.625rem',
        fontWeight: 'bold',
        lineHeight: '0.75rem',
      },
      sm: {
        fontSize: '0.75rem',
        fontWeight: 'bold',
        lineHeight: '1rem',
      },
      md: {
        fontSize: '1rem',
        fontWeight: 'bold',
        lineHeight: '1.25rem',
      },
      lg: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        lineHeight: '1.5rem',
      },
      xl: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        lineHeight: '1.75rem',
      },
    },
    strong: {
      xs: {
        fontSize: '0.6875rem',
        fontWeight: 'black',
        lineHeight: '1rem',
      },
      sm: {
        fontSize: '1.25rem',
        fontWeight: 'black',
        lineHeight: '1.5rem',
      },
      md: {
        fontSize: '1.5rem',
        fontWeight: 'black',
        lineHeight: '2rem',
      },
      lg: {
        fontSize: '1.875rem',
        fontWeight: 'black',
        lineHeight: '2.375rem',
      },
      xl: {
        fontSize: '2.25rem',
        fontWeight: 'black',
        lineHeight: '2.75rem',
      },
    },
    heading: {
      h6: {
        fontSize: '1rem',
        fontWeight: 'black',
        lineHeight: '1.25rem',
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 'black',
        lineHeight: '1.5rem',
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 'black',
        lineHeight: '1.875rem',
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 'black',
        lineHeight: '2.125rem',
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 'black',
        lineHeight: '2.75rem',
      },
      h1: {
        fontSize: '1.875rem',
        fontWeight: 'black',
        lineHeight: '2.25rem',
      },
    },
    shadows: {
      light5: {
        100: '0px 0px 5px rgba(13, 210, 3, 0.8)',
        200: '0px 0px 5px rgba(0, 92, 255, 0.8)',
        300: '0px 0px 5px rgba(180, 23, 30, 0.8)',
        400: '0px 0px 5px rgba(255, 255, 255, 0.8)',
      },
      light10: {
        100: '0px 0px 10px rgba(13, 210, 3, 0.8)',
        200: '0px 0px 10px rgba(0, 92, 255, 0.8)',
        300: '0px 0px 10px rgba(180, 23, 30, 0.8)',
        400: '0px 0px 10px rgba(255, 255, 255, 0.8)',
      },
    },
  },
  breakpoints: {
    base: '0px', // 0 - 1279px game-template(S)
    sm: '80em', // 1280px - 1439px game-template(S)
    md: '90em', // 1440px - 1919px game-template(M)
    lg: '120em', // 1920px - 2559px game-template(M)
    xl: '160em', // 2560px - ∞ game-template(L)
    '2xl': '160em',
  },
});

export default theme;
