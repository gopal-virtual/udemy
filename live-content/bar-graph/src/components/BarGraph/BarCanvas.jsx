import React from 'react'
import styled, { withTheme } from 'styled-components'
import { humanize, map } from '../../Utils/Utils'
import Tween from '../Tween/Tween'
import useCanvas from './useCanvas'
import useData from './useData'

const CanvasWrapper = styled('div')({
    boxSizing: 'border-box',
    margin: '21px 0',
    width: '100%',
    height: '350px',
    position: 'relative',
})

// temp: we'll get rid of this once we deal with real data
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']

function BarCanvas({ data, xKey, yKey, theme }) {
    const canvasWrapperRef = React.useRef(null)
    const [bgCanvasPaint, clearBgCanvas, bgCanvasW, bgCanvasH, bgCtx] =
        useCanvas(canvasWrapperRef)
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
    const { graphData, minY, maxY } = useData(data, xKey, yKey, dims)

    const _drawLine = (ctx, p1, p2) => {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
    }

    const _drawCoordsPlane = React.useCallback(() => {
        bgCanvasPaint((ctx) => {
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
        bgCanvasPaint((ctx) => {
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

                const yIntervalLegand = map(i, 0, interval, minY, maxY)
                const intervalYPoint = map(
                    i,
                    0,
                    interval,
                    dims.bottom,
                    dims.top
                )
                // draw y legands
                ctx.fillText(
                    humanize(yIntervalLegand),
                    dims.left - dims.offset / 2,
                    intervalYPoint
                )
            }
        })
    })

    const _drawXLegands = React.useCallback(() => {
        bgCanvasPaint((ctx) => {
            ctx.fillStyle = theme.colors['grey-2']
            ctx.font = '400 11px Roboto'
            ctx.textAlign = 'center'

            graphData.forEach((point, index) => {
                ctx.fillText(
                    point.xLegands,
                    point.x,
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

    const _animateBar = React.useCallback(() => {
        const tween = new Tween()
        graphData.forEach((point) => {
            const draw = (newVal) => {
                _drawBar(
                    { x: point.x, y: newVal },
                    { x: point.x, y: dims.bottom }
                )
            }
            tween.play(dims.bottom, point.y, 700, draw)
        })
    })

    const render = React.useCallback(() => {
        // draw bg
        clearBgCanvas()
        _drawCoordsPlane()
        _drawYLegands()
        _drawXLegands()

        // draw bar
        clearBarCanvas()
        // _plotBar()
        _animateBar()
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
        // only render if data is ready
        if (graphData.length) {
            render()
        }
    }, [graphData])

    return <CanvasWrapper ref={canvasWrapperRef} />
}

export default withTheme(BarCanvas)
