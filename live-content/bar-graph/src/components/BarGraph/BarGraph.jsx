import React from 'react'
import styled from 'styled-components'
import { humanize } from '../../Utils/Utils'
import BarCanvas from './BarCanvas'

const GraphWrapper = styled('div')({
    boxSizing: 'border-box',
    padding: '25px',
    minWidth: '450px',
    overflow: 'hidden',
    backgroundColor: (props) => props.theme.colors.background,
})

const textSizeMap = {
    header: '20px',
    paragraph: '15px',
    legand: '11px',
}

const Text = styled('span')({
    display: 'inline-block',
    fontFamily: '"Roboto", sans-serif',
    fontSize: (props) => (props.type ? textSizeMap[props.type] : 'inherit'),
    fontWeight: (props) => (props.bold ? '600' : 'normal'),
    background: (props) =>
        props.color
            ? props.theme.colors[props.color]
            : props.theme.colors.foreground,
    '-webkit-background-clip': 'text',
    color: 'transparent',
})

const Separator = styled('div')({
    boxSizing: 'border-box',
    width: '29px',
    height: '7px',
    margin: '12px 0',
    background: (props) => props.theme.colors['teal-blue'],
})

const Footer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
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

function BarGraph({ data, xKey, yKey }) {
    const [fontLoaded, setFontLoaded] = React.useState(false)
    const { lastMonthSales, lastMonth, delta } = getGraphString(data)
    const canvasProps = { data, xKey, yKey }

    document.fonts.ready.then(() => {
        if (document.fonts.check('1em Roboto')) {
            setFontLoaded(true)
        }
    })

    return (
        <GraphWrapper>
            <Text type="header">
                <Text bold>{lastMonthSales}</Text> sales in{' '}
                <Text bold>{lastMonth}</Text>
            </Text>
            <Separator />
            {fontLoaded && <BarCanvas {...canvasProps} />}
            <Footer>
                <Text type="paragraph">
                    <Text color="red-pink">
                        {delta.prefix}{' '}
                        <Text bold color="red-pink">
                            {delta.sales}
                        </Text>
                    </Text>{' '}
                    sales from previous month
                </Text>
            </Footer>
        </GraphWrapper>
    )
}

export default BarGraph
