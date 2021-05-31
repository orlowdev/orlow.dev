const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.js'],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				rose: colors.rose,
				amber: colors.amber,
				orange: colors.orange,
				warmGray: colors.warmGray,
			},
			typography(theme) {
				return {
					dark: {
						css: {
							color: theme('colors.warmGray.300'),
							'[class~="lead"]': { color: theme('colors.warmGray.400') },
							a: { color: theme('colors.warmGray.100') },
							strong: { color: theme('colors.warmGray.100') },
							'ul > li::before': { backgroundColor: theme('colors.warmGray.700') },
							hr: { borderColor: theme('colors.warmGray.800') },
							blockquote: {
								color: theme('colors.warmGray.100'),
								borderLeftColor: theme('colors.warmGray.800'),
							},
							h1: { color: theme('colors.warmGray.100') },
							h2: { color: theme('colors.warmGray.100') },
							h3: { color: theme('colors.warmGray.100') },
							h4: { color: theme('colors.warmGray.100') },
							code: { color: theme('colors.warmGray.100') },
							'a code': { color: theme('colors.warmGray.100') },
							pre: {
								color: theme('colors.warmGray.200'),
								backgroundColor: theme('colors.warmGray.800'),
							},
							thead: {
								color: theme('colors.warmGray.100'),
								borderBottomColor: theme('colors.warmGray.700'),
							},
							'tbody tr': { borderBottomColor: theme('colors.warmGray.800') },
						},
					},
				}
			},
		},
	},
	variants: {
		extend: {
			opacity: ['dark'],
			typography: ['dark'],
			textOpacity: ['dark'],
			backgroundColor: ['active'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
