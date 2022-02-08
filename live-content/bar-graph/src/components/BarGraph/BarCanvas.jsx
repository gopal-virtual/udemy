import React from 'react'
import styled from 'styled-components'

const CanvasWrapper = styled('div')({
    boxSizing: 'border-box',
    margin: '21px 0',
    width: '100%',
    height: '350px',
    position: 'relative',
    backgroundColor: '#ccc',
})

function BarCanvas() {
    return <CanvasWrapper />
}

export default BarCanvas
