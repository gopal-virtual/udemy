import React from 'react'
import styled from 'styled-components'
import { humanize } from '../../Utils/Utils'

const GraphWrapper = styled('div')({
    boxSizing: 'border-box',
    padding: '25px',
    minWidth: '450px',
    overflow: 'hidden',
    backgroundColor: '#FDF9F3',
})

const textSizeMap = {
    header: '20px',
    paragraph: '15px',
    legand: '11px',
}

const colorMap = {
    'teal-blue': 'linear-gradient(270deg, #70DBD4 0%, #5297FF 100%)',
    'red-pink': 'linear-gradient(180deg, #FF4A4A 0%, #FC5CFF 100%)',
    foreground: '#000000',
}

const Text = styled('span')({
    display: 'inline-block',
    fontFamily: 'sans-serif',
    fontSize: (props) => (props.type ? textSizeMap[props.type] : 'inherit'),
    fontWeight: (props) => (props.bold ? '600' : 'normal'),
    background: (props) =>
        props.color ? colorMap[props.color] : colorMap['foreground'],
    '-webkit-background-clip': 'text',
    color: 'transparent',
})

const Separator = styled('div')({
    boxSizing: 'border-box',
    width: '29px',
    height: '7px',
    margin: '12px 0',
    background: colorMap['teal-blue'],
})

const getGraphString = (data) => {
    const lastMonthIndex = data.length - 1
    const lastMonthSales = data[lastMonthIndex].sales
    const lastMonth =
        data[lastMonthIndex].month + ' ' + new Date().getFullYear()
    const deltaSales =
        data[lastMonthIndex].sales - data[lastMonthIndex - 1].sales
    const deltaPrefix = deltaSales > 0 ? 'Up by' : 'Down by'
    return {
        lastMonthSales: humanize(lastMonthSales),
        lastMonth,
        delta: {
            sales: humanize(deltaSales),
            prefix: deltaPrefix,
        },
    }
}

function BarGraph({ data }) {
    const { lastMonthSales, lastMonth, delta } = getGraphString(data)
    return (
        <GraphWrapper>
            <Text type="header">
                <Text bold>{lastMonthSales}</Text> sales in{' '}
                <Text bold>{lastMonth}</Text>
            </Text>
            <Separator />
            <div>canvas</div>
            <Text type="paragraph">
                {delta.prefix}{' '}
                <Text bold color="red-pink">
                    {delta.sales}
                </Text>{' '}
                sales from previous month
            </Text>
        </GraphWrapper>
    )
}

export default BarGraph
