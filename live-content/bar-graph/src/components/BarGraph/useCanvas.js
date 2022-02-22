import React from 'react'
function useCanvas(parentDom) {
    const [ctx, setCtx] = React.useState(null)
    const [canvas, setCanvas] = React.useState(null)
    const [canvasW, setCanvasW] = React.useState(0)
    const [canvasH, setCanvasH] = React.useState(0)

    const initCanvas = React.useCallback(() => {
        console.log('init canvas')
        const canvas = document.createElement('canvas')

        const pixelRatio = window.devicePixelRatio
        canvas.width = canvasW * pixelRatio
        canvas.height = canvasH * pixelRatio
        canvas.style.width = `${canvasW}px`
        canvas.style.height = `${canvasH}px`
        canvas.style.position = 'absolute'

        const ctx = canvas.getContext('2d')
        ctx.scale(pixelRatio, pixelRatio)
        parentDom.current.appendChild(canvas)

        setCtx(ctx)
        setCanvas(canvas)
    })

    const paintCanvas = React.useCallback((callback) => {
        console.log('paint canvas called')
        if (ctx) {
            ctx.save()
            callback?.(ctx)
            ctx.restore()
        }
    })

    const clearCanvas = React.useCallback(() => {
        if (ctx) ctx.clearRect(0, 0, canvasW, canvasH)
    })

    const destroyCanvas = React.useCallback(() => {
        if (ctx) {
            setCtx(null)
            parentDom.current.removeChild(canvas)
        }
    })

    const setDims = React.useCallback(() => {
        const { width, height } = parentDom.current.getBoundingClientRect()
        setCanvasW(width)
        setCanvasH(height)
    })

    React.useEffect(() => {
        if (!parentDom || !canvasW || !canvasH) return
        destroyCanvas()
        initCanvas()
    }, [canvasW, canvasH])

    React.useEffect(() => {
        if (parentDom && parentDom.current) {
            setDims()
        }
    }, [parentDom])

    React.useEffect(() => {
        window.addEventListener('resize', setDims)
        return () => window.removeEventListener('resize', setDims)
    }, [])

    return [paintCanvas, clearCanvas, canvasW, canvasH, ctx]
}

export default useCanvas
