import React from 'react'
import styled, { withTheme } from 'styled-components'
import { humanize } from '../../Utils/Utils'
import useCanvas from './useCanvas'

const CanvasWrapper = styled('div')({
    boxSizing: 'border-box',
    margin: '21px 0',
    width: '100%',
    height: '350px',
    position: 'relative',
})

// temp: we'll get rid of this once we deal with real data
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']

function BarCanvas({ theme }) {
    const canvasWrapperRef = React.useRef(null)
    const [
        barCanvasPaint,
        clearBarCanvas,
        barCanvasW,
        barCanvasH,
        barCanvasContext,
    ] = useCanvas(canvasWrapperRef)
    const [dims, setDims] = React.useState({
        padding: 40,
        offset: 10,
    })

    const _drawLine = (ctx, p1, p2) => {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
    }

    const _drawCoordsPlane = React.useCallback(() => {
        barCanvasPaint((ctx) => {
            // set border colors
            ctx.strokeStyle = theme.colors['grey-1']
            ctx.lineWidth = dims.borderWidth
            // draw y axis
            _drawLine(
                ctx,
                { x: dims.left, y: dims.top },
                { x: dims.left, y: dims.bottom }
            )
            // draw x axis
            _drawLine(
                ctx,
                { x: dims.left, y: dims.bottom },
                { x: dims.right, y: dims.bottom }
            )
        })
    })

    const _drawYLegands = React.useCallback(() => {
        barCanvasPaint((ctx) => {
            // set colors
            ctx.fillStyle = theme.colors['grey-2']
            ctx.strokeStyle = theme.colors['grey-1']
            ctx.lineWidth = dims.borderWidth / 2
            ctx.font = '400 11px Roboto'
            ctx.textAlign = 'right'
            ctx.textBaseline = 'middle'

            // constant interval no matter what is the size of your data
            const interval = 5
            const intervalHeight = (dims.bottom - dims.padding) / interval

            for (let i = 1; i < interval; i++) {
                // draw y grid
                // y varies for each cycle, starting from bottom
                _drawLine(
                    ctx,
                    {
                        x: dims.left,
                        y: dims.bottom - intervalHeight * i,
                    },
                    {
                        x: dims.right,
                        y: dims.bottom - intervalHeight * i,
                    }
                )
                // draw y legands
                ctx.fillText(
                    humanize(Math.random() * 20000),
                    dims.left - dims.offset,
                    dims.bottom - intervalHeight * i
                )
            }
        })
    })

    const _drawXLegands = React.useCallback(() => {
        barCanvasPaint((ctx) => {
            ctx.fillStyle = theme.colors['grey-2']
            ctx.font = '400 11px Roboto'
            ctx.textAlign = 'center'

            months.forEach((point, index) => {
                ctx.fillText(
                    point,
                    dims.left +
                        dims.offset * 2 +
                        index * ((dims.canvasW - dims.padding) / months.length),
                    dims.bottom + dims.offset * 2
                )
            })
        })
    })

    const _drawBar = React.useCallback((p1, p2) => {
        barCanvasPaint((ctx) => {
            // set gradient color
            const grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            grd.addColorStop(0, theme.colors.blue)
            grd.addColorStop(1, theme.colors.teal)
            ctx.lineWidth = dims.barWidth
            ctx.lineCap = 'round'
            ctx.strokeStyle = grd
            // draw line
            _drawLine(ctx, p1, p2)
            // clear the rounding bottom
            ctx.clearRect(
                p2.x - ctx.lineWidth / 2,
                dims.bottom,
                ctx.lineWidth,
                ctx.lineWidth / 2
            )
        })
    })

    const _plotBar = React.useCallback(() => {
        months.forEach((point, index) => {
            const pointX =
                dims.left +
                dims.offset * 2 +
                index * ((dims.canvasW - dims.padding) / months.length)
            const p1 = {
                x: pointX,
                y: Math.random() * dims.canvasH - dims.padding,
            }
            const p2 = { x: pointX, y: dims.bottom }
            _drawBar(p1, p2)
        })
    })

    const render = React.useCallback(() => {
        clearBarCanvas()
        _drawCoordsPlane()
        _drawYLegands()
        _plotBar()
        _drawXLegands()
    })

    React.useEffect(() => {
        setDims({
            ...dims,
            canvasH: barCanvasH,
            canvasW: barCanvasW,
            left: dims.padding,
            right: barCanvasW - dims.padding,
            top: dims.padding,
            bottom: barCanvasH - dims.padding,
            borderWidth: 1,
            barWidth: 16,
        })
    }, [barCanvasW, barCanvasH])

    React.useEffect(() => {
        if (barCanvasContext) {
            render()
        }
    }, [barCanvasContext])
    return <CanvasWrapper ref={canvasWrapperRef} />
}

export default withTheme(BarCanvas)
