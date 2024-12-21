import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		keyframes: {
  			bounceInertia: {
  				'0%, 100%': {
  					transform: 'translateY(0)',
  					animationTimingFunction: 'ease-in-out'
  				},
  				'50%': {
  					transform: 'translateY(-20px)',
  					animationTimingFunction: 'ease-out'
  				}
  			},
  			wave: {
  				'0%, 100%': {
  					clipPath: 'polygon(0% 45%, 16% 44%, 33% 50%, 54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)'
  				},
  				'50%': {
  					clipPath: 'polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
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
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'bounce-inertia': 'bounceInertia 1.5s infinite',
  			wave: 'wave 4s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		screens: {
  			xs: '512px'
  		},
  		fontFamily: {
  			gilroy: [
  				'var(--font-gilroy)'
  			],
  			dela: [
  				'var(--font-dela-gothic)'
  			]
  		},
  		fontWeight: {
  			heavy: '950'
  		},
  		fontSize: {
  			'2xs': [
  				'10px',
  				'12px'
  			],
  			'3xs': [
  				'8px',
  				'8px'
  			]
  		},
  		colors: {
  			'midnight-blue': 'hsl(var(--midnight-blue))',
  			'sunset-gold': 'hsl(var(--sunset-gold))',
  			'sunset-blush': 'hsl(var(--sunset-blush))',
  			'teal-blue': 'hsl(var(--teal-blue))',
  			'mist-blue': 'hsl(var(--mist-blue))',
  			'frost-blue': 'hsl(var(--frost-blue))',
  			'golden-haze': 'hsl(var(--golden-haze))',
  			'desert-gold': 'hsl(var(--desert-gold))',
  			'sage-green': 'hsl(var(--sage-green))',
  			'coral-blush': 'hsl(var(--coral-blush))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			border: 'hsl(var(--border))',
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
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
		typography,
		animate,
	],
} satisfies Config;
