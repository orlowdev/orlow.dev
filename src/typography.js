import Typography from 'typography'

export default new Typography({
	baseFontSize: '18px',
	baseLineHeight: 1.5,
	blockMarginBottom: 0.8,
	headerFontFamily: ['Montserrat', 'system'],
	headerColor: '#333',
	headerWeight: '900',
	bodyWeight: '300',
	bodyFontFamily: ['JetBrains Mono', 'system'],
	bodyColor: '#444',
	googleFonts: [
		{
			name: 'Montserrat',
			styles: ['900'],
		},
		{
			name: 'JetBrains Mono',
			styles: ['100', '300', '700'],
		},
	],
})
