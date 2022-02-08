import React from 'react'
import styled from 'styled-components'
import useCanvas from './useCanvas'

const CanvasWrapper = styled('div')({
    boxSizing: 'border-box',
    margin: '21px 0',
    width: '100%',
    height: '350px',
    position: 'relative',
    backgroundColor: '#ccc',
})

function BarCanvas() {
    const canvasWrapperRef = React.useRef(null)
    const [barCanvasContext, clearBarCanvas, barCanvasW, barCanvasH] =
        useCanvas(canvasWrapperRef)

    const _drawCoordsPlane = React.useCallback(() => {
        barCanvasContext.beginPath()
        barCanvasContext.moveTo(0, 0)
        barCanvasContext.lineTo(100, 100)
        barCanvasContext.stroke()
    })

    const render = React.useCallback(() => {
        clearBarCanvas()
        _drawCoordsPlane()
    })

    React.useEffect(() => {
        if (barCanvasContext) {
            render()
        }
    }, [barCanvasContext])
    return <CanvasWrapper ref={canvasWrapperRef} />
}

export default BarCanvas
