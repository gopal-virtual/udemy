import React from 'react'
import { map } from '../../Utils/Utils'

function useData(data, xKey, yKey, dims) {
    const [graphData, setGraphData] = React.useState([])
    const [minY, setMinY] = React.useState(0)
    const [maxY, setMaxY] = React.useState(0)

    const setYRange = React.useCallback(() => {
        const range = data.reduce(
            (acc, point) => {
                return {
                    min: Math.min(acc.min, point[yKey]),
                    max: Math.max(acc.max, point[yKey]),
                }
            },
            { min: 0, max: 0 }
        )

        setMinY(range.min)
        setMaxY(range.max)
    })

    // the input data follows cartesian coordinate system
    // but the canvas coordinate system is different,
    // i.e. y axis is flipped.
    // SetData convert and transpose the data accordingly
    const setData = React.useCallback(() => {
        // map the input data from one range to another
        const mappedData = data.map((dataPoints, index) => ({
            x: map(
                index,
                0,
                data.length - 1,
                dims.padding,
                dims.canvasW - dims.padding
            ),
            y: map(
                dataPoints[yKey],
                minY,
                maxY,
                dims.padding,
                dims.canvasH - dims.padding
            ),
            xLegands: dataPoints[xKey],
            yLegands: dataPoints[yKey],
        }))

        // flip y axis
        const flippedData = mappedData.map((point) => ({
            ...point,
            y: dims.canvasH - point.y,
        }))

        setGraphData(flippedData)
    })

    React.useEffect(() => {
        if (data && data.length && dims) {
            setYRange()
            setData()
        }
    }, [data, dims]) // recalc on change of dimensions / data itself

    return { graphData, minY, maxY }
}

export default useData
