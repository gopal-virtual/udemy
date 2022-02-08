import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import theme from './theme'

import './font.css'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: '"Roboto", sans-serif'
    }
`

function Provider({ children, mode = 'light' }) {
    return (
        <ThemeProvider theme={{ colors: theme.colors[mode] }}>
            {children}
            <GlobalStyle />
        </ThemeProvider>
    )
}

export default Provider
