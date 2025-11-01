// tailwind.config.js
export default {
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseLogo: {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.7))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 15px rgba(6,182,212,1))',
          },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        pulseLogo: 'pulseLogo 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
