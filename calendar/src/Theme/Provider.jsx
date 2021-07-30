import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Theme } from './Theme'

import './font.css'

const GlobalStyle = createGlobalStyle`
    body {
        font-family: '"Roboto", sans-serif'
    }
`

function Provider({ children }) {
    return (
        <React.Fragment>
            <ThemeProvider theme={Theme}>{children}</ThemeProvider>
            <GlobalStyle />
        </React.Fragment>
    )
}

export default Provider
