const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-hover': '#c62e35',
  			background: 'hsl(var(--background))',
  			surface: '#ffffff',
  			border: 'hsl(var(--border))',
  			'text-primary': '#1f2937',
  			'text-secondary': '#6b7280',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			soft: '0px 4px 10px rgba(0, 0, 0, 0.08)',
  			medium: '0px 6px 14px rgba(0, 0, 0, 0.1)',
  			strong: '0px 10px 24px rgba(0, 0, 0, 0.15)',
  			'inner-soft': 'inset 0px 1px 2px rgba(0, 0, 0, 0.05)'
  		},
  		borderRadius: {
  			DEFAULT: '12px',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)',
  			xl: '24px',
  			'2xl': '32px',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					color: '#1f2937',
  					h1: {
  						color: '#e4343c',
  						fontWeight: '700'
  					},
  					h2: {
  						color: '#c62e35',
  						fontWeight: '600'
  					},
  					h3: {
  						color: '#ff5a63',
  						fontWeight: '600'
  					},
  					p: {
  						color: '#1f2937',
  						lineHeight: '1.6'
  					},
  					a: {
  						color: '#e4343c',
  						fontWeight: '500',
  						textDecoration: 'underline'
  					}
  				}
  			}
  		},
  		backdropBlur: {
  			sm: '4px',
  			md: '8px',
  			lg: '12px',
  			xl: '20px'
  		}
  	}
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};