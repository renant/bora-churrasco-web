/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: ({ theme }) => ({
        red: {
          css: {
            p: {
              color: theme('colors.white'),
            },
            '--tw-prose-headings': theme('colors.red[400]'),
            '--tw-prose-lead': theme('colors.red[700]'),
            '--tw-prose-links': theme('colors.red[500]'),
            '--tw-prose-bold': theme('colors.red[900]'),
            '--tw-prose-counters': theme('colors.red[600]'),
            '--tw-prose-bullets': theme('colors.red[400]'),
            '--tw-prose-hr': theme('colors.red[300]'),
            '--tw-prose-quotes': theme('colors.red[900]'),
            '--tw-prose-quote-borders': theme('colors.red[300]'),
            '--tw-prose-captions': theme('colors.red[700]'),
            '--tw-prose-code': theme('colors.red[900]'),
            '--tw-prose-pre-code': theme('colors.red[100]'),
            '--tw-prose-pre-bg': theme('colors.red[900]'),
            '--tw-prose-th-borders': theme('colors.red[300]'),
            '--tw-prose-td-borders': theme('colors.red[200]'),
            '--tw-prose-invert-body': theme('colors.red[200]'),
            '--tw-prose-invert-headings': theme('colors.red'),
            '--tw-prose-invert-lead': theme('colors.red[300]'),
            '--tw-prose-invert-links': theme('colors.red'),
            '--tw-prose-invert-bold': theme('colors.red'),
            '--tw-prose-invert-counters': theme('colors.red[400]'),
            '--tw-prose-invert-bullets': theme('colors.red[600]'),
            '--tw-prose-invert-hr': theme('colors.red[700]'),
            '--tw-prose-invert-quotes': theme('colors.red[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.red[700]'),
            '--tw-prose-invert-captions': theme('colors.red[400]'),
            '--tw-prose-invert-code': theme('colors.red'),
            '--tw-prose-invert-pre-code': theme('colors.red[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.red[600]'),
            '--tw-prose-invert-td-borders': theme('colors.red[700]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
