const plugin = require('tailwindcss/plugin')

module.exports = {
	theme: {
		extend: {
			screens: {
				'xs': '27.5rem', // 440px
				'sm': '40rem', // 640px
				'md': '48rem', // 768px
				'lg': '64rem', // 1024px
				'xl': '80rem', // 1280px
				'2xl': '90rem', // 1440px
				'print': {'raw': 'print'}, // => @media print { ... }
			},
			colors: {
				primary: '#2651D4'
			},
			spacing: {
				'1/2': '50%',
				'1/3': '33.333333%',
				'2/3': '66.666667%',
				'1/4': '25%',
				'2/4': '50%',
				'3/4': '75%',
				'1/5': '20%',
				'2/5': '40%',
				'3/5': '60%',
				'4/5': '80%',
				'1/6': '16.666667%',
				'2/6': '33.333333%',
				'3/6': '50%',
				'4/6': '66.666667%',
				'5/6': '83.333333%',
				'1/12': '8.333333%',
				'2/12': '16.666667%',
				'3/12': '25%',
				'4/12': '33.333333%',
				'5/12': '41.666667%',
				'6/12': '50%',
				'7/12': '58.333333%',
				'8/12': '66.666667%',
				'9/12': '75%',
				'9/16': '56.25%',
				'10/12': '83.333333%',
				'11/12': '91.666667%',
				'1/1': '100%',
				'60': '15rem',
			},
			width: {
				'7/8': '87.5%',
				'4/5': '80%',
				'3/4': '75%',
				'3/5': '60%',
				'1/2': '50%',
				'1/4': '25%',
				'1/5': '20%',
				'1/8': '12.5%',
				'60': '15rem',
				'72': '18rem',
				'80': '20rem',
				'88': '22rem',
				'96': '24rem',
				'104': '26rem',
				'112': '28rem',
				'120': '30rem',
				'128': '32rem'
			},
			minWidth: {
				'60': '15rem',
				'72': '18rem',
				'80': '20rem',
				'88': '22rem',
				'96': '24rem',
				'104': '26rem',
				'112': '28rem',
				'120': '30rem',
				'128': '32rem'
			},
			maxWidth: {
				'1/4': '25%',
				'1/2': '50%',
				'3/4': '75%',
				'16':	'4rem',
				'20':	'5rem',
				'24':	'6rem',
				'32':	'8rem',
				'40': '10rem',
				'48': '12rem',
				'56': '14rem',
				'60': '15rem',
				'64': '16rem',
				'72': '18rem',
				'80': '20rem',
				'88': '22rem',
				'96': '24rem',
				'104': '26rem',
				'112': '28rem',
				'120': '30rem',
				'128': '32rem',
				'3xl': '40rem',
				'4xl': '50rem', // 800px
				'5xl': '60rem', // 960px
				'6xl': '70rem', // 1120px
				'7xl': '80rem', // 1280px
				'8xl': '90rem',  // 1440px
				'screen': '100vw'
			},
			height: {
				'72': '18rem',
				'80': '20rem',
				'88': '22rem',
				'96': '24rem',
				'104': '26rem',
				'112': '28rem',
				'120': '30rem',
				'128': '32rem'
			},
			minHeight: {
				'1': '0.25rem',
				'2': '0.5rem',
				'3': '0.75rem',
				'4': '1rem',
				'5': '1.25rem',
				'6': '1.5rem',
				'8': '2rem',
				'10': '2.5rem',
				'12': '3rem',
				'16':	'4rem'
			},
			maxHeight: {
				'16':	'4rem',
				'20':	'5rem',
				'24':	'6rem',
				'32':	'8rem',
				'40': '10rem',
				'48': '12rem',
				'56': '14rem',
				'64': '16rem'
			}
		},
		inset: {
			'-20': '-5rem',
			'-10': '-2.5rem',
			'-8': '-2rem',
			'-6': '-1.5rem',
			'-4': '-1rem',
			'-3': '-0.75rem',
			'-2': '-0.5rem',
			'0': 0,
			auto: 'auto',
			'1/2': '50%',
			'1': '0.25rem',
			'2': '0.5rem',
			'3': '0.75rem',
			'4': '1rem',
			'5': '1.25rem',
			'6': '1.5rem',
			'8': '2rem',
			'10': '2.5rem',
			'12': '3rem',
			'16':	'4rem',
			'20':	'5rem',
			'24':	'6rem',
			'32':	'8rem',
			'40': '10rem',
			'48': '12rem',
			'56': '14rem',
			'64': '16rem',
			'72': '18rem',
			'80': '20rem',
			'88': '22rem',
			'96': '24rem',
			'104': '26rem',
			'112': '28rem',
			'120': '30rem',
			'128': '32rem'
		},
		typography: (theme) => ({
			DEFAULT: {
				css: {
					color: theme('colors.gray.600'),
					strong: {
						fontWeight: '700',
					},
					h1: {
						fontWeight: '400',
						fontSize: '1.875rem',
						color: theme('colors.gray.900'),
						marginBottom: '0.5rem'
					},
					h2: {
						fontWeight: '400',
					},
					p: {
						color: theme('colors.gray.600'),
						lineHeight: '1.75'
					}
				},
			},
			lg: {
				css: {
					h1: {
						fontSize: '2.25rem',
					}
				},
			},
		}),
	},
	variants: {
		extend: {
			width: ['hover', 'focus'],
			padding: ['hover', 'focus'],
			margin: ['hover', 'focus'],
			inset: ['hover', 'focus'],
			backgroundColor: ['active'],
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		plugin(function({ addBase, config }) {
			addBase({
				'h1': { fontSize: '2.25rem', lineHeight: '1.125' },
				'h2': { fontSize: '1.875rem', lineHeight: '1.25', color: config('theme.colors.gray.800') },
				'h3': { fontSize: '1.5rem' },
				'h4': { fontSize: '1.25rem', color: config('theme.colors.gray.800') },
				'h5': { fontSize: '1.125rem' },
				'h6': { fontSize: '1rem' }
			})
		})
	]
}
