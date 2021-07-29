import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Theme } from './Theme'

function Provider({ children }) {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
}

export default Provider
