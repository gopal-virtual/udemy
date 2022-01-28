import React from 'react'
import Provider from '../Theme/Provider'

import BarGraph from './BarGraph'

export default {
    title: 'Example/BarGraph',
    component: BarGraph,
    decorators: [
        (Story) => (
            <Provider mode="light">
                <Story />
            </Provider>
        ),
    ],
}

const Template = (args) => <BarGraph {...args} />

const data_1 = [
    { sales: 100, month: 'Jan' },
    { sales: 1218, month: 'Feb' },
    { sales: 188, month: 'Mar' },
    { sales: 343, month: 'Apr' },
    { sales: 32, month: 'May' },
]

export const Default = Template.bind({})
Default.args = {
    data: data_1,
    yKey: 'sales',
    xKey: 'month',
}

const data_2 = [
    { sales: 1400, month: 'Jan' },
    { sales: 1218, month: 'Feb' },
    { sales: -188, month: 'Mar' },
    { sales: 3243, month: 'Apr' },
    { sales: 32, month: 'May' },
    { sales: 1333, month: 'Jun' },
]

export const WithNegativeData = Template.bind({})
WithNegativeData.args = {
    data: data_2,
    yKey: 'sales',
    xKey: 'month',
}

const data_3 = [
    { sales: 1400887877, month: 'Jan' },
    { sales: 1218987887, month: 'Feb' },
    { sales: -188887889, month: 'Mar' },
    { sales: 32433, month: 'Apr' },
    { sales: 0, month: 'May' },
    { sales: -133323, month: 'Jun' },
]

export const WithLongNumbers = Template.bind({})
WithLongNumbers.args = {
    data: data_3,
    yKey: 'sales',
    xKey: 'month',
}

const data_4 = [
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
    data: data_4,
    yKey: 'sales',
    xKey: 'month',
}

export const NoData = Template.bind({})
