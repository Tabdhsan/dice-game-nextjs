module.exports = {
	mode: 'jit',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				funFont: ['Oleo Script Swash Caps', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
