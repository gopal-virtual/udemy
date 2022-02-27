import React from 'react'
import { map } from '../../Utils/Utils'

function useData(data, xKey, yKey, dims) {
    const [graphData, setGraphData] = React.useState([])
    const [minY, setMinY] = React.useState(0)
    const [maxY, setMaxY] = React.useState(0)

    const getYRange = React.useCallback(() => {
        const range = data.reduce(
            (acc, point) => {
                return {
                    min: Math.min(acc.min, point[yKey]),
                    max: Math.max(acc.max, point[yKey]),
                }
            },
            { min: 0, max: data[0][yKey] }
        )

        return {
            ...range,
            min: range.min - Math.round(Math.abs(range.max - range.min) / 10),
        }
    })

    // the input data follows cartesian coordinate system
    // but the canvas coordinate system is different,
    // i.e. y axis is flipped.
    // SetData convert and transpose the data accordingly
    const setData = React.useCallback(() => {
        const { min, max } = getYRange()
        // map the input data from one range to another
        const mappedData = data.map((dataPoints, index) => ({
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
        setMinY(min)
        setMaxY(max)
    })

    React.useEffect(() => {
        // don't calc if h/w is zero
        if (dims.canvasH && dims.canvasW) {
            setData()
        }
    }, [data, dims]) // recalc on change of dimensions / data itself

    return { graphData, minY, maxY }
}

export default useData
