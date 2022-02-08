import React from 'react'
function useCanvas(parentDom) {
    const [ctx, setCtx] = React.useState(null)
    const [canvas, setCanvas] = React.useState(null)
    const [canvasW, setCanvasW] = React.useState(0)
    const [canvasH, setCanvasH] = React.useState(0)

    const initCanvas = React.useCallback(() => {
        const canvas = document.createElement('canvas')

        canvas.width = canvasW
        canvas.height = canvasH
        canvas.style.position = 'absolute'
        const ctx = canvas.getContext('2d')
        parentDom.current.appendChild(canvas)

        setCtx(ctx)
        setCanvas(canvas)
    })

    const clearCanvas = React.useCallback(() => {})
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

    return [ctx, clearCanvas, canvasW, canvasH]
}

export default useCanvas
