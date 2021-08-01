import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Colors, Text as text, Effects as effects } from './Theme'

import './font.css'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: '"Roboto", sans-serif'
    }
`

function Provider({ children, mode = 'light' }) {
    return (
        <React.Fragment>
            <ThemeProvider theme={{ colors: Colors[mode], text, effects }}>
                {children}
            </ThemeProvider>
            <GlobalStyle />
        </React.Fragment>
    )
}

export default Provider
