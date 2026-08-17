/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        google: ['"Google Sans"', '"Google Sans Text"', 'Roboto', 'system-ui', 'sans-serif'],
        display: ['"Google Sans Display"', '"Google Sans"', 'Roboto', 'sans-serif'],
        clock: ['"Google Sans Flex"', '"Google Sans"', 'Roboto', 'sans-serif'],
      },
      colors: {
        monet: {
          primary: 'var(--md-primary)',
          onPrimary: 'var(--md-on-primary)',
          primaryContainer: 'var(--md-primary-container)',
          onPrimaryContainer: 'var(--md-on-primary-container)',
          secondary: 'var(--md-secondary)',
          onSecondary: 'var(--md-on-secondary)',
          secondaryContainer: 'var(--md-secondary-container)',
          onSecondaryContainer: 'var(--md-on-secondary-container)',
          tertiary: 'var(--md-tertiary)',
          surface: 'var(--md-surface)',
          onSurface: 'var(--md-on-surface)',
          surfaceVariant: 'var(--md-surface-variant)',
          onSurfaceVariant: 'var(--md-on-surface-variant)',
          outline: 'var(--md-outline)',
          outlineVariant: 'var(--md-outline-variant)',
          surfaceContainer: 'var(--md-surface-container)',
          surfaceContainerHigh: 'var(--md-surface-container-high)',
          surfaceContainerHighest: 'var(--md-surface-container-highest)',
          surfaceContainerLow: 'var(--md-surface-container-low)',
          surfaceContainerLowest: 'var(--md-surface-container-lowest)',
        },
      },
      borderRadius: {
        '3xl': '28px',
        '4xl': '36px',
      },
    },
  },
  plugins: [],
}
