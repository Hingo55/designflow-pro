/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
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
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			'design4-primary': '#5F2762',
  			'design4-ink': '#0B1220',
  			'design4-bg': '#FFFFFF',
  			'design4-green': '#7FBB47',
  			'design4-gold': '#E5C823',
  			'design4-orange': '#EE7F24',
  			'design4-plum': '#5F2762',
  			'design4-purple': '#A02B93',
  			'design4-teal': '#024661',
  			'design4-neutral-700': '#334155',
  			'design4-neutral-500': '#64748B',
  			'design4-neutral-100': '#F1F5F9',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		maxWidth: {
  			'design4-container': '80rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
  			'spin-slow': {
  				from: {
  					transform: 'rotate(0deg)'
  				},
  				to: {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'gradient-shift': {
  				'0%': {
  					'background-position': '0% 50%'
  				},
  				'50%': {
  					'background-position': '100% 50%'
  				},
  				'100%': {
  					'background-position': '0% 50%'
  				}
  			},
  			'border-spin': {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			'pulse-glow': {
  				'0%, 100%': {
  					'box-shadow': '0 0 5px rgba(239, 127, 36, 0.5), 0 0 10px rgba(95, 39, 98, 0.3), 0 0 15px rgba(229, 200, 35, 0.2)'
  				},
  				'50%': {
  					'box-shadow': '0 0 10px rgba(239, 127, 36, 0.8), 0 0 20px rgba(95, 39, 98, 0.6), 0 0 30px rgba(229, 200, 35, 0.4)'
  				}
  			},
  			'border-chase': {
  				'0%': {
  					'background-position': '100% 50%'
  				},
  				'100%': {
  					'background-position': '-100% 50%'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'spin-slow': 'spin-slow 3s linear infinite',
  			'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
  			'border-spin': 'border-spin 3s linear infinite',
  			'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
  			'border-chase': 'border-chase 3s linear infinite'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}