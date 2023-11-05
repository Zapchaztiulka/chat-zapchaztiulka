/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        tablet: '600px',
        desktop: '1200px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xxs: '10px',
      },
      colors: {
        mainColors: {
          staticBlack: 'rgba(0, 0, 0, 1)',
          staticWhite: 'rgba(255, 255, 255, 1)',
        },
        bgColors: {
          white: 'rgba(255, 255, 255, 1)',
          contrast: 'rgba(28, 31, 35, 1)',
          greyDark: 'rgba(46, 50, 56, 1)',
          greyLigth: 'rgba(249, 249, 249, 1)',
          brandDark: 'rgba(21, 112, 239, 1)',
          brandLight1: 'rgba(239, 248, 255, 1)',
          brandLight2: 'rgba(209, 233, 255, 1)',
          brandLight3: 'rgba(46, 144, 250, 1)',
          errorDark: 'rgba(254, 228, 226, 1)',
          errorLight: 'rgba(254, 243, 242, 1)',
          successDark: 'rgba(209, 250, 223, 1)',
          successLight: 'rgba(236, 253, 243, 1)',
          warningDark: 'rgba(254, 240, 199, 1)',
          warningLight: 'rgba(255, 250, 235, 1)',
          pressedGrey: 'rgba(209, 233, 255, 1)',
          pressedBlue: 'rgba(83, 177, 253, 1)',
          pressedDestructive: 'rgba(249, 112, 102, 1)',
          hover: 'rgba(255, 255, 255, 1)',
          hoverGrey: 'rgba(239, 248, 255, 1)',
          hoverBlue: 'rgba(24, 73, 169, 1)',
          hoverDestructive: 'rgba(145, 32, 24, 1)',
          defaultBlue: 'rgba(21, 112, 239, 1)',
          defaultDestructive: 'rgba(217, 45, 32, 1)',
          img: 'rgba(249, 249, 249, 1)',
          disable: 'rgba(249, 249, 249, 1)',
        },
        iconColors: {
          primary: 'rgba(46, 50, 56, 1)',
          secondary: 'rgba(136, 141, 146, 1)',
          contrast: 'rgba(255, 255, 255, 1)',
          brand: 'rgba(21, 112, 239, 1)',
          error: 'rgba(240, 68, 56, 1)',
          success: 'rgba(18, 183, 106, 1)',
          warning: 'rgba(247, 144, 9, 1)',
          disabled: 'rgba(167, 171, 176, 1)',
        },
        textColors: {
          primary: 'rgba(28, 31, 35, 1)',
          secondary: 'rgba(65, 70, 76, 1)',
          tertiary: 'rgba(107, 112, 117, 1)',
          contrast: 'rgba(255, 255, 255, 1)',
          brand: 'rgba(24, 73, 169, 1)',
          inputDefault: 'rgba(107, 112, 117, 1)',
          inputActive: 'rgba(28, 31, 35, 1)',
          error: 'rgba(217, 45, 32, 1)',
          success: 'rgba(3, 152, 85, 1)',
          warning: 'rgba(247, 144, 9, 1)',
          disabled: 'rgba(167, 171, 176, 1)',
        },
        borderColors: {
          default: 'rgba(198, 202, 205, 1)',
          defaultBlue: 'rgba(21, 112, 239, 1)',
          hover: 'rgba(167, 171, 176, 1)',
          hoverBlue: 'rgba(24, 73, 169, 1)',
          pressedBlue: 'rgba(83, 177, 253, 1)',
          active: 'rgba(23, 92, 211, 1)',
          error: 'rgba(249, 112, 102, 1)',
          success: 'rgba(50, 213, 131, 1)',
          disabled: 'rgba(230, 232, 234, 1)',
        },
      },
      spacing: {
        xs4: '2px',
        xs3: '4px',
        xs2: '8px',
        xs: '12px',
        s: '16px',
        sPlus: '20px',
        m: '24px',
        m1: '38px',
        m2: '32px',
        l: '40px',
        xl: '48px',
        xl2: '56px',
        xl3: '64px',
        xl4: '72px',
      },
      letterSpacing: {
        button: '-0.2px',
      },
      borderRadius: {
        zero: '0px',
        minimal: '4px',
        medium: '8px',
        medium2: '12px',
        medium3: '20px',
        large: '24px',
        large2: '32px',
      },
      dropShadow: {
        focusButton: '0px 0px 4px #2E90FA',
      },
    },
  },
  plugins: [],
};
