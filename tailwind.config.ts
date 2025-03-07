/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
  			olive: {
  				'100': '#1a1805',
  				'200': '#34300b',
  				'300': '#4f4810',
  				'400': '#696116',
  				'500': '#83781b',
  				'600': '#beaf27',
  				'700': '#dbcd50',
  				'800': '#e7de8a',
  				'900': '#f3eec5',
  				DEFAULT: '#83781b'
  			},
  			olivine: {
  				'100': '#1e2613',
  				'200': '#3c4c26',
  				'300': '#5a7239',
  				'400': '#79984d',
  				'500': '#95b46a',
  				'600': '#aac388',
  				'700': '#bfd2a5',
  				'800': '#d5e1c3',
  				'900': '#eaf0e1',
  				DEFAULT: '#95b46a'
  			},
  			asparagus: {
  				'100': '#161d11',
  				'200': '#2d3a22',
  				'300': '#435733',
  				'400': '#597444',
  				'500': '#709255',
  				'600': '#8cac72',
  				'700': '#a9c195',
  				'800': '#c5d5b8',
  				'900': '#e2eadc',
  				DEFAULT: '#709255'
  			},
  			dark_moss_green: {
  				'100': '#0d1207',
  				'200': '#19230e',
  				'300': '#263515',
  				'400': '#32461c',
  				'500': '#3e5622',
  				'600': '#678f39',
  				'700': '#8ebd59',
  				'800': '#b4d390',
  				'900': '#d9e9c8',
  				DEFAULT: '#3e5622'
  			},
  			dark_green: {
  				'100': '#050804',
  				'200': '#091008',
  				'300': '#0e180d',
  				'400': '#122011',
  				'500': '#172815',
  				'600': '#396334',
  				'700': '#5b9e53',
  				'800': '#8fc189',
  				'900': '#c7e0c4',
  				DEFAULT: '#172815'
  			},
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
  		},
  		animation: {
  			'float-slow': 'float 8s ease-in-out infinite',
  			'float-medium': 'float 6s ease-in-out infinite',
  			'float-fast': 'float 4s ease-in-out infinite',
  		},
  		keyframes: {
  			float: {
  				'0%, 100%': { transform: 'translateY(0) rotate(0)' },
  				'50%': { transform: 'translateY(-20px) rotate(5deg)' },
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

