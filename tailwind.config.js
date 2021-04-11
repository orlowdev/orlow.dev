const colors = require('tailwindcss/colors')

module.exports = {
	purge: ['./src/**/*.js'],
	darkMode: 'media', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				rose: colors.rose,
				amber: colors.amber,
				orange: colors.orange,
			},
		},
	},
	variants: {
		extend: {
			textOpacity: ['dark'],
			backgroundColor: ['active'],
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
