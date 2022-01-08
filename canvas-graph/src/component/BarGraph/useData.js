import React from 'react'
import { map } from '../../Utils/Utils'

function useData(data = [], xKey = '', yKey = '', dims = {}) {
    const [graphData, setGraphData] = React.useState([])
    const [minY, setMinY] = React.useState(0)
    const [maxY, setMaxY] = React.useState(0)

    const range = React.useCallback((data, key) =>
        data.reduce((acc, point, i) => {
            if (i === 0) {
                return { min: 0, max: point[key] }
            }
            return {
                min: Math.min(acc.min, point[key]),
                max: Math.max(acc.max, point[key]),
            }
        }, {})
    )

    const transposeData = React.useCallback((data) => {
        return data.map((point) => ({
            ...point,
            y: dims.canvasH - point.y,
        }))
    })

    const transformData = React.useCallback(() => {
        const { min, max } = range(data, yKey)
        const newData = data.map((dataPoints, index) => ({
            x: map(
                index,
                0,
                data.length - 1,
                dims.padding * 2,
                dims.canvasW - dims.padding * 2
            ),
            y: map(
                dataPoints[yKey],
                min,
                max,
                dims.padding,
                dims.canvasH - dims.padding * 2
            ),
            xLegend: dataPoints[xKey],
            yLegend: dataPoints[yKey],
        }))

        setGraphData(transposeData(newData))
        setMinY(min)
        setMaxY(max)
    })

    React.useEffect(() => {
        if (dims.canvasW && dims.canvasH) {
            transformData()
        }
    }, [data, dims])

    return { graphData, minY, maxY }
}

export default useData
