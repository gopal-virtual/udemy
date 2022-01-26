import React from 'react'
import styled from 'styled-components'
import { humanize } from '../../Utils/Utils'
import BarCanvas from './BarCanvas'

const TextSizeMap = {
    header: '18px',
    paragraph: '14px',
    Legend: '10px',
}

const TextWeightMap = {
    light: 300,
    highlight: 500,
    emphasis: 900,
}

const Text = styled('span')({
    width: (props) => props.width || 'auto',
    display: 'inline-block',
    fontFamily: 'Roboto',
    background: (props) =>
        props.color
            ? props.theme.colors[props.color]
            : props.theme.colors.foreground,
    '-webkit-background-clip': 'text',
    color: 'transparent',
    textAlign: (props) => props.align || 'left',
    fontSize: (props) => TextSizeMap[props.type || 'paragraph'],
    fontWeight: (props) => TextWeightMap[props.weight || 'light'],
})

const Separator = styled('div')({
    borderSizing: 'border-box',
    width: '24px',
    height: '5px',
    margin: '12px 0',
    background: (props) => props.theme.colors['teal-blue-horizontal'],
})

const GraphWrapper = styled('div')({
    boxSizing: 'border-box',
    backgroundColor: (props) => props.theme.colors.background,
    padding: '25px',
    minWidth: '450px',
    overflow: 'hidden',
})

const getGraphString = ({ data }) => {
    const lastMonthIndex = data.length - 1
    const lastMonthSales = data[lastMonthIndex].sales
    const lastMonth =
        data[lastMonthIndex].month + ' ' + new Date().getFullYear()
    const delta = data[lastMonthIndex].sales - data[lastMonthIndex - 1].sales
    const deltaPrefix = delta > 0 ? `Up by` : `Down by`
    const deltaString = humanize(delta)

    return {
        lastMonthSales: humanize(lastMonthSales),
        lastMonth,
        delta: { prefix: deltaPrefix, string: deltaString },
    }
}

function BarGraph(props) {
    const [fontLoaded, setFontLoaded] = React.useState(false)

    if (!props.data || !props.data.length) {
        return (
            <GraphWrapper data-testid="bar-wrapper">
                <Text type="paragraph">No sales data available</Text>
            </GraphWrapper>
        )
    }

    const { lastMonthSales, lastMonth, delta } = getGraphString(props)

    document.fonts.ready.then(() => {
        if (document.fonts.check('1em Roboto')) {
            setFontLoaded(true)
        }
    })

    return (
        <GraphWrapper data-testid="bar-wrapper">
            <Text type="header">
                <Text
                    data-testid="bar-sales-figure"
                    type="header"
                    weight="highlight"
                >
                    {lastMonthSales}
                </Text>{' '}
                Sales for{' '}
                <Text type="header" weight="highlight">
                    {lastMonth}
                </Text>
            </Text>
            <Separator />
            {fontLoaded && <BarCanvas {...props} />}
            <Text type="paragraph" weight="light" align="center" width="100%">
                <Text type="paragraph" weight="light" color="red-pink">
                    {delta.prefix}
                </Text>{' '}
                <Text
                    data-testid="bar-delta-figure"
                    type="paragraph"
                    weight="highlight"
                    color="red-pink"
                >
                    {delta.string}
                </Text>{' '}
                sales from previous month
            </Text>
        </GraphWrapper>
    )
}

BarGraph.propTypes = {}

export default BarGraph
