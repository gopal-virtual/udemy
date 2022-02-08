// common tokens of colors/effects/visual properties
const colors = {
    teal: '#70DBD4',
    blue: '#5297FF',
    'teal-blue': 'linear-gradient(270deg, #70DBD4 0%, #5297FF 100%)',
    'red-pink': 'linear-gradient(180deg, #FF4A4A 0%, #FC5CFF 100%)',
}

const theme = {
    colors: {
        dark: {
            ...colors,
            'grey-1': '#7A7A7A',
            'grey-2': '#FDF9F3',
            foreground: '#FDF9F3',
            background: '#242424',
        },
        light: {
            ...colors,
            'grey-1': '#E2E2E2',
            'grey-2': '#7A7A7A',
            foreground: '#000000',
            background: '#FDF9F3',
        },
    },
}

export default theme
