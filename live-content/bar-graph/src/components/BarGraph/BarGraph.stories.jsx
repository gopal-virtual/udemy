import React from 'react'
import Provider from '../Theme/Provider'

import BarGraph from './BarGraph'

export default {
    title: 'Variants/Bar Graph',
    component: BarGraph,
    decorators: [
        (Story) => (
            <Provider>
                <Story />
            </Provider>
        ),
    ],
}

// we are dealing with user understandable data
// but for calculation, we need to identify x and y axis data
const data = [
    {
        sales: 900000, // y value
        month: 'Jan', // x value
    },
    {
        sales: 1232400,
        month: 'Feb',
    },
    {
        sales: 14340,
        month: 'Mar',
    },
    {
        sales: 100340,
        month: 'Apr',
    },
    {
        sales: 809930,
        month: 'May',
    },
    {
        sales: 503430,
        month: 'Jun',
    },
    {
        sales: 1232340,
        month: 'Jul',
    },
]

const Template = (args) => <BarGraph {...args} />

export const Default = Template.bind({})
Default.args = {
    data,
    xKey: 'month',
    yKey: 'sales',
}

// with long data
const longDataSet = [
    { sales: 1400887877, month: 'Jan' },
    { sales: 1218987887, month: 'Feb' },
    { sales: 188887889, month: 'Mar' },
    { sales: 32433, month: 'Apr' },
    { sales: 0, month: 'May' },
    { sales: 133323, month: 'Jun' },
]

export const WithLongNumbers = Template.bind({})
WithLongNumbers.args = {
    data: longDataSet,
    yKey: 'sales',
    xKey: 'month',
}

// with negetive data
const negetiveDataSet = [
    { sales: 1400, month: 'Jan' },
    { sales: 1218, month: 'Feb' },
    { sales: -188, month: 'Mar' },
    { sales: 3243, month: 'Apr' },
    { sales: 32, month: 'May' },
    { sales: 1333, month: 'Jun' },
]

export const WithNegativeData = Template.bind({})
WithNegativeData.args = {
    data: negetiveDataSet,
    yKey: 'sales',
    xKey: 'month',
}

// without any data
export const NoData = Template.bind({})

// with higher data set (yearly)
const yearlyDataSet = [
    { sales: 140077, month: 'Jan' },
    { sales: 198787, month: 'Feb' },
    { sales: -17889, month: 'Mar' },
    { sales: 32433, month: 'Apr' },
    { sales: 0, month: 'May' },
    { sales: -133323, month: 'Jun' },
    { sales: -13323, month: 'Jul' },
    { sales: 15753, month: 'Aug' },
    { sales: 123556, month: 'Sep' },
    { sales: 23633, month: 'Oct' },
    { sales: 98723, month: 'Nov' },
    { sales: 123, month: 'Dec' },
]

export const WithHigherDataSet = Template.bind({})
WithHigherDataSet.args = {
    data: yearlyDataSet,
    yKey: 'sales',
    xKey: 'month',
}
