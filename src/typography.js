import Typography from 'typography'

export default new Typography({
	baseFontSize: '16px',
	baseLineHeight: 1.5,
	blockMarginBottom: 0.8,
	headerFontFamily: ['Montserrat', 'system'],
	headerColor: '#333',
	headerWeight: '900',
	bodyWeight: '400',
	bodyFontFamily: ['Open Sans', 'system'],
	bodyColor: '#444',
	googleFonts: [
		{
			name: 'Montserrat',
			styles: ['900'],
		},
		{
			name: 'JetBrains Mono',
			styles: ['300'],
		},
		{
			name: 'Open Sans',
			styles: ['100', '400', '700'],
		},
	],
})
