import React from 'react'
import styled, { withTheme } from 'styled-components'
import { humanize, map } from '../../Utils/Utils'
import useCanvas from '../../hooks/useCanvas'
import useData from './useData'
import Tween from '../Tween/Tween'

const CanvasWrapper = styled('div')({
    boxSizing: 'border-box',
    margin: '21px 0',
    width: '100%',
    height: '350px',
    position: 'relative',
})

const Opacity25 = '40'
const Opacity100 = 'FF'

function BarCanvas({ data, xKey, yKey, theme }) {
    const canvasWrapperRef = React.useRef(null)
    const [paintCanvas, clearCanvas, canvasW, canvasH] =
        useCanvas(canvasWrapperRef)
    const [paintBarCanvas, clearBarCanvas, barCanvasW, barCanvasH, barCtx] =
        useCanvas(canvasWrapperRef)
    const [dims, setDims] = React.useState({
        padding: 40,
        offset: 10,
    })
    const { graphData, minY, maxY } = useData(data, xKey, yKey, dims)

    React.useEffect(() => {
        setDims({
            ...dims,
            canvasH,
            canvasW,
            left: dims.padding,
            right: canvasW - dims.padding,
            top: dims.padding,
            bottom: canvasH - dims.padding,
            borderWidth: 1,
            barWidth: 14,
        })
    }, [canvasH, canvasW, barCanvasW, barCanvasH])

    const _drawLine = (p1, p2, context) => {
        context.beginPath()
        context.moveTo(p1.x, p1.y)
        context.lineTo(p2.x, p2.y)
        context.stroke()
    }

    const _drawYLegends = () => {
        paintCanvas((ctx) => {
            ctx.fillStyle = theme.colors['grey-2']
            ctx.strokeStyle = theme.colors['grey-1']
            ctx.lineWidth = dims.borderWidth / 2
            ctx.font = '300 10px Roboto'
            ctx.textAlign = 'right'
            ctx.textBaseline = 'middle'

            const interval = 5
            const intervalHeight = (dims.bottom - dims.padding) / interval
            for (let i = 1; i < interval; i++) {
                // draw y grid
                _drawLine(
                    { x: dims.left, y: dims.bottom - intervalHeight * i },
                    { x: dims.right, y: dims.bottom - intervalHeight * i },
                    ctx
                )

                // draw y Legends
                const pointY = map(i, 0, interval, dims.bottom, dims.top)
                const yLegend = map(i, 0, interval, minY, maxY, false)
                ctx.fillText(
                    humanize(yLegend),
                    dims.left - dims.offset / 2,
                    pointY
                )
            }
        })
    }

    const _drawCoordsPlane = () => {
        paintCanvas((ctx) => {
            ctx.strokeStyle = theme.colors['grey-1']
            ctx.lineWidth = dims.borderWidth
            // draw x axis
            _drawLine(
                { x: dims.left, y: dims.bottom },
                { x: dims.right, y: dims.bottom },
                ctx
            )
            // draw y axis
            _drawLine(
                { x: dims.left, y: dims.top },
                { x: dims.left, y: dims.bottom },
                ctx
            )
        })
    }

    const _drawXLegends = () => {
        paintCanvas((ctx) => {
            ctx.fillStyle = theme.colors['grey-2']
            ctx.font = '300 10px Roboto'
            ctx.textAlign = 'center'

            // draw x Legends
            graphData.forEach((point) => {
                ctx.fillText(
                    point.xLegend,
                    point.x,
                    dims.bottom + dims.offset * 2
                )
            })
        })
    }

    const _drawBar = (p1, p2, opacityValue) => {
        paintBarCanvas((ctx) => {
            const grd = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            grd.addColorStop(0, theme.colors.blue + opacityValue)
            grd.addColorStop(1, theme.colors.teal + opacityValue)
            ctx.lineWidth = dims.barWidth
            ctx.lineCap = 'round'
            ctx.strokeStyle = grd
            _drawLine(p1, p2, ctx)
            ctx.clearRect(
                p2.x - ctx.lineWidth / 2,
                dims.bottom,
                ctx.lineWidth,
                ctx.lineWidth / 2
            )
        })
    }

    const _animateBars = () => {
        const tween = new Tween()
        graphData.forEach((point) => {
            const draw = (newVal) => {
                _drawBar(
                    { x: point.x, y: newVal },
                    { x: point.x, y: dims.bottom },
                    Opacity100
                )
            }
            tween._play(dims.bottom, point.y, 700, draw)
        })
    }

    const _isMouseOverBar = (x, y, p1, p2) => {
        const left = p1.x - dims.barWidth / 2,
            right = p1.x + dims.barWidth / 2,
            top = p1.y - dims.barWidth / 2,
            bottom = p2.y
        return x > left && x < right && y > top && y < bottom
    }

    const _showHoverData = (event) => {
        paintBarCanvas((ctx) => {
            clearBarCanvas()
            ctx.fillStyle = theme.colors['foreground']
            ctx.font = '300 10px Roboto'
            ctx.textAlign = 'center'
            let hoveredBar = null
            // check if hover or not
            graphData.forEach((point) => {
                const p1 = { x: point.x, y: point.y }
                const p2 = { x: point.x, y: dims.bottom }
                const mouseOverBar = _isMouseOverBar(
                    event.offsetX,
                    event.offsetY,
                    p1,
                    p2
                )
                hoveredBar = mouseOverBar ? { p1, p2 } : hoveredBar
            })
            // render bar as per hover
            graphData.forEach((point) => {
                const p1 = { x: point.x, y: point.y }
                const p2 = { x: point.x, y: dims.bottom }
                if (hoveredBar) {
                    if (
                        p1.x === hoveredBar.p1.x &&
                        p1.y === hoveredBar.p1.y &&
                        p2.x === hoveredBar.p2.x &&
                        p2.y === hoveredBar.p2.y
                    ) {
                        _drawBar(p1, p2, Opacity100)

                        ctx.fillText(
                            humanize(point.yLegend),
                            point.x,
                            point.y - dims.offset * 2
                        )
                    } else {
                        _drawBar(p1, p2, Opacity25)
                    }
                } else {
                    _drawBar(p1, p2, Opacity100)
                }
            })
        })
    }

    const render = () => {
        clearCanvas()
        clearBarCanvas()
        _drawCoordsPlane()
        _drawYLegends()
        _animateBars()
        _drawXLegends()
    }

    React.useEffect(() => {
        if (graphData.length) {
            render()
            barCtx?.canvas?.addEventListener?.('mousemove', _showHoverData)
        }
        return () =>
            barCtx?.canvas?.removeEventListener?.('mousemove', _showHoverData)
    }, [graphData, theme])

    return <CanvasWrapper ref={canvasWrapperRef}></CanvasWrapper>
}

export default withTheme(BarCanvas)
